/**
 * Verification Required Page
 * 
 * Page component that renders when a user tries to access a route that requires email verification.
 * Includes accessibility features like skip links and proper heading structure.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPages.css';

const VerificationRequiredPage = () => {
  const { user, loading } = useAuth();
  const [resendStatus, setResendStatus] = useState('idle');
  const [resendError, setResendError] = useState('');

  // Function to resend verification email
  const handleResendVerification = async () => {
    try {
      setResendStatus('loading');
      setResendError('');
      
      // Call API to resend verification email
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend verification email');
      }
      
      setResendStatus('success');
    } catch (error) {
      setResendStatus('error');
      setResendError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="auth-page-container">
        <div className="auth-page-content" id="main-content">
          <div className="auth-logo">
            <img 
              src="/logo.png" 
              alt="LitSpark Brand Solutions Logo" 
              width="180" 
              height="60"
            />
          </div>
          <div className="auth-form-container">
            <h1 className="auth-title">Email Verification Required</h1>
            
            <div className="verification-message" role="status">
              <p>Your email address needs to be verified before you can access this page.</p>
              <p>We've sent a verification link to: <strong>{user?.email}</strong></p>
              <p>Please check your inbox and click the verification link to activate your account.</p>
            </div>
            
            {resendStatus === 'success' && (
              <div className="success-message" role="alert">
                <p>Verification email has been resent successfully!</p>
                <p>Please check your inbox and follow the instructions.</p>
              </div>
            )}
            
            {resendStatus === 'error' && (
              <div className="error-message" role="alert">
                <p>{resendError || 'Failed to resend verification email. Please try again.'}</p>
              </div>
            )}
            
            <div className="form-actions">
              <button
                onClick={handleResendVerification}
                className="btn btn-primary"
                disabled={loading || resendStatus === 'loading'}
                aria-busy={loading || resendStatus === 'loading'}
              >
                {resendStatus === 'loading' ? 'Sending...' : 'Resend Verification Email'}
              </button>
            </div>
            
            <div className="auth-links">
              <Link to="/dashboard" className="auth-link">
                Go to Dashboard
              </Link>
              <span className="auth-separator">•</span>
              <Link to="/login" className="auth-link" onClick={() => localStorage.clear()}>
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationRequiredPage;
