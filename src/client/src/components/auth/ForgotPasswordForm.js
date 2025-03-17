/**
 * Forgot Password Form Component
 * 
 * Accessible form for requesting a password reset that follows WCAG 2.1 AA standards.
 * Features include proper focus management, keyboard navigation,
 * and high contrast colors.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const { forgotPassword, loading } = useAuth();

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
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
      await forgotPassword(email);
      setRequestSent(true);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Request failed. Please try again.');
      // Focus on the first error for accessibility
      document.getElementById('email').focus();
    }
  };

  // If request is sent, show success message
  if (requestSent) {
    return (
      <div className="auth-form-container">
        <h1 className="auth-title">Check Your Email</h1>
        <div className="success-message" role="alert">
          <p>If an account exists with the email <strong>{email}</strong>, you will receive a password reset link shortly.</p>
          <p>Please check your inbox and follow the instructions to reset your password.</p>
          <p>The link will expire in 1 hour for security reasons.</p>
        </div>
        <div className="form-actions">
          <Link to="/login" className="btn btn-secondary">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Forgot Password</h1>
      
      <p className="auth-description">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
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
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPasswordForm;
