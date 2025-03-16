/**
 * User Controller
 * 
 * This controller handles user management operations.
 */

const { User } = require('../models');

/**
 * Get all users
 * @route GET /api/users
 * @access Admin only
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get user by ID
 * @route GET /api/users/:id
 * @access Authenticated users
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Create a new user
 * @route POST /api/users
 * @access Admin only
 */
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });
    
    // Return user without password
    const userWithoutPassword = { ...user.get(), password: undefined };
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update user
 * @route PUT /api/users/:id
 * @access Owner or Admin
 */
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role, active } = req.body;
    
    // Find user by ID
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (role && req.user.role === 'admin') user.role = role;
    if (active !== undefined && req.user.role === 'admin') user.active = active;
    
    // Save changes
    await user.save();
    
    // Return updated user without password
    const userWithoutPassword = { ...user.get(), password: undefined };
    
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete user
 * @route DELETE /api/users/:id
 * @access Admin only
 */
const deleteUser = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user
    await user.destroy();
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
