/**
 * Project Controller
 * 
 * This controller handles project management operations.
 */

const { Project, Client, User, Service } = require('../models');

/**
 * Get all projects
 * @route GET /api/projects
 * @access Authenticated users
 */
const getAllProjects = async (req, res) => {
  try {
    // Admin can see all projects, other users only see their own
    const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
    
    const projects = await Project.findAll({
      where,
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Service, attributes: ['id', 'name', 'category'] }
      ]
    });
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get project by ID
 * @route GET /api/projects/:id
 * @access Authenticated users
 */
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: Client, attributes: ['id', 'name', 'contactName', 'contactEmail'] },
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Service, attributes: ['id', 'name', 'category', 'description'] }
      ]
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user has access to this project
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Create a new project
 * @route POST /api/projects
 * @access Authenticated users
 */
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      startDate,
      endDate,
      budget,
      priority,
      clientId,
      serviceIds
    } = req.body;
    
    // Create project
    const project = await Project.create({
      title,
      description,
      status,
      startDate,
      endDate,
      budget,
      priority,
      clientId,
      userId: req.user.id
    });
    
    // Add services if provided
    if (serviceIds && serviceIds.length > 0) {
      await project.setServices(serviceIds);
    }
    
    // Return created project with associations
    const createdProject = await Project.findByPk(project.id, {
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Service, attributes: ['id', 'name', 'category'] }
      ]
    });
    
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update project
 * @route PUT /api/projects/:id
 * @access Authenticated users
 */
const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      startDate,
      endDate,
      budget,
      priority,
      clientId,
      serviceIds
    } = req.body;
    
    // Find project by ID
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user has access to update this project
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    // Update project fields
    if (title) project.title = title;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;
    if (startDate) project.startDate = startDate;
    if (endDate) project.endDate = endDate;
    if (budget) project.budget = budget;
    if (priority) project.priority = priority;
    if (clientId) project.clientId = clientId;
    
    // Save changes
    await project.save();
    
    // Update services if provided
    if (serviceIds && serviceIds.length > 0) {
      await project.setServices(serviceIds);
    }
    
    // Return updated project with associations
    const updatedProject = await Project.findByPk(project.id, {
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Service, attributes: ['id', 'name', 'category'] }
      ]
    });
    
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete project
 * @route DELETE /api/projects/:id
 * @access Authenticated users
 */
const deleteProject = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user has access to delete this project
    if (req.user.role !== 'admin' && project.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    // Delete project
    await project.destroy();
    
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get projects by client ID
 * @route GET /api/projects/client/:clientId
 * @access Authenticated users
 */
const getProjectsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    
    // Admin can see all projects, other users only see their own
    const where = { clientId };
    if (req.user.role !== 'admin') {
      where.userId = req.user.id;
    }
    
    const projects = await Project.findAll({
      where,
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Service, attributes: ['id', 'name', 'category'] }
      ]
    });
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByClient
};
