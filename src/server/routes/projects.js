/**
 * Project Routes
 * 
 * This file defines API routes for project management.
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { projectValidation } = require('../middleware/validationSchemas');

// GET /api/projects - Get all projects
router.get('/', authMiddleware.isAuthenticated, projectController.getAllProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', 
  authMiddleware.isAuthenticated, 
  validate(projectValidation.getProjectById),
  projectController.getProjectById
);

// POST /api/projects - Create a new project
router.post('/', 
  authMiddleware.isAuthenticated, 
  validate(projectValidation.createProject),
  projectController.createProject
);

// PUT /api/projects/:id - Update project
router.put('/:id', 
  authMiddleware.isAuthenticated, 
  validate([...projectValidation.getProjectById, ...projectValidation.createProject]),
  projectController.updateProject
);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', 
  authMiddleware.isManagerOrAdmin, // Restricted to manager or admin for security
  validate(projectValidation.getProjectById),
  projectController.deleteProject
);

// GET /api/projects/client/:clientId - Get projects by client ID
router.get('/client/:clientId', 
  authMiddleware.isAuthenticated, 
  validate([{ name: 'clientId', in: 'params', schema: { type: 'string', format: 'uuid' } }]),
  projectController.getProjectsByClient
);

module.exports = router;
