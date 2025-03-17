/**
 * Client Routes
 * 
 * This file defines API routes for client management.
 */

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { clientValidation } = require('../middleware/validationSchemas');

// GET /api/clients - Get all clients
router.get('/', authMiddleware.isAuthenticated, clientController.getAllClients);

// GET /api/clients/:id - Get client by ID
router.get('/:id', 
  authMiddleware.isAuthenticated, 
  validate(clientValidation.getClientById),
  clientController.getClientById
);

// POST /api/clients - Create a new client
router.post('/', 
  authMiddleware.isAuthenticated, 
  validate(clientValidation.createClient),
  clientController.createClient
);

// PUT /api/clients/:id - Update client
router.put('/:id', 
  authMiddleware.isAuthenticated, 
  validate([...clientValidation.getClientById, ...clientValidation.createClient]),
  clientController.updateClient
);

// DELETE /api/clients/:id - Delete client
router.delete('/:id', 
  authMiddleware.isAdmin, // Restricted to admin only for security
  validate(clientValidation.getClientById),
  clientController.deleteClient
);

module.exports = router;
