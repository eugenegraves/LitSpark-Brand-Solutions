/**
 * Project Routes
 * 
 * This file defines API routes for project management.
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');

// GET /api/projects - Get all projects
router.get('/', authMiddleware.isAuthenticated, projectController.getAllProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', authMiddleware.isAuthenticated, projectController.getProjectById);

// POST /api/projects - Create a new project
router.post('/', authMiddleware.isAuthenticated, projectController.createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', authMiddleware.isAuthenticated, projectController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', authMiddleware.isAuthenticated, projectController.deleteProject);

// GET /api/projects/client/:clientId - Get projects by client ID
router.get('/client/:clientId', authMiddleware.isAuthenticated, projectController.getProjectsByClient);

module.exports = router;
