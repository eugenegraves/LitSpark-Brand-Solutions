/**
 * Registration Form Component
 * 
 * Accessible registration form that follows WCAG 2.1 AA standards.
 * Features include proper focus management, keyboard navigation,
 * and high contrast colors.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;
    
    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
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
      // Focus on the first error field for accessibility
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField).focus();
      }
      return;
    }
    
    try {
      const { firstName, lastName, email, password } = formData;
      await register({ firstName, lastName, email, password });
      setRegistrationSuccess(true);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
      // Focus on the error message for accessibility
      document.getElementById('server-error').focus();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // If registration is successful, show success message
  if (registrationSuccess) {
    return (
      <div className="auth-form-container">
        <h1 className="auth-title">Registration Successful</h1>
        <div className="success-message" role="alert">
          <p>Thank you for registering! A verification email has been sent to your email address.</p>
          <p>Please check your inbox and click the verification link to activate your account.</p>
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
      <h1 className="auth-title">Create Account</h1>
      
      {serverError && (
        <div id="server-error" className="error-message" role="alert" aria-live="assertive" tabIndex="-1">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} noValidate className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${formErrors.firstName ? 'input-error' : ''}`}
              aria-invalid={formErrors.firstName ? 'true' : 'false'}
              aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
              autoComplete="given-name"
              required
            />
            {formErrors.firstName && (
              <div id="firstName-error" className="error-message" role="alert">
                {formErrors.firstName}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${formErrors.lastName ? 'input-error' : ''}`}
              aria-invalid={formErrors.lastName ? 'true' : 'false'}
              aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
              autoComplete="family-name"
              required
            />
            {formErrors.lastName && (
              <div id="lastName-error" className="error-message" role="alert">
                {formErrors.lastName}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${formErrors.password ? 'input-error' : ''}`}
              aria-invalid={formErrors.password ? 'true' : 'false'}
              aria-describedby="password-requirements password-error"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-input ${formErrors.confirmPassword ? 'input-error' : ''}`}
            aria-invalid={formErrors.confirmPassword ? 'true' : 'false'}
            aria-describedby={formErrors.confirmPassword ? 'confirmPassword-error' : undefined}
            autoComplete="new-password"
            required
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
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
        
        <div className="auth-links">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
