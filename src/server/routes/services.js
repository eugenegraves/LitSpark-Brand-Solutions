/**
 * Service Routes
 * 
 * This file defines API routes for service management.
 */

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/auth');

// GET /api/services - Get all services
router.get('/', serviceController.getAllServices);

// GET /api/services/:id - Get service by ID
router.get('/:id', serviceController.getServiceById);

// POST /api/services - Create a new service (admin only)
router.post('/', authMiddleware.isAdmin, serviceController.createService);

// PUT /api/services/:id - Update service (admin only)
router.put('/:id', authMiddleware.isAdmin, serviceController.updateService);

// DELETE /api/services/:id - Delete service (admin only)
router.delete('/:id', authMiddleware.isAdmin, serviceController.deleteService);

// GET /api/services/category/:category - Get services by category
router.get('/category/:category', serviceController.getServicesByCategory);

module.exports = router;
