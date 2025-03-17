/**
 * Monitoring Service Tests
 * 
 * This file contains tests for the monitoring service functionality including
 * request tracking, system metrics collection, and health checks.
 */

// Mock dependencies
jest.mock('../../../src/server/utils/loggerService', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}));

jest.mock('os', () => ({
  totalmem: jest.fn().mockReturnValue(16000000000), // 16 GB
  freemem: jest.fn().mockReturnValue(8000000000),   // 8 GB
  loadavg: jest.fn().mockReturnValue([1.5, 1.2, 0.8]),
  cpus: jest.fn().mockReturnValue(Array(4).fill({})), // 4 CPU cores
  uptime: jest.fn().mockReturnValue(3600) // 1 hour
}));

// Import dependencies
const monitoringService = require('../../../src/server/utils/monitoringService');
const logger = require('../../../src/server/utils/loggerService');
const os = require('os');

describe('Monitoring Service', () => {
  beforeEach(() => {
    // Reset metrics before each test
    monitoringService._resetMetrics();
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    test('should initialize monitoring with middleware', () => {
      // Arrange
      const app = {
        use: jest.fn()
      };

      // Act
      monitoringService.initializeMonitoring(app);

      // Assert
      expect(app.use).toHaveBeenCalledWith(monitoringService.requestMonitoringMiddleware);
      expect(logger.info).toHaveBeenCalledWith('Monitoring service initialized');
    });
  });

  describe('Request Monitoring', () => {
    test('should track successful requests', () => {
      // Arrange
      const req = {
        path: '/api/test',
        method: 'GET',
        route: { path: '/test' }
      };
      
      const res = {
        send: jest.fn(),
        statusCode: 200
      };
      
      const next = jest.fn();
      
      // Act
      monitoringService.requestMonitoringMiddleware(req, res, next);
      
      // Call the modified send method to trigger metrics update
      res.send();
      
      // Get metrics
      const metrics = monitoringService.getMetrics();
      
      // Assert
      expect(next).toHaveBeenCalled();
      expect(metrics.requests.total).toBe(1);
      expect(metrics.requests.success).toBe(1);
      expect(metrics.requests.error).toBe(0);
      expect(metrics.endpoints).toHaveLength(1);
      expect(metrics.endpoints[0].endpoint).toBe('GET /test');
      expect(metrics.endpoints[0].requests.total).toBe(1);
      expect(metrics.endpoints[0].requests.success).toBe(1);
      expect(metrics.endpoints[0].requests.error).toBe(0);
    });

    test('should track error requests', () => {
      // Arrange
      const req = {
        path: '/api/test',
        method: 'POST',
        route: { path: '/test' }
      };
      
      const res = {
        send: jest.fn(),
        statusCode: 500
      };
      
      const next = jest.fn();
      
      // Act
      monitoringService.requestMonitoringMiddleware(req, res, next);
      
      // Call the modified send method to trigger metrics update
      res.send();
      
      // Get metrics
      const metrics = monitoringService.getMetrics();
      
      // Assert
      expect(metrics.requests.total).toBe(1);
      expect(metrics.requests.success).toBe(0);
      expect(metrics.requests.error).toBe(1);
      expect(metrics.endpoints[0].endpoint).toBe('POST /test');
      expect(metrics.endpoints[0].requests.total).toBe(1);
      expect(metrics.endpoints[0].requests.success).toBe(0);
      expect(metrics.endpoints[0].requests.error).toBe(1);
    });

    test('should skip monitoring for health check endpoints', () => {
      // Arrange
      const req = {
        path: '/api/health',
        method: 'GET'
      };
      
      const res = {};
      
      const next = jest.fn();
      
      // Act
      monitoringService.requestMonitoringMiddleware(req, res, next);
      
      // Get metrics
      const metrics = monitoringService.getMetrics();
      
      // Assert
      expect(next).toHaveBeenCalled();
      expect(metrics.requests.total).toBe(0);
    });

    test('should calculate response time', () => {
      // Arrange
      jest.useFakeTimers();
      
      const req = {
        path: '/api/test',
        method: 'GET',
        route: { path: '/test' }
      };
      
      const res = {
        send: jest.fn(),
        statusCode: 200
      };
      
      const next = jest.fn().mockImplementation(() => {
        // Simulate some processing time
        jest.advanceTimersByTime(100);
      });
      
      // Act
      monitoringService.requestMonitoringMiddleware(req, res, next);
      
      // Call the modified send method to trigger metrics update
      res.send();
      
      // Get metrics
      const metrics = monitoringService.getMetrics();
      
      // Assert
      expect(metrics.response.average).toBeGreaterThan(0);
      expect(metrics.endpoints[0].averageResponseTime).toBeGreaterThan(0);
      
      jest.useRealTimers();
    });
  });

  describe('System Metrics', () => {
    test('should collect system metrics', () => {
      // Act
      // Trigger system metrics collection via the public API
      monitoringService.initializeMonitoring({ use: jest.fn() });
      
      // Get metrics
      const metrics = monitoringService.getMetrics();
      
      // Assert
      expect(metrics.system.memory.total).toBe(16000000000);
      expect(metrics.system.memory.free).toBe(8000000000);
      expect(metrics.system.memory.used).toBe(8000000000);
      expect(metrics.system.memory.usagePercent).toBe(50);
      expect(metrics.system.cpu.load1).toBe(1.5);
      expect(metrics.system.cpu.cores).toBe(4);
      expect(metrics.system.uptime).toBe(3600);
    });

    test('should log warning when memory usage is high', () => {
      // Arrange
      os.freemem.mockReturnValueOnce(1000000000); // Only 1 GB free (93.75% used)
      
      // Act
      // Trigger system metrics collection via the public API
      monitoringService.initializeMonitoring({ use: jest.fn() });
      
      // Assert
      expect(logger.warn).toHaveBeenCalledWith('High memory usage detected', expect.any(Object));
    });

    test('should log warning when CPU load is high', () => {
      // Arrange
      os.loadavg.mockReturnValueOnce([5.0, 4.5, 4.0]); // High load compared to 4 cores
      
      // Act
      // Trigger system metrics collection via the public API
      monitoringService.initializeMonitoring({ use: jest.fn() });
      
      // Assert
      expect(logger.warn).toHaveBeenCalledWith('High CPU load detected', expect.any(Object));
    });

    test('should handle errors during metrics collection', () => {
      // Arrange
      os.totalmem.mockImplementationOnce(() => {
        throw new Error('Test error');
      });
      
      // Act
      // Trigger system metrics collection via the public API
      monitoringService.initializeMonitoring({ use: jest.fn() });
      
      // Assert
      expect(logger.error).toHaveBeenCalledWith('Error collecting system metrics', expect.any(Object));
    });
  });

  describe('Health Status', () => {
    test('should return health status', () => {
      // Act
      const health = monitoringService.getHealthStatus();
      
      // Assert
      expect(health.status).toBe('UP');
      expect(health.timestamp).toBeInstanceOf(Date);
      expect(health.uptime).toBeGreaterThanOrEqual(0);
      expect(health.memory).toBeDefined();
      expect(health.system.loadAverage).toEqual([1.5, 1.2, 0.8]);
      expect(health.system.freeMemory).toBe(8000000000);
      expect(health.system.totalMemory).toBe(16000000000);
    });
  });

  describe('Metrics', () => {
    test('should return application metrics', () => {
      // Arrange
      // Add some test data
      const req = {
        path: '/api/test',
        method: 'GET',
        route: { path: '/test' }
      };
      
      const res = {
        send: jest.fn(),
        statusCode: 200
      };
      
      const next = jest.fn();
      
      monitoringService.requestMonitoringMiddleware(req, res, next);
      res.send();
      
      // Act
      const metrics = monitoringService.getMetrics();
      
      // Assert
      expect(metrics.timestamp).toBeInstanceOf(Date);
      expect(metrics.requests.total).toBe(1);
      expect(metrics.requests.success).toBe(1);
      expect(metrics.requests.successRate).toBe(100);
      expect(metrics.response.average).toBeGreaterThanOrEqual(0);
      expect(metrics.endpoints).toHaveLength(1);
      expect(metrics.endpoints[0].endpoint).toBe('GET /test');
    });

    test('should calculate success rate correctly', () => {
      // Arrange
      // Add some test data with mixed success/error
      const req1 = {
        path: '/api/test',
        method: 'GET',
        route: { path: '/test' }
      };
      
      const res1 = {
        send: jest.fn(),
        statusCode: 200
      };
      
      const req2 = {
        path: '/api/test',
        method: 'POST',
        route: { path: '/test' }
      };
      
      const res2 = {
        send: jest.fn(),
        statusCode: 500
      };
      
      const next = jest.fn();
      
      // Act
      monitoringService.requestMonitoringMiddleware(req1, res1, next);
      res1.send();
      
      monitoringService.requestMonitoringMiddleware(req2, res2, next);
      res2.send();
      
      const metrics = monitoringService.getMetrics();
      
      // Assert
      expect(metrics.requests.total).toBe(2);
      expect(metrics.requests.success).toBe(1);
      expect(metrics.requests.error).toBe(1);
      expect(metrics.requests.successRate).toBe(50);
    });
  });
});
