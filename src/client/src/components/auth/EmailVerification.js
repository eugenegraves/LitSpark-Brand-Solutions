/**
 * Email Verification Component
 * 
 * Accessible component for verifying email addresses that follows WCAG 2.1 AA standards.
 * Features include proper focus management, keyboard navigation,
 * and high contrast colors.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmailToken = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      
      if (!token) {
        setVerificationStatus('error');
        setErrorMessage('Invalid or missing verification token.');
        return;
      }
      
      try {
        await verifyEmail(token);
        setVerificationStatus('success');
      } catch (error) {
        setVerificationStatus('error');
        setErrorMessage(
          error.response?.data?.message || 
          'Email verification failed. The token may be expired or invalid.'
        );
      }
    };
    
    verifyEmailToken();
  }, [location, verifyEmail]);

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Email Verification</h1>
      
      {verificationStatus === 'verifying' && (
        <div className="verification-message" role="status" aria-live="polite">
          <p>Verifying your email address...</p>
          <div className="loading-spinner" aria-hidden="true"></div>
        </div>
      )}
      
      {verificationStatus === 'success' && (
        <div className="success-message" role="alert">
          <p>Your email has been successfully verified!</p>
          <p>You can now access all features of your account.</p>
          <div className="form-actions">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-primary"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
      
      {verificationStatus === 'error' && (
        <div className="error-message" role="alert">
          <p>{errorMessage}</p>
          <p>If you need a new verification link, please log in to your account and request a new one.</p>
          <div className="form-actions">
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
