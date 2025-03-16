/**
 * Service Controller
 * 
 * This controller handles service management operations.
 */

const { Service, Project } = require('../models');

/**
 * Get all services
 * @route GET /api/services
 * @access Public
 */
const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { active: true },
      order: [['category', 'ASC'], ['name', 'ASC']]
    });
    
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get service by ID
 * @route GET /api/services/:id
 * @access Public
 */
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Create a new service
 * @route POST /api/services
 * @access Admin only
 */
const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      basePrice,
      duration,
      icon
    } = req.body;
    
    // Create service
    const service = await Service.create({
      name,
      description,
      category,
      basePrice,
      duration,
      icon,
      active: true
    });
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update service
 * @route PUT /api/services/:id
 * @access Admin only
 */
const updateService = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      basePrice,
      duration,
      icon,
      active
    } = req.body;
    
    // Find service by ID
    const service = await Service.findByPk(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Update service fields
    if (name) service.name = name;
    if (description !== undefined) service.description = description;
    if (category) service.category = category;
    if (basePrice !== undefined) service.basePrice = basePrice;
    if (duration !== undefined) service.duration = duration;
    if (icon !== undefined) service.icon = icon;
    if (active !== undefined) service.active = active;
    
    // Save changes
    await service.save();
    
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete service
 * @route DELETE /api/services/:id
 * @access Admin only
 */
const deleteService = async (req, res) => {
  try {
    // Find service by ID
    const service = await Service.findByPk(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if service is associated with any projects
    const projects = await service.getProjects();
    
    if (projects.length > 0) {
      // Soft delete by setting active to false
      service.active = false;
      await service.save();
      
      return res.status(200).json({ 
        message: 'Service deactivated successfully. Cannot be fully deleted due to associated projects.' 
      });
    }
    
    // Hard delete if no associated projects
    await service.destroy();
    
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get services by category
 * @route GET /api/services/category/:category
 * @access Public
 */
const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const services = await Service.findAll({
      where: { 
        category,
        active: true 
      },
      order: [['name', 'ASC']]
    });
    
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServicesByCategory
};
