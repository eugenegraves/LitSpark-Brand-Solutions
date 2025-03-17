require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { testConnection } = require('./config/database');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const fileUploadService = require('./utils/fileUploadService');

// Import routes
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const clientRoutes = require('./routes/clients');
const serviceRoutes = require('./routes/services');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/uploads');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 9876;

// Test database connection
testConnection();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads/public', express.static(fileUploadService.PUBLIC_DIR));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'LitSpark Brand Solutions API is running',
    version: process.env.API_VERSION || '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.status(200).json({
    message: 'LitSpark Brand Solutions API Documentation',
    endpoints: {
      auth: {
        register: { method: 'POST', path: '/api/auth/register', description: 'Register a new user' },
        login: { method: 'POST', path: '/api/auth/login', description: 'Login user' },
        logout: { method: 'POST', path: '/api/auth/logout', description: 'Logout user' },
        me: { method: 'GET', path: '/api/auth/me', description: 'Get current user' },
        verifyEmail: { method: 'POST', path: '/api/auth/verify-email', description: 'Verify user email' },
        resendVerification: { method: 'POST', path: '/api/auth/resend-verification', description: 'Resend verification email' },
        refreshToken: { method: 'POST', path: '/api/auth/refresh-token', description: 'Refresh access token' },
        forgotPassword: { method: 'POST', path: '/api/auth/forgot-password', description: 'Request password reset' },
        resetPassword: { method: 'POST', path: '/api/auth/reset-password', description: 'Reset password with token' }
      },
      users: {
        getAll: { method: 'GET', path: '/api/users', description: 'Get all users (admin only)' },
        getById: { method: 'GET', path: '/api/users/:id', description: 'Get user by ID' },
        create: { method: 'POST', path: '/api/users', description: 'Create a new user (admin only)' },
        update: { method: 'PUT', path: '/api/users/:id', description: 'Update user' },
        delete: { method: 'DELETE', path: '/api/users/:id', description: 'Delete user (admin only)' }
      },
      clients: {
        getAll: { method: 'GET', path: '/api/clients', description: 'Get all clients' },
        getById: { method: 'GET', path: '/api/clients/:id', description: 'Get client by ID' },
        create: { method: 'POST', path: '/api/clients', description: 'Create a new client' },
        update: { method: 'PUT', path: '/api/clients/:id', description: 'Update client' },
        delete: { method: 'DELETE', path: '/api/clients/:id', description: 'Delete client (admin only)' }
      },
      services: {
        getAll: { method: 'GET', path: '/api/services', description: 'Get all services' },
        getById: { method: 'GET', path: '/api/services/:id', description: 'Get service by ID' },
        create: { method: 'POST', path: '/api/services', description: 'Create a new service (admin only)' },
        update: { method: 'PUT', path: '/api/services/:id', description: 'Update service (admin only)' },
        delete: { method: 'DELETE', path: '/api/services/:id', description: 'Delete service (admin only)' }
      },
      projects: {
        getAll: { method: 'GET', path: '/api/projects', description: 'Get all projects' },
        getById: { method: 'GET', path: '/api/projects/:id', description: 'Get project by ID' },
        create: { method: 'POST', path: '/api/projects', description: 'Create a new project' },
        update: { method: 'PUT', path: '/api/projects/:id', description: 'Update project' },
        delete: { method: 'DELETE', path: '/api/projects/:id', description: 'Delete project (admin only)' }
      },
      uploads: {
        uploadFile: { method: 'POST', path: '/api/uploads', description: 'Upload a single file' },
        uploadMultiple: { method: 'POST', path: '/api/uploads/multiple', description: 'Upload multiple files' },
        uploadImages: { method: 'POST', path: '/api/uploads/images', description: 'Upload images' },
        uploadDocuments: { method: 'POST', path: '/api/uploads/documents', description: 'Upload documents' },
        deleteFile: { method: 'DELETE', path: '/api/uploads/:filename', description: 'Delete a file' },
        getFileInfo: { method: 'GET', path: '/api/uploads/:filename/info', description: 'Get file information' }
      }
    }
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

// 404 handler for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Only start the server if this file is run directly (not imported as a module)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // For testing purposes
