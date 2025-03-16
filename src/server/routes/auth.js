/**
 * Authentication Routes
 * 
 * This file defines API routes for authentication and authorization.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/register - Register a new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// POST /api/auth/logout - Logout user
router.post('/logout', authMiddleware.isAuthenticated, authController.logout);

// GET /api/auth/me - Get current user
router.get('/me', authMiddleware.isAuthenticated, authController.getCurrentUser);

// POST /api/auth/refresh-token - Refresh access token
router.post('/refresh-token', authController.refreshToken);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', authController.resetPassword);

module.exports = router;
