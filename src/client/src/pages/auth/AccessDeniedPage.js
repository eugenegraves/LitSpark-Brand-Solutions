/**
 * Access Denied Page
 * 
 * Page component that renders when a user tries to access a route they don't have permission for.
 * Includes accessibility features like skip links and proper heading structure.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPages.css';

const AccessDeniedPage = () => {
  const { user } = useAuth();

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
            <h1 className="auth-title">Access Denied</h1>
            <div className="error-message" role="alert">
              <p>You don't have permission to access this page.</p>
              <p>Your current role: <strong>{user?.role || 'Unknown'}</strong></p>
            </div>
            <div className="form-actions">
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
