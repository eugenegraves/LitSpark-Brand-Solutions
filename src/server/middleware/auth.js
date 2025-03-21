/**
 * Authentication Middleware
 * 
 * This middleware handles authentication and authorization for protected routes.
 * It validates JWT tokens and checks user permissions.
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'litspark-secret-key';

/**
 * Middleware to check if user is authenticated
 */
const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user by id
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Check if user is active
    if (!user.active) {
      return res.status(401).json({ message: 'Account is disabled' });
    }
    
    // Attach user to request object
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

/**
 * Middleware to check if user is an admin
 */
const isAdmin = async (req, res, next) => {
  try {
    // First check if user is authenticated
    await isAuthenticated(req, res, () => {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Admin access required',
          error: 'You do not have permission to access this resource'
        });
      }
      
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Middleware to check if user is a manager or admin
 */
const isManagerOrAdmin = async (req, res, next) => {
  try {
    // First check if user is authenticated
    await isAuthenticated(req, res, () => {
      // Check if user is manager or admin
      if (req.user.role !== 'manager' && req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Manager access required',
          error: 'You do not have permission to access this resource'
        });
      }
      
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Middleware to check if user is a client
 */
const isClient = async (req, res, next) => {
  try {
    // First check if user is authenticated
    await isAuthenticated(req, res, () => {
      // Check if user is client
      if (req.user.role !== 'client') {
        return res.status(403).json({ 
          message: 'Client access required',
          error: 'You do not have permission to access this resource'
        });
      }
      
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Middleware to check if user is owner of resource or admin
 */
const isOwnerOrAdmin = async (req, res, next) => {
  try {
    // First check if user is authenticated
    await isAuthenticated(req, res, () => {
      // Check if user is admin or owner
      if (req.user.role === 'admin' || req.user.id === req.params.id) {
        return next();
      }
      
      res.status(403).json({ 
        message: 'Unauthorized access',
        error: 'You do not have permission to access this resource'
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Middleware to check if user has verified email
 */
const hasVerifiedEmail = async (req, res, next) => {
  try {
    // First check if user is authenticated
    await isAuthenticated(req, res, () => {
      // Check if user has verified email
      if (!req.user.emailVerified) {
        return res.status(403).json({ 
          message: 'Email verification required',
          error: 'Please verify your email before accessing this resource'
        });
      }
      
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isManagerOrAdmin,
  isClient,
  isOwnerOrAdmin,
  hasVerifiedEmail
};
