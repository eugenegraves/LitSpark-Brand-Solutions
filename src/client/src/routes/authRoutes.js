/**
 * Authentication Routes Configuration
 * 
 * This file defines the routes for authentication-related pages.
 * It ensures all routes are accessible and follow WCAG 2.1 standards.
 */

import React from 'react';
import { Route } from 'react-router-dom';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import EmailVerificationPage from '../pages/auth/EmailVerificationPage';
import AccessDeniedPage from '../pages/auth/AccessDeniedPage';
import VerificationRequiredPage from '../pages/auth/VerificationRequiredPage';

// Define authentication routes
const authRoutes = [
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route key="register" path="/register" element={<RegisterPage />} />,
  <Route key="forgot-password" path="/forgot-password" element={<ForgotPasswordPage />} />,
  <Route key="reset-password" path="/reset-password" element={<ResetPasswordPage />} />,
  <Route key="verify-email" path="/verify-email" element={<EmailVerificationPage />} />,
  <Route key="access-denied" path="/access-denied" element={<AccessDeniedPage />} />,
  <Route key="verification-required" path="/verification-required" element={<VerificationRequiredPage />} />
];

export default authRoutes;
