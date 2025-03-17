/**
 * Logger Service
 * 
 * This service provides a centralized logging mechanism for the application.
 * It supports different log levels (debug, info, warn, error) and includes
 * context information like timestamps, request IDs, and user IDs.
 */

const winston = require('winston');
const { format, createLogger, transports } = winston;

// Define log levels and colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

// Add colors to Winston
winston.addColors(logColors);

// Create format for console output
const consoleFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize({ all: true }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaString}`;
  })
);

// Create format for file output (without colors)
const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
);

// Determine log level based on environment
const getLogLevel = () => {
  const env = process.env.NODE_ENV || 'development';
  switch (env) {
    case 'production':
      return 'info';
    case 'test':
      return 'error'; // Only log errors in test environment
    default:
      return 'debug';
  }
};

// Create the logger
const logger = createLogger({
  level: getLogLevel(),
  levels: logLevels,
  format: fileFormat,
  defaultMeta: { service: 'litspark-brand-solutions' },
  transports: [
    // Write logs to console
    new transports.Console({
      format: consoleFormat
    }),
    // Write all logs with level 'error' and below to error.log
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    // Write all logs to combined.log
    new transports.File({
      filename: 'logs/combined.log'
    })
  ],
  // Don't exit on uncaught exceptions
  exitOnError: false
});

// Add request context middleware
const addRequestContext = (req, res, next) => {
  // Generate a unique request ID if not provided
  const requestId = req.headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  
  // Add request ID to response headers
  res.setHeader('x-request-id', requestId);
  
  // Create a child logger with request context
  req.logger = logger.child({
    requestId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user ? req.user.id : undefined
  });
  
  // Log HTTP request
  req.logger.http(`HTTP ${req.method} ${req.originalUrl}`);
  
  next();
};

// Log unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection', { reason, promise });
});

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  // Give the logger time to flush before exiting
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Create log directory if it doesn't exist
const fs = require('fs');
const path = require('path');
const logDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Export the logger
module.exports = logger;
module.exports.addRequestContext = addRequestContext;
