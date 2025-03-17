/**
 * Authentication Routes
 * 
 * This file defines API routes for authentication and authorization.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { authValidation } = require('../middleware/validationSchemas');

// POST /api/auth/register - Register a new user
router.post('/register', validate(authValidation.register), authController.register);

// POST /api/auth/verify-email - Verify user email
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

// POST /api/auth/resend-verification - Resend verification email
router.post('/resend-verification', validate(authValidation.resendVerification), authController.resendVerification);

// POST /api/auth/login - Login user
router.post('/login', validate(authValidation.login), authController.login);

// POST /api/auth/logout - Logout user
router.post('/logout', authMiddleware.isAuthenticated, authController.logout);

// GET /api/auth/me - Get current user
router.get('/me', authMiddleware.isAuthenticated, authController.getCurrentUser);

// POST /api/auth/refresh-token - Refresh access token
router.post('/refresh-token', validate(authValidation.refreshToken), authController.refreshToken);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;
