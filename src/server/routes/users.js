/**
 * User Routes
 * 
 * This file defines API routes for user management.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// GET /api/users - Get all users (admin only)
router.get('/', authMiddleware.isAdmin, userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', authMiddleware.isAuthenticated, userController.getUserById);

// POST /api/users - Create a new user (admin only)
router.post('/', authMiddleware.isAdmin, userController.createUser);

// PUT /api/users/:id - Update user
router.put('/:id', authMiddleware.isOwnerOrAdmin, userController.updateUser);

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
