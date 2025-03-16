/**
 * Authentication Controller
 * 
 * This controller handles authentication operations like login, register, etc.
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'litspark-secret-key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';

/**
 * Generate JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
};

/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
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
      role: 'staff' // Default role
    });
    
    // Generate token
    const token = generateToken(user);
    
    // Return user without password
    const userWithoutPassword = { ...user.get(), password: undefined };
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if user is active
    if (!user.active) {
      return res.status(401).json({ message: 'Account is disabled' });
    }
    
    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Generate token
    const token = generateToken(user);
    
    // Return user without password
    const userWithoutPassword = { ...user.get(), password: undefined };
    
    res.status(200).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 * @access Authenticated users
 */
const logout = async (req, res) => {
  try {
    // In a real implementation, you might want to invalidate the token
    // by adding it to a blacklist or using Redis for token management
    
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get current user
 * @route GET /api/auth/me
 * @access Authenticated users
 */
const getCurrentUser = async (req, res) => {
  try {
    // User is already attached to request by auth middleware
    const user = req.user;
    
    // Return user without password
    const userWithoutPassword = { ...user.get(), password: undefined };
    
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Refresh access token
 * @route POST /api/auth/refresh-token
 * @access Public
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }
    
    // Verify refresh token
    // In a real implementation, you would validate against stored refresh tokens
    
    // For now, just return a new token
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    
    // Generate new token
    const token = generateToken(user);
    
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token', error: error.message });
  }
};

/**
 * Request password reset
 * @route POST /api/auth/forgot-password
 * @access Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'Password reset email sent if account exists' });
    }
    
    // Generate reset token
    // In a real implementation, you would save this token to the database
    // and send an email with a reset link
    
    res.status(200).json({ message: 'Password reset email sent if account exists' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Reset password with token
 * @route POST /api/auth/reset-password
 * @access Public
 */
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }
    
    // Verify token
    // In a real implementation, you would validate against stored reset tokens
    
    // For now, just return success
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
  forgotPassword,
  resetPassword
};
