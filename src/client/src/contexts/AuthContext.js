/**
 * Authentication Context
 * 
 * This context provides authentication state and methods to the entire application.
 * It handles user login, registration, and token management.
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// API base URL
const API_URL = process.env.REACT_APP_API_URL || '/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      
      // Set authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // Configure axios interceptor for token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh the token yet
        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh the token
            const response = await axios.post(`${API_URL}/auth/refresh-token`, {
              refreshToken
            });

            const { token: newToken, refreshToken: newRefreshToken } = response.data;

            // Update tokens in state and localStorage
            setToken(newToken);
            setRefreshToken(newRefreshToken);
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            // Update authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            // Retry the original request
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, log the user out
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Clean up interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken]);

  /**
   * Register a new user
   */
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { user, token, refreshToken } = response.data;

      // Save to state and localStorage
      setUser(user);
      setToken(token);
      setRefreshToken(refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Set authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { user, token, refreshToken } = response.data;

      // Save to state and localStorage
      setUser(user);
      setToken(token);
      setRefreshToken(refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Set authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setLoading(true);

      // Call logout API if user is logged in
      if (token) {
        await axios.post(`${API_URL}/auth/logout`);
      }

      // Clear state and localStorage
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      // Remove authorization header
      delete axios.defaults.headers.common['Authorization'];

      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      
      // Still clear everything even if the API call fails
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      // Remove authorization header
      delete axios.defaults.headers.common['Authorization'];
      
      setLoading(false);
    }
  };

  /**
   * Verify email
   */
  const verifyEmail = async (token) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/verify-email`, { token });
      
      // If the current user's email was verified, update the user object
      if (user) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Email verification failed');
      throw error;
    }
  };

  /**
   * Request password reset
   */
  const forgotPassword = async (email) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Password reset request failed');
      throw error;
    }
  };

  /**
   * Reset password with token
   */
  const resetPassword = async (token, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Password reset failed');
      throw error;
    }
  };

  /**
   * Update current user
   */
  const updateProfile = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.put(`${API_URL}/users/${user.id}`, userData);
      const updatedUser = response.data;

      // Update user in state and localStorage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setLoading(false);
      return updatedUser;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user && !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
