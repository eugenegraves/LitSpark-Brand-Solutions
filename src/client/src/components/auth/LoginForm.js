/**
 * Login Form Component
 * 
 * Accessible login form that follows WCAG 2.1 AA standards.
 * Features include proper focus management, keyboard navigation,
 * and high contrast colors.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setServerError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Login failed. Please try again.');
      // Focus on the first error for accessibility
      document.getElementById('email').focus();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Log In</h1>
      
      {serverError && (
        <div className="error-message" role="alert" aria-live="assertive">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} noValidate className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${formErrors.email ? 'input-error' : ''}`}
            aria-invalid={formErrors.email ? 'true' : 'false'}
            aria-describedby={formErrors.email ? 'email-error' : undefined}
            autoComplete="email"
            required
          />
          {formErrors.email && (
            <div id="email-error" className="error-message" role="alert">
              {formErrors.email}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-input ${formErrors.password ? 'input-error' : ''}`}
              aria-invalid={formErrors.password ? 'true' : 'false'}
              aria-describedby={formErrors.password ? 'password-error' : undefined}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex="0"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formErrors.password && (
            <div id="password-error" className="error-message" role="alert">
              {formErrors.password}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        
        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
          <span className="auth-separator">•</span>
          <Link to="/register" className="auth-link">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
