/**
 * Protected Route Component
 * 
 * This component handles authentication and role-based access control for routes.
 * It redirects unauthenticated users to the login page and unauthorized users
 * to an access denied page.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Protected Route Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string[]} [props.allowedRoles] - Roles allowed to access this route
 * @param {boolean} [props.requireVerified=false] - Whether email verification is required
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requireVerified = false 
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="loading-container" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if email verification is required
  if (requireVerified && !user.emailVerified) {
    return <Navigate to="/verification-required" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" state={{ from: location }} replace />;
  }

  // If all checks pass, render the children
  return children;
};

export default ProtectedRoute;
