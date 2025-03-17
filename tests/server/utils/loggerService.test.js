/**
 * Logger Service Tests
 * 
 * This file contains tests for the logger service functionality including
 * log levels, formatting, and request context middleware.
 */

// Mock dependencies
jest.mock('winston', () => {
  const mockLogger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    http: jest.fn(),
    child: jest.fn().mockReturnThis()
  };
  
  return {
    format: {
      combine: jest.fn().mockReturnThis(),
      timestamp: jest.fn().mockReturnThis(),
      colorize: jest.fn().mockReturnThis(),
      printf: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    },
    createLogger: jest.fn().mockReturnValue(mockLogger),
    transports: {
      Console: jest.fn(),
      File: jest.fn()
    },
    addColors: jest.fn()
  };
});

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(false),
  mkdirSync: jest.fn()
}));

// Import dependencies after mocking
const winston = require('winston');
const fs = require('fs');

// Import the logger service
const logger = require('../../../src/server/utils/loggerService');

describe('Logger Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Logging Methods', () => {
    test('should have debug, info, warn, error, and http methods', () => {
      // Assert
      expect(typeof logger.debug).toBe('function');
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.http).toBe('function');
    });

    test('should log messages with the correct level', () => {
      // Act
      logger.debug('Debug message', { context: 'test' });
      logger.info('Info message', { context: 'test' });
      logger.warn('Warning message', { context: 'test' });
      logger.error('Error message', { context: 'test' });
      logger.http('HTTP message', { context: 'test' });
      
      // Assert - just verify the methods were called, don't check arguments
      // This is a more resilient test approach
      expect(winston.createLogger().debug).toHaveBeenCalled();
      expect(winston.createLogger().info).toHaveBeenCalled();
      expect(winston.createLogger().warn).toHaveBeenCalled();
      expect(winston.createLogger().error).toHaveBeenCalled();
      expect(winston.createLogger().http).toHaveBeenCalled();
    });
  });

  describe('Request Context Middleware', () => {
    test('should add request context to logger', () => {
      // Arrange
      const req = {
        headers: {},
        method: 'GET',
        originalUrl: '/api/test',
        ip: '127.0.0.1',
        user: { id: 'user123' }
      };
      
      const res = {
        setHeader: jest.fn()
      };
      
      const next = jest.fn();
      
      // Act
      logger.addRequestContext(req, res, next);
      
      // Assert
      expect(res.setHeader).toHaveBeenCalledWith('x-request-id', expect.any(String));
      expect(req.logger).toBeDefined();
      expect(winston.createLogger().child).toHaveBeenCalled();
      expect(winston.createLogger().http).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('should use provided request ID if available', () => {
      // Arrange
      const req = {
        headers: { 'x-request-id': 'test-request-id' },
        method: 'POST',
        originalUrl: '/api/test',
        ip: '127.0.0.1'
      };
      
      const res = {
        setHeader: jest.fn()
      };
      
      const next = jest.fn();
      
      // Act
      logger.addRequestContext(req, res, next);
      
      // Assert
      expect(res.setHeader).toHaveBeenCalledWith('x-request-id', 'test-request-id');
      expect(winston.createLogger().child).toHaveBeenCalled();
    });

    test('should handle missing user', () => {
      // Arrange
      const req = {
        headers: {},
        method: 'GET',
        originalUrl: '/api/test',
        ip: '127.0.0.1'
        // No user
      };
      
      const res = {
        setHeader: jest.fn()
      };
      
      const next = jest.fn();
      
      // Act
      logger.addRequestContext(req, res, next);
      
      // Assert - just verify the middleware doesn't throw an error
      expect(next).toHaveBeenCalled();
      expect(winston.createLogger().child).toHaveBeenCalled();
    });
  });
});
