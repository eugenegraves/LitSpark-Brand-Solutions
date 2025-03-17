/**
 * Tests for AuthContext
 * 
 * Tests authentication state management including login, logout, registration,
 * and token handling.
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock axios for API calls
jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn().mockReturnValue({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    post: jest.fn(),
    get: jest.fn(),
  }),
}));
import axios from 'axios';

// Test component that uses the auth context
const TestComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error,
    login, 
    logout, 
    register, 
    forgotPassword,
    resetPassword,
    verifyEmail
  } = useAuth();

  return (
    <div>
      <div data-testid="auth-state">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div data-testid="loading-state">
        {loading ? 'Loading' : 'Not Loading'}
      </div>
      <div data-testid="error-state">
        {error || 'No Error'}
      </div>
      <div data-testid="user-data">
        {user ? JSON.stringify(user) : 'No User'}
      </div>
      <button onClick={() => login({ email: 'test@example.com', password: 'password123' })}>
        Login
      </button>
      <button onClick={() => register({ 
        firstName: 'Test', 
        lastName: 'User', 
        email: 'test@example.com', 
        password: 'password123' 
      })}>
        Register
      </button>
      <button onClick={() => logout()}>
        Logout
      </button>
      <button onClick={() => forgotPassword('test@example.com')}>
        Forgot Password
      </button>
      <button onClick={() => resetPassword('token123', 'newpassword123')}>
        Reset Password
      </button>
      <button onClick={() => verifyEmail('token123')}>
        Verify Email
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  // Setup - reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  // Test 1: Initial state is unauthenticated and not loading
  test('initial state is unauthenticated and not loading', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-state')).toHaveTextContent('Not Authenticated');
    expect(screen.getByTestId('loading-state')).toHaveTextContent('Not Loading');
    expect(screen.getByTestId('user-data')).toHaveTextContent('No User');
  });

  // Test 2: Loads user from localStorage on mount
  test('loads user from localStorage on mount', () => {
    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    const mockToken = 'token123';
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'user') return JSON.stringify(mockUser);
      if (key === 'token') return mockToken;
      return null;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-state')).toHaveTextContent('Authenticated');
    expect(screen.getByTestId('user-data')).toHaveTextContent(mockUser.email);
  });

  // Test 3: Login sets authenticated state and stores user data
  test('login sets authenticated state and stores user data', async () => {
    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    const mockToken = 'token123';
    const mockRefreshToken = 'refresh123';
    
    axios.post.mockResolvedValueOnce({
      data: {
        user: mockUser,
        token: mockToken,
        refreshToken: mockRefreshToken
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initial state
    expect(screen.getByTestId('auth-state')).toHaveTextContent('Not Authenticated');

    // Click login button
    await act(async () => {
      userEvent.click(screen.getByText('Login'));
    });

    // Check if API was called
    expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });

    // Check if state was updated
    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user-data')).toHaveTextContent(mockUser.email);
    });

    // Check if localStorage was updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('refreshToken', mockRefreshToken);
  });

  // Test 4: Login handles errors correctly
  test('login handles errors correctly', async () => {
    const errorMessage = 'Invalid credentials';
    
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: errorMessage
        }
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click login button
    await act(async () => {
      userEvent.click(screen.getByText('Login'));
    });

    // Check if error state was updated
    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toHaveTextContent(errorMessage);
    });
  });

  // Test 5: Logout clears authenticated state and user data
  test('logout clears authenticated state and user data', async () => {
    const mockUser = { id: '1', email: 'test@example.com', role: 'user' };
    const mockToken = 'token123';
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'user') return JSON.stringify(mockUser);
      if (key === 'token') return mockToken;
      return null;
    });

    axios.post.mockResolvedValueOnce({ data: { message: 'Logout successful' } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initial state should be authenticated
    expect(screen.getByTestId('auth-state')).toHaveTextContent('Authenticated');

    // Click logout button
    await act(async () => {
      userEvent.click(screen.getByText('Logout'));
    });

    // Check if API was called
    expect(axios.post).toHaveBeenCalledWith('/api/auth/logout');

    // Check if state was updated
    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('user-data')).toHaveTextContent('No User');
    });

    // Check if localStorage was cleared
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  // Test 6: Register creates a new user and sets authenticated state
  test('register creates a new user and sets authenticated state', async () => {
    const mockUser = { 
      id: '1', 
      firstName: 'Test', 
      lastName: 'User', 
      email: 'test@example.com', 
      role: 'user' 
    };
    const mockToken = 'token123';
    const mockRefreshToken = 'refresh123';
    
    axios.post.mockResolvedValueOnce({
      data: {
        user: mockUser,
        token: mockToken,
        refreshToken: mockRefreshToken
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initial state
    expect(screen.getByTestId('auth-state')).toHaveTextContent('Not Authenticated');

    // Click register button
    await act(async () => {
      userEvent.click(screen.getByText('Register'));
    });

    // Check if API was called
    expect(axios.post).toHaveBeenCalledWith('/api/auth/register', {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    });

    // Check if state was updated
    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user-data')).toHaveTextContent(mockUser.email);
    });

    // Check if localStorage was updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('refreshToken', mockRefreshToken);
  });

  // Test 7: Forgot password sends reset email
  test('forgot password sends reset email', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Password reset email sent' }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click forgot password button
    await act(async () => {
      userEvent.click(screen.getByText('Forgot Password'));
    });

    // Check if API was called
    expect(axios.post).toHaveBeenCalledWith('/api/auth/forgot-password', {
      email: 'test@example.com'
    });
  });

  // Test 8: Reset password updates password
  test('reset password updates password', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Password reset successful' }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click reset password button
    await act(async () => {
      userEvent.click(screen.getByText('Reset Password'));
    });

    // Check if API was called
    expect(axios.post).toHaveBeenCalledWith('/api/auth/reset-password', {
      token: 'token123',
      password: 'newpassword123'
    });
  });

  // Test 9: Verify email verifies user's email
  test('verify email verifies user\'s email', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Email verified successfully' }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click verify email button
    await act(async () => {
      userEvent.click(screen.getByText('Verify Email'));
    });

    // Check if API was called
    expect(axios.post).toHaveBeenCalledWith('/api/auth/verify-email', {
      token: 'token123'
    });
  });
});
