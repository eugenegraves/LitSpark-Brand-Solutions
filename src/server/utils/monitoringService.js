/**
 * Monitoring Service
 * 
 * This service provides application monitoring capabilities including:
 * - Performance metrics tracking
 * - Health checks
 * - System resource usage
 * - API endpoint performance
 */

const os = require('os');
const logger = require('./loggerService');

// Store metrics in memory (in a production app, use a time-series database)
let metrics = {
  requests: {
    total: 0,
    success: 0,
    error: 0,
    byEndpoint: {}
  },
  response: {
    times: [],
    average: 0
  },
  system: {
    lastChecked: null,
    memory: {},
    cpu: {},
    uptime: 0
  },
  fileUploads: 0,
  errors: 0,
  errorTypes: {}
};

/**
 * Initialize monitoring
 * @param {Object} app - Express app
 */
const initializeMonitoring = (app) => {
  // Add monitoring middleware to track requests and responses
  app.use(requestMonitoringMiddleware);
  
  // Start collecting system metrics
  startSystemMetricsCollection();
  
  logger.info('Monitoring service initialized');
};

/**
 * Middleware to monitor requests and responses
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const requestMonitoringMiddleware = (req, res, next) => {
  // Skip monitoring for health check endpoints
  if (req.path === '/api/health' || req.path === '/api/metrics') {
    return next();
  }
  
  // Record request start time
  const startTime = Date.now();
  
  // Track endpoint
  const endpoint = `${req.method} ${req.route ? req.route.path : req.path}`;
  
  // Initialize endpoint metrics if not exists
  if (!metrics.requests.byEndpoint[endpoint]) {
    metrics.requests.byEndpoint[endpoint] = {
      total: 0,
      success: 0,
      error: 0,
      responseTimes: []
    };
  }
  
  // Increment total requests
  metrics.requests.total++;
  metrics.requests.byEndpoint[endpoint].total++;
  
  // Track response
  const originalSend = res.send;
  res.send = function() {
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Store response time
    metrics.response.times.push(responseTime);
    metrics.requests.byEndpoint[endpoint].responseTimes.push(responseTime);
    
    // Update average response time
    updateAverageResponseTime();
    
    // Track success/error
    if (res.statusCode >= 400) {
      metrics.requests.error++;
      metrics.requests.byEndpoint[endpoint].error++;
    } else {
      metrics.requests.success++;
      metrics.requests.byEndpoint[endpoint].success++;
    }
    
    // Call original send
    originalSend.apply(res, arguments);
  };
  
  next();
};

/**
 * Start collecting system metrics
 * @param {number} interval - Collection interval in ms (default: 60000 - 1 minute)
 */
const startSystemMetricsCollection = (interval = 60000) => {
  // Collect initial metrics
  collectSystemMetrics();
  
  // Schedule regular collection
  setInterval(collectSystemMetrics, interval);
};

/**
 * Collect system metrics
 */
const collectSystemMetrics = () => {
  try {
    const now = new Date();
    
    // Memory usage
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = (usedMemory / totalMemory) * 100;
    
    // CPU usage (average load over 1, 5, and 15 minutes)
    const cpuLoad = os.loadavg();
    
    // Update metrics
    metrics.system = {
      lastChecked: now,
      memory: {
        total: totalMemory,
        free: freeMemory,
        used: usedMemory,
        usagePercent: memoryUsagePercent
      },
      cpu: {
        load1: cpuLoad[0],
        load5: cpuLoad[1],
        load15: cpuLoad[2],
        cores: os.cpus().length
      },
      uptime: os.uptime()
    };
    
    // Log if memory usage is high (over 85%)
    if (memoryUsagePercent > 85) {
      logger.warn('High memory usage detected', { memoryUsagePercent });
    }
    
    // Log if CPU load is high (load1 > number of cores)
    if (cpuLoad[0] > os.cpus().length) {
      logger.warn('High CPU load detected', { cpuLoad });
    }
  } catch (error) {
    logger.error('Error collecting system metrics', { error: error.message });
  }
};

/**
 * Update average response time
 */
const updateAverageResponseTime = () => {
  if (metrics.response.times.length === 0) return;
  
  // Calculate average
  const sum = metrics.response.times.reduce((a, b) => a + b, 0);
  metrics.response.average = sum / metrics.response.times.length;
  
  // Limit stored times to last 1000 requests to prevent memory issues
  if (metrics.response.times.length > 1000) {
    metrics.response.times = metrics.response.times.slice(-1000);
  }
};

/**
 * Get health status
 * @returns {Object} Health status
 */
const getHealthStatus = () => {
  return {
    status: 'UP',
    timestamp: new Date(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    system: {
      loadAverage: os.loadavg(),
      freeMemory: os.freemem(),
      totalMemory: os.totalmem()
    }
  };
};

/**
 * Get metrics
 * @returns {Object} Application metrics
 */
const getMetrics = () => {
  return {
    timestamp: new Date(),
    requests: {
      total: metrics.requests.total,
      success: metrics.requests.success,
      error: metrics.requests.error,
      successRate: metrics.requests.total ? 
        (metrics.requests.success / metrics.requests.total) * 100 : 0
    },
    response: {
      average: metrics.response.average,
      count: metrics.response.times.length
    },
    system: metrics.system,
    endpoints: Object.keys(metrics.requests.byEndpoint).map(endpoint => {
      const data = metrics.requests.byEndpoint[endpoint];
      return {
        endpoint,
        requests: {
          total: data.total,
          success: data.success,
          error: data.error
        },
        averageResponseTime: data.responseTimes.length ?
          data.responseTimes.reduce((a, b) => a + b, 0) / data.responseTimes.length : 0
      };
    }),
    fileUploads: metrics.fileUploads,
    errors: metrics.errors,
    errorTypes: metrics.errorTypes
  };
};

/**
 * Reset metrics (for testing)
 */
const _resetMetrics = () => {
  metrics = {
    requests: {
      total: 0,
      success: 0,
      error: 0,
      byEndpoint: {}
    },
    response: {
      times: [],
      average: 0
    },
    system: {
      lastChecked: null,
      memory: {},
      cpu: {},
      uptime: 0
    },
    fileUploads: 0,
    errors: 0,
    errorTypes: {}
  };
};

/**
 * Track file upload
 * @param {Object} fileData - File data
 * @param {string} fileData.filename - Filename
 * @param {number} fileData.size - File size in bytes
 * @param {string} fileData.mimetype - File MIME type
 * @param {string} fileData.userId - User ID
 */
const trackFileUpload = (fileData) => {
  if (!fileData) return;
  
  // Increment file upload count
  metrics.fileUploads++;
  
  // Log file upload
  logger.info('File uploaded', {
    filename: fileData.filename,
    size: fileData.size,
    mimetype: fileData.mimetype,
    userId: fileData.userId
  });
  
  // If we were using a time-series database, we would store more detailed metrics here
};

/**
 * Track error
 * @param {Object} errorData - Error data
 * @param {string} errorData.type - Error type
 * @param {string} errorData.message - Error message
 * @param {Object} errorData.metadata - Additional error metadata
 */
const trackError = (errorData) => {
  if (!errorData || !errorData.type) return;
  
  // Increment error count
  metrics.errors++;
  
  // Track error by type
  if (!metrics.errorTypes[errorData.type]) {
    metrics.errorTypes[errorData.type] = 0;
  }
  metrics.errorTypes[errorData.type]++;
  
  // Log error
  logger.error(errorData.message || 'Error occurred', {
    errorType: errorData.type,
    ...errorData.metadata
  });
};

module.exports = {
  initializeMonitoring,
  requestMonitoringMiddleware,
  getHealthStatus,
  getMetrics,
  collectSystemMetrics,
  _resetMetrics,
  trackFileUpload,
  trackError
};
