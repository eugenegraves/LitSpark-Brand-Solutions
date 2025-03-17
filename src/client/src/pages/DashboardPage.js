/**
 * Dashboard Page
 * 
 * Main dashboard page for authenticated users.
 * Follows WCAG 2.1 accessibility standards with proper color contrast,
 * focus management, and keyboard navigation.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="dashboard-page">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <header className="dashboard-header">
        <div className="container">
          <div className="logo">
            <img 
              src="/logo.png" 
              alt="LitSpark Brand Solutions Logo" 
              width="140" 
              height="45"
            />
          </div>
          
          <nav className="main-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/projects" className="nav-link">Projects</Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link">Services</Link>
              </li>
              <li className="nav-item">
                <Link to="/support" className="nav-link">Support</Link>
              </li>
            </ul>
          </nav>
          
          <div className="user-menu">
            <button 
              className="user-menu-button"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="user-name">{user?.firstName || 'User'}</span>
              <span className="user-avatar">
                {user?.firstName?.charAt(0) || 'U'}
              </span>
            </button>
            
            <div className="user-dropdown" aria-label="User menu dropdown">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <button 
                onClick={handleLogout} 
                className="dropdown-item logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main id="main-content" tabIndex="-1" className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">Welcome, {user?.firstName || 'User'}!</h1>
            <p className="dashboard-subtitle">
              This is your personal dashboard where you can manage your projects and services.
            </p>
          </div>
          
          <div className="dashboard-stats">
            <div className="stat-card">
              <h2 className="stat-title">Active Projects</h2>
              <p className="stat-value">3</p>
              <Link to="/projects" className="stat-link">View all projects</Link>
            </div>
            
            <div className="stat-card">
              <h2 className="stat-title">Messages</h2>
              <p className="stat-value">12</p>
              <Link to="/messages" className="stat-link">View all messages</Link>
            </div>
            
            <div className="stat-card">
              <h2 className="stat-title">Tasks</h2>
              <p className="stat-value">8</p>
              <Link to="/tasks" className="stat-link">View all tasks</Link>
            </div>
            
            <div className="stat-card">
              <h2 className="stat-title">Invoices</h2>
              <p className="stat-value">2</p>
              <Link to="/invoices" className="stat-link">View all invoices</Link>
            </div>
          </div>
          
          <div className="dashboard-sections">
            <section className="dashboard-section">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon" aria-hidden="true">📝</div>
                  <div className="activity-content">
                    <h3 className="activity-title">Project Updated</h3>
                    <p className="activity-description">Website Redesign project was updated</p>
                    <p className="activity-time">2 hours ago</p>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon" aria-hidden="true">💬</div>
                  <div className="activity-content">
                    <h3 className="activity-title">New Message</h3>
                    <p className="activity-description">You received a new message from John Doe</p>
                    <p className="activity-time">Yesterday</p>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon" aria-hidden="true">✅</div>
                  <div className="activity-content">
                    <h3 className="activity-title">Task Completed</h3>
                    <p className="activity-description">Logo Design task was marked as completed</p>
                    <p className="activity-time">3 days ago</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="dashboard-section">
              <h2 className="section-title">Upcoming Deadlines</h2>
              <div className="deadline-list">
                <div className="deadline-item">
                  <div className="deadline-date">
                    <span className="date-day">15</span>
                    <span className="date-month">Apr</span>
                  </div>
                  <div className="deadline-content">
                    <h3 className="deadline-title">Website Mockup Review</h3>
                    <p className="deadline-project">Website Redesign Project</p>
                  </div>
                </div>
                
                <div className="deadline-item">
                  <div className="deadline-date">
                    <span className="date-day">22</span>
                    <span className="date-month">Apr</span>
                  </div>
                  <div className="deadline-content">
                    <h3 className="deadline-title">Content Submission</h3>
                    <p className="deadline-project">Brand Identity Project</p>
                  </div>
                </div>
                
                <div className="deadline-item">
                  <div className="deadline-date">
                    <span className="date-day">30</span>
                    <span className="date-month">Apr</span>
                  </div>
                  <div className="deadline-content">
                    <h3 className="deadline-title">Final Deliverables</h3>
                    <p className="deadline-project">Marketing Campaign</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <footer className="dashboard-footer">
        <div className="container">
          <div className="footer-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} LitSpark Brand Solutions. All rights reserved.
            </p>
            <nav className="footer-nav" aria-label="Footer Navigation">
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <Link to="/privacy" className="footer-nav-link">Privacy Policy</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/terms" className="footer-nav-link">Terms of Service</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/contact" className="footer-nav-link">Contact Us</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
