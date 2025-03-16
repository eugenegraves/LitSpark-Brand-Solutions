/**
 * Mock Server for Testing
 * 
 * This file provides a modified version of the server that doesn't
 * automatically start listening on a port when imported.
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Import mock models
const db = require('./models/index');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Import routes
const authRoutes = require('../src/server/routes/auth');
const userRoutes = require('../src/server/routes/users');
const clientRoutes = require('../src/server/routes/clients');
const projectRoutes = require('../src/server/routes/projects');
const serviceRoutes = require('../src/server/routes/services');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Export the app without starting it
module.exports = app;
