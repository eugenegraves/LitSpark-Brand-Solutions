/**
 * Client Controller
 * 
 * This controller handles client management operations.
 */

const { Client, Project } = require('../models');

/**
 * Get all clients
 * @route GET /api/clients
 * @access Authenticated users
 */
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: { active: true },
      attributes: { exclude: ['notes'] }
    });
    
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get client by ID
 * @route GET /api/clients/:id
 * @access Authenticated users
 */
const getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, {
      include: [
        { 
          model: Project,
          attributes: ['id', 'title', 'status', 'startDate', 'endDate']
        }
      ]
    });
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Create a new client
 * @route POST /api/clients
 * @access Authenticated users
 */
const createClient = async (req, res) => {
  try {
    const {
      name,
      industry,
      contactName,
      contactEmail,
      contactPhone,
      address,
      website,
      notes
    } = req.body;
    
    // Create client
    const client = await Client.create({
      name,
      industry,
      contactName,
      contactEmail,
      contactPhone,
      address,
      website,
      notes,
      active: true
    });
    
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update client
 * @route PUT /api/clients/:id
 * @access Authenticated users
 */
const updateClient = async (req, res) => {
  try {
    const {
      name,
      industry,
      contactName,
      contactEmail,
      contactPhone,
      address,
      website,
      notes,
      active
    } = req.body;
    
    // Find client by ID
    const client = await Client.findByPk(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Update client fields
    if (name) client.name = name;
    if (industry !== undefined) client.industry = industry;
    if (contactName !== undefined) client.contactName = contactName;
    if (contactEmail !== undefined) client.contactEmail = contactEmail;
    if (contactPhone !== undefined) client.contactPhone = contactPhone;
    if (address !== undefined) client.address = address;
    if (website !== undefined) client.website = website;
    if (notes !== undefined) client.notes = notes;
    if (active !== undefined) client.active = active;
    
    // Save changes
    await client.save();
    
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete client
 * @route DELETE /api/clients/:id
 * @access Authenticated users
 */
const deleteClient = async (req, res) => {
  try {
    // Find client by ID
    const client = await Client.findByPk(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Check if client has associated projects
    const projectCount = await Project.count({ where: { clientId: client.id } });
    
    if (projectCount > 0) {
      // Soft delete by setting active to false
      client.active = false;
      await client.save();
      
      return res.status(200).json({ 
        message: 'Client deactivated successfully. Cannot be fully deleted due to associated projects.' 
      });
    }
    
    // Hard delete if no associated projects
    await client.destroy();
    
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
