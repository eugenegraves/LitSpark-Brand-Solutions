/**
 * Error Handler Middleware
 * 
 * This middleware provides centralized error handling for the API.
 * It formats error responses consistently and handles different types of errors.
 */

// Custom error class for API errors
class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Not Found error handler - for routes that don't exist
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Resource not found - ${req.originalUrl}`);
  next(error);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  // Log error for server-side debugging
  console.error(err);
  
  // Default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server error';
  
  // Format response based on environment
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...(err.errors && { errors: err.errors })
  };
  
  // Send response with appropriate status code
  res.status(statusCode).json(response);
};

module.exports = {
  ApiError,
  notFound,
  errorHandler
};
