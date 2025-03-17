/**
 * Register Page
 * 
 * Page component that renders the registration form.
 * Includes accessibility features like skip links and proper heading structure.
 */

import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import './AuthPages.css';

const RegisterPage = () => {
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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
