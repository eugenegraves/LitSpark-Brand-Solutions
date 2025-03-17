/**
 * App Router
 * 
 * Main router component that defines all routes for the application.
 * Includes protected routes for authenticated users and role-based access control.
 * Follows WCAG 2.1 accessibility standards with proper focus management.
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

// Import route configurations
import authRoutes from './authRoutes';

// Import components
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Import pages
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';

// ScrollToTop component for accessibility
// This ensures the page scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Focus on main content for accessibility
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  }, [pathname]);

  return null;
};

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        
        {/* Skip link for keyboard navigation */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Authentication routes */}
          {authRoutes}
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminRoutes />
              </ProtectedRoute>
            } 
          />
          
          {/* Client routes */}
          <Route 
            path="/client/*" 
            element={
              <ProtectedRoute allowedRoles={['client']} requireVerified={true}>
                <ClientRoutes />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

// Admin routes
const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<div>Admin Dashboard</div>} />
    <Route path="/users" element={<div>User Management</div>} />
    <Route path="/settings" element={<div>Admin Settings</div>} />
  </Routes>
);

// Client routes
const ClientRoutes = () => (
  <Routes>
    <Route path="/" element={<div>Client Dashboard</div>} />
    <Route path="/projects" element={<div>Client Projects</div>} />
    <Route path="/profile" element={<div>Client Profile</div>} />
  </Routes>
);

export default AppRouter;
