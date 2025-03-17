/**
 * Validation Schemas
 * 
 * This file defines validation schemas for API endpoints using express-validator.
 * It provides reusable validation rules for different resources.
 */

const { body, param, query } = require('express-validator');

/**
 * User validation schemas
 */
const userValidation = {
  // Create/update user validation
  createUser: [
    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required')
      .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
    
    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required')
      .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
    
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    
    body('password')
      .if(body('password').exists())
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    body('role')
      .optional()
      .isIn(['admin', 'manager', 'client']).withMessage('Invalid role specified')
  ],
  
  // Update user validation (password optional)
  updateUser: [
    body('firstName')
      .optional()
      .trim()
      .notEmpty().withMessage('First name cannot be empty')
      .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
    
    body('lastName')
      .optional()
      .trim()
      .notEmpty().withMessage('Last name cannot be empty')
      .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
    
    body('email')
      .optional()
      .trim()
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    
    body('role')
      .optional()
      .isIn(['admin', 'manager', 'client']).withMessage('Invalid role specified'),
    
    body('active')
      .optional()
      .isBoolean().withMessage('Active status must be a boolean')
  ],
  
  // Get user by ID validation
  getUserById: [
    param('id')
      .isUUID(4).withMessage('Invalid user ID format')
  ]
};

/**
 * Authentication validation schemas
 */
const authValidation = {
  // Register validation
  register: [
    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required')
      .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
    
    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required')
      .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
    
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  ],
  
  // Login validation
  login: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    
    body('password')
      .notEmpty().withMessage('Password is required')
  ],
  
  // Verify email validation
  verifyEmail: [
    body('token')
      .notEmpty().withMessage('Verification token is required')
  ],
  
  // Resend verification validation
  resendVerification: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail()
  ],
  
  // Forgot password validation
  forgotPassword: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail()
  ],
  
  // Reset password validation
  resetPassword: [
    body('token')
      .notEmpty().withMessage('Reset token is required'),
    
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  ],
  
  // Refresh token validation
  refreshToken: [
    body('refreshToken')
      .notEmpty().withMessage('Refresh token is required')
  ]
};

/**
 * Service validation schemas
 */
const serviceValidation = {
  // Create/update service validation
  createService: [
    body('name')
      .trim()
      .notEmpty().withMessage('Service name is required')
      .isLength({ max: 100 }).withMessage('Service name cannot exceed 100 characters'),
    
    body('description')
      .trim()
      .notEmpty().withMessage('Description is required')
      .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
    
    body('price')
      .optional()
      .isNumeric().withMessage('Price must be a number')
      .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
    
    body('category')
      .trim()
      .notEmpty().withMessage('Category is required'),
    
    body('features')
      .optional()
      .isArray().withMessage('Features must be an array'),
    
    body('active')
      .optional()
      .isBoolean().withMessage('Active status must be a boolean')
  ],
  
  // Get service by ID validation
  getServiceById: [
    param('id')
      .isUUID(4).withMessage('Invalid service ID format')
  ]
};

/**
 * Client validation schemas
 */
const clientValidation = {
  // Create/update client validation
  createClient: [
    body('name')
      .trim()
      .notEmpty().withMessage('Client name is required')
      .isLength({ max: 100 }).withMessage('Client name cannot exceed 100 characters'),
    
    body('contactPerson')
      .trim()
      .notEmpty().withMessage('Contact person is required')
      .isLength({ max: 100 }).withMessage('Contact person name cannot exceed 100 characters'),
    
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail(),
    
    body('phone')
      .optional()
      .trim()
      .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
      .withMessage('Please enter a valid phone number'),
    
    body('address')
      .optional()
      .trim()
      .isLength({ max: 200 }).withMessage('Address cannot exceed 200 characters'),
    
    body('industry')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('Industry cannot exceed 100 characters'),
    
    body('active')
      .optional()
      .isBoolean().withMessage('Active status must be a boolean')
  ],
  
  // Get client by ID validation
  getClientById: [
    param('id')
      .isUUID(4).withMessage('Invalid client ID format')
  ]
};

/**
 * Project validation schemas
 */
const projectValidation = {
  // Create project validation
  createProject: [
    body('name')
      .trim()
      .notEmpty().withMessage('Project name is required')
      .isLength({ max: 100 }).withMessage('Project name cannot exceed 100 characters'),
    
    body('description')
      .trim()
      .notEmpty().withMessage('Description is required')
      .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
    
    body('clientId')
      .optional()
      .isUUID(4).withMessage('Invalid client ID format'),
    
    body('startDate')
      .optional()
      .isISO8601().withMessage('Start date must be a valid date'),
    
    body('endDate')
      .optional()
      .isISO8601().withMessage('End date must be a valid date'),
    
    body('status')
      .optional()
      .isIn(['pending', 'active', 'completed', 'cancelled']).withMessage('Invalid status specified'),
    
    body('budget')
      .optional()
      .isNumeric().withMessage('Budget must be a number')
      .isFloat({ min: 0 }).withMessage('Budget cannot be negative'),
    
    body('services')
      .optional()
      .isArray().withMessage('Services must be an array')
  ],
  
  // Update project validation
  updateProject: [
    body('name')
      .optional()
      .trim()
      .notEmpty().withMessage('Project name cannot be empty')
      .isLength({ max: 100 }).withMessage('Project name cannot exceed 100 characters'),
    
    body('description')
      .optional()
      .trim()
      .notEmpty().withMessage('Description cannot be empty')
      .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
    
    body('clientId')
      .optional()
      .isUUID(4).withMessage('Invalid client ID format'),
    
    body('startDate')
      .optional()
      .isISO8601().withMessage('Start date must be a valid date'),
    
    body('endDate')
      .optional()
      .isISO8601().withMessage('End date must be a valid date'),
    
    body('status')
      .optional()
      .isIn(['pending', 'active', 'completed', 'cancelled']).withMessage('Invalid status specified'),
    
    body('budget')
      .optional()
      .isNumeric().withMessage('Budget must be a number')
      .isFloat({ min: 0 }).withMessage('Budget cannot be negative'),
    
    body('services')
      .optional()
      .isArray().withMessage('Services must be an array')
  ],
  
  // Get project by ID validation
  getProjectById: [
    param('id')
      .isUUID(4).withMessage('Invalid project ID format')
  ]
};

/**
 * Upload validation schemas
 */
const uploadValidation = {
  // Delete file validation
  deleteFile: [
    param('filename')
      .trim()
      .notEmpty().withMessage('Filename is required')
      .matches(/^[a-zA-Z0-9_\-\.]+$/).withMessage('Filename contains invalid characters')
      .isLength({ max: 255 }).withMessage('Filename is too long')
  ],
  
  // Get file info validation
  getFileInfo: [
    param('filename')
      .trim()
      .notEmpty().withMessage('Filename is required')
      .matches(/^[a-zA-Z0-9_\-\.]+$/).withMessage('Filename contains invalid characters')
      .isLength({ max: 255 }).withMessage('Filename is too long')
  ],
  
  // Upload file validation (used in middleware)
  uploadFile: [
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    
    body('tags')
      .optional()
      .isArray().withMessage('Tags must be an array')
  ],
  
  // Upload image validation (used in middleware)
  uploadImage: [
    body('alt')
      .optional()
      .trim()
      .isLength({ max: 255 }).withMessage('Alt text cannot exceed 255 characters'),
    
    body('caption')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Caption cannot exceed 500 characters')
  ],
  
  // Upload document validation (used in middleware)
  uploadDocument: [
    body('title')
      .optional()
      .trim()
      .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
    
    body('category')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('Category cannot exceed 100 characters')
  ]
};

module.exports = {
  userValidation,
  authValidation,
  serviceValidation,
  clientValidation,
  projectValidation,
  uploadValidation
};
