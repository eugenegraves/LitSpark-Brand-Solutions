/**
 * Reset Password Form Component
 * 
 * Accessible form for resetting password that follows WCAG 2.1 AA standards.
 * Features include proper focus management, keyboard navigation,
 * and high contrast colors.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [token, setToken] = useState('');
  const { resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');
    
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setServerError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [location]);

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      await resetPassword(token, password);
      setResetSuccess(true);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Password reset failed. Please try again.');
      // Focus on the first error for accessibility
      document.getElementById('password').focus();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // If reset is successful, show success message
  if (resetSuccess) {
    return (
      <div className="auth-form-container">
        <h1 className="auth-title">Password Reset Successful</h1>
        <div className="success-message" role="alert">
          <p>Your password has been successfully reset.</p>
          <p>You can now log in with your new password.</p>
        </div>
        <div className="form-actions">
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Reset Password</h1>
      
      {serverError && (
        <div className="error-message" role="alert" aria-live="assertive">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} noValidate className="auth-form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
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
              aria-describedby="password-requirements password-error"
              autoComplete="new-password"
              required
              disabled={!token}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={!token}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div id="password-requirements" className="form-hint">
            Password must be at least 8 characters and include uppercase, lowercase, and numbers
          </div>
          {formErrors.password && (
            <div id="password-error" className="error-message" role="alert">
              {formErrors.password}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`form-input ${formErrors.confirmPassword ? 'input-error' : ''}`}
            aria-invalid={formErrors.confirmPassword ? 'true' : 'false'}
            aria-describedby={formErrors.confirmPassword ? 'confirmPassword-error' : undefined}
            autoComplete="new-password"
            required
            disabled={!token}
          />
          {formErrors.confirmPassword && (
            <div id="confirmPassword-error" className="error-message" role="alert">
              {formErrors.confirmPassword}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !token}
            aria-busy={loading}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </div>
        
        <div className="auth-links">
          <Link to="/login" className="auth-link">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
