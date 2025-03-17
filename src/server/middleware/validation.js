/**
 * Validation Middleware
 * 
 * This middleware handles request validation using express-validator.
 * It provides centralized validation logic for API endpoints.
 * All validation errors are formatted to be accessible and user-friendly.
 */

const { validationResult } = require('express-validator');

/**
 * Custom error formatter for better accessibility
 * @param {Object} error - Validation error object
 * @returns {Object} Formatted error object
 */
const errorFormatter = (error) => {
  return {
    path: error.path,
    msg: error.msg,
    location: error.location,
    value: error.value
  };
};

/**
 * Validate request based on validation rules
 * @param {Array} validations - Array of validation rules
 * @returns {Function} Middleware function
 */
const validate = (validations) => {
  return async (req, res, next) => {
    try {
      // Execute all validations
      await Promise.all(validations.map(validation => validation.run(req)));

      // Check for validation errors with custom formatter
      const errors = validationResult(req).formatWith(errorFormatter);
      
      if (!errors.isEmpty()) {
        // Format errors for better accessibility and readability
        const formattedErrors = errors.array().reduce((acc, error) => {
          if (!acc[error.path]) {
            acc[error.path] = [];
          }
          acc[error.path].push(error.msg);
          return acc;
        }, {});
        
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
          errorCount: errors.array().length
        });
      }
      
      next();
    } catch (error) {
      console.error('Validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred during validation',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  };
};

/**
 * Sanitize file name to prevent path traversal and ensure safe filenames
 * @param {string} filename - Original filename
 * @returns {string} Sanitized filename
 */
const sanitizeFileName = (filename) => {
  if (!filename) return '';
  
  // Remove any path components
  const baseName = filename.replace(/^.*[\\\/]/, '');
  
  // Replace any non-alphanumeric characters except for periods, underscores, and hyphens
  return baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
};

module.exports = {
  validate,
  sanitizeFileName
};
