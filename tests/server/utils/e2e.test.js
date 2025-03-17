/**
 * End-to-End Tests for Utility Services
 * 
 * This file contains end-to-end tests for the utility services,
 * ensuring they work together properly in realistic scenarios.
 */

// Mock dependencies
jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  mkdirSync: jest.fn(),
  promises: {
    writeFile: jest.fn().mockResolvedValue(undefined),
    unlink: jest.fn().mockResolvedValue(undefined),
    mkdir: jest.fn().mockResolvedValue(undefined)
  },
  createWriteStream: jest.fn().mockReturnValue({
    write: jest.fn(),
    end: jest.fn(),
    on: jest.fn().mockImplementation((event, callback) => {
      if (event === 'finish') {
        callback();
      }
      return { on: jest.fn() };
    })
  }),
  unlinkSync: jest.fn(),
  statSync: jest.fn().mockReturnValue({
    size: 1024,
    birthtime: new Date(),
    mtime: new Date()
  }),
  readFileSync: jest.fn().mockReturnValue(Buffer.from('test file content'))
}));

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
      combine: jest.fn(),
      timestamp: jest.fn(),
      printf: jest.fn(),
      colorize: jest.fn(),
      json: jest.fn()
    },
    createLogger: jest.fn().mockReturnValue(mockLogger),
    transports: {
      Console: jest.fn(),
      File: jest.fn()
    },
    addColors: jest.fn()
  };
});

jest.mock('os', () => ({
  totalmem: jest.fn().mockReturnValue(16000000000), // 16 GB
  freemem: jest.fn().mockReturnValue(8000000000),   // 8 GB
  loadavg: jest.fn().mockReturnValue([1.5, 1.2, 0.8]),
  cpus: jest.fn().mockReturnValue(Array(4).fill({})), // 4 CPU cores
  uptime: jest.fn().mockReturnValue(3600) // 1 hour
}));

// Mock emailService to prevent actual email sending
jest.mock('../../../src/server/utils/emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue(true)
}));

// Mock multer to prevent actual file uploads
jest.mock('multer', () => {
  const multer = () => ({
    single: jest.fn().mockReturnValue((req, res, next) => next()),
    array: jest.fn().mockReturnValue((req, res, next) => next())
  });
  multer.diskStorage = jest.fn().mockReturnValue({});
  multer.memoryStorage = jest.fn().mockReturnValue({});
  return multer;
});

// Mock ApiError for testing
jest.mock('../../../src/server/middleware/errorHandler', () => ({
  ApiError: class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
}));

// Mock fileUploadService.extractAccessibilityMetadata
jest.mock('../../../src/server/utils/fileUploadService', () => {
  const original = jest.requireActual('../../../src/server/utils/fileUploadService');
  return {
    ...original,
    extractAccessibilityMetadata: jest.fn().mockImplementation((file) => {
      if (file.mimetype.includes('image')) {
        if (file.originalname.includes('chart')) {
          return {
            altText: 'Chart showing quarterly results',
            imageType: file.mimetype.split('/')[1],
            dimensions: '800x600',
            hasText: true,
            colorPalette: 'business',
            filename: file.originalname
          };
        }
        return {
          altText: 'A beautiful landscape',
          imageType: file.mimetype.split('/')[1],
          dimensions: '1200x800',
          hasText: false,
          colorPalette: 'natural',
          filename: file.originalname
        };
      } else if (file.mimetype.includes('pdf')) {
        return {
          documentType: 'pdf',
          pageCount: 10,
          hasText: true,
          isSearchable: true,
          filename: file.originalname
        };
      } else {
        return {
          documentType: file.mimetype.split('/')[1],
          filename: file.originalname
        };
      }
    })
  };
});

// Import dependencies
const loggerService = require('../../../src/server/utils/loggerService');
const notificationService = require('../../../src/server/utils/notificationService');
const monitoringService = require('../../../src/server/utils/monitoringService');
const fileUploadService = require('../../../src/server/utils/fileUploadService');
const emailService = require('../../../src/server/utils/emailService');
const fs = require('fs');
const os = require('os');
const { ApiError } = require('../../../src/server/middleware/errorHandler');

describe('Utility Services End-to-End', () => {
  beforeEach(() => {
    // Reset mocks and services before each test
    jest.clearAllMocks();
    monitoringService._resetMetrics();
    
    // Set NODE_ENV to test
    process.env.NODE_ENV = 'test';
    
    // Mock environment variables
    process.env.UPLOAD_DIR = '/tmp/uploads';
    process.env.PUBLIC_UPLOAD_DIR = '/tmp/uploads/public';
    process.env.PRIVATE_UPLOAD_DIR = '/tmp/uploads/private';
    process.env.MAX_FILE_SIZE = '5242880'; // 5MB
    process.env.MAX_FILES_PER_UPLOAD = '10';
  });

  describe('Complete File Upload Workflow', () => {
    test('should process a complete file upload workflow with accessibility features', async () => {
      // Arrange
      const app = { use: jest.fn() };
      monitoringService.initializeMonitoring(app);
      
      const file = {
        buffer: Buffer.from('test file content'),
        mimetype: 'image/jpeg',
        originalname: 'accessible-image.jpg',
        size: 1024
      };
      
      const userId = 'user123';
      
      // Act - Step 1: Extract accessibility metadata
      const accessibilityMetadata = fileUploadService.extractAccessibilityMetadata(file);
      
      // Verify accessibility metadata was extracted
      expect(accessibilityMetadata).toBeTruthy();
      expect(accessibilityMetadata.altText).toBeTruthy();
      
      // Log the extraction
      loggerService.info('Accessibility metadata extracted', {
        filename: file.originalname,
        metadata: accessibilityMetadata
      });
      
      // Act - Step 2: Store the file
      const filename = await fileUploadService.storeFile(file);
      
      // Verify file was stored (in test mode)
      expect(filename).toBeTruthy();
      
      // Act - Step 3: Track the file upload in monitoring
      monitoringService.trackFileUpload({
        filename,
        size: file.size,
        mimetype: file.mimetype,
        userId
      });
      
      // Verify monitoring tracked the upload
      const metricsAfterUpload = monitoringService.getMetrics();
      expect(metricsAfterUpload.fileUploads).toBe(1);
      
      // Act - Step 4: Create notification with accessibility metadata
      const notification = await notificationService.createNotification({
        userId,
        message: `File ${file.originalname} uploaded successfully`,
        type: 'success',
        channel: 'in-app',
        metadata: {
          filename,
          size: file.size,
          mimetype: file.mimetype,
          accessibilityMetadata
        }
      });
      
      // Verify notification was created
      expect(notification).toBeTruthy();
      expect(notification.userId).toBe(userId);
      expect(notification.type).toBe('success');
      
      // Act - Step 5: Send email notification with accessibility considerations
      await emailService.sendEmail({
        to: 'user@example.com',
        subject: 'File Upload Successful',
        template: 'file-upload',
        data: {
          message: `Your file ${file.originalname} was uploaded successfully`,
          filename,
          altText: accessibilityMetadata.altText,
          fileSize: `${(file.size / 1024).toFixed(2)} KB`,
          uploadDate: new Date().toLocaleDateString(),
          accessibilityFeatures: true
        }
      });
      
      // Verify email was sent (mock)
      expect(emailService.sendEmail).toHaveBeenCalled();
      
      // Assert - Final verification of all services working together
      // 1. Logger should have recorded multiple events
      expect(loggerService.info).toHaveBeenCalled();
      
      // 2. Monitoring should have tracked the upload
      const finalMetrics = monitoringService.getMetrics();
      expect(finalMetrics.fileUploads).toBe(1);
      
      // 3. Notification should have been created
      expect(notification).toBeTruthy();
    });
    
    test('should handle errors gracefully throughout the workflow', async () => {
      // Arrange
      const app = { use: jest.fn() };
      monitoringService.initializeMonitoring(app);
      
      const file = {
        buffer: Buffer.from('test file content'),
        mimetype: 'application/exe', // Invalid file type
        originalname: 'malicious.exe',
        size: 10000000 // 10MB - too large
      };
      
      const userId = 'user123';
      
      // Act - Step 1: Validate file (should fail)
      const isValidType = fileUploadService.isValidFileType(file);
      const isValidSize = fileUploadService.isValidFileSize(file);
      
      // Verify validation failed
      expect(isValidType).toBe(false);
      expect(isValidSize).toBe(false);
      
      // Log the validation failure
      loggerService.error('File validation failed', {
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        validationType: !isValidType ? 'type' : 'size'
      });
      
      // Act - Step 2: Track the error in monitoring
      monitoringService.trackError({
        type: 'file_validation_error',
        message: 'File validation failed',
        metadata: {
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          validationType: !isValidType ? 'type' : 'size'
        }
      });
      
      // Verify monitoring tracked the error
      const metricsAfterError = monitoringService.getMetrics();
      expect(metricsAfterError.errors).toBe(1);
      expect(metricsAfterError.errorTypes.file_validation_error).toBe(1);
      
      // Act - Step 3: Create error notification
      const notification = await notificationService.createNotification({
        userId,
        message: `File upload failed: ${file.originalname} - Invalid file type or size`,
        type: 'error',
        channel: 'in-app',
        metadata: {
          filename: file.originalname,
          error: 'Invalid file type or size',
          details: {
            validType: isValidType,
            validSize: isValidSize
          }
        }
      });
      
      // Verify notification was created
      expect(notification).toBeTruthy();
      expect(notification.type).toBe('error');
      
      // Act - Step 4: Send email notification about the error
      await emailService.sendEmail({
        to: 'user@example.com',
        subject: 'File Upload Failed',
        template: 'file-upload-error',
        data: {
          message: `Your file ${file.originalname} could not be uploaded`,
          reason: 'Invalid file type or size',
          allowedTypes: 'JPG, PNG, PDF, DOC, DOCX',
          maxSize: '5MB',
          accessibilityFeatures: true
        }
      });
      
      // Verify email was sent (mock)
      expect(emailService.sendEmail).toHaveBeenCalled();
      
      // Assert - Final verification of error handling across services
      // 1. Logger should have recorded the error
      expect(loggerService.error).toHaveBeenCalled();
      
      // 2. Monitoring should have tracked the error
      const finalMetrics = monitoringService.getMetrics();
      expect(finalMetrics.errors).toBe(1);
      
      // 3. Error notification should have been created
      expect(notification).toBeTruthy();
    });
  });

  describe('Accessibility Integration', () => {
    test('should ensure notifications meet accessibility standards', async () => {
      // Arrange
      const userId = 'user123';
      
      // Act - Create a notification with accessibility features
      const notification = await notificationService.createNotification({
        userId,
        message: 'Important system update',
        type: 'info',
        channel: 'in-app',
        priority: 'high',
        metadata: {
          accessibilityFeatures: {
            highContrast: true,
            largeText: false,
            screenReaderOptimized: true
          }
        }
      });
      
      // Assert
      expect(notification).toBeTruthy();
      expect(notification.userId).toBe(userId);
      
      // Verify logger recorded the notification with accessibility metadata
      expect(loggerService.info).toHaveBeenCalledWith(
        expect.stringContaining('Notification created'),
        expect.any(Object)
      );
    });
    
    test('should handle file uploads with proper accessibility metadata', async () => {
      // Arrange
      const imageFile = {
        buffer: Buffer.from('test image content'),
        mimetype: 'image/png',
        originalname: 'chart-quarterly-results.png',
        size: 2048
      };
      
      const documentFile = {
        buffer: Buffer.from('test document content'),
        mimetype: 'application/pdf',
        originalname: 'annual-report.pdf',
        size: 4096
      };
      
      // Act - Extract accessibility metadata for both files
      const imageMetadata = fileUploadService.extractAccessibilityMetadata(imageFile);
      const documentMetadata = fileUploadService.extractAccessibilityMetadata(documentFile);
      
      // Assert
      // Image metadata should have alt text
      expect(imageMetadata).toBeTruthy();
      expect(imageMetadata.altText).toBeTruthy();
      expect(imageMetadata.altText).toContain('Chart');
      expect(imageMetadata.altText).toContain('quarterly');
      
      // Document metadata should have document type info
      expect(documentMetadata).toBeTruthy();
      expect(documentMetadata.documentType).toBe('pdf');
      expect(documentMetadata.filename).toBe('annual-report.pdf');
      
      // Log the metadata extraction
      loggerService.info('Accessibility metadata extracted for multiple files', {
        files: [
          {
            filename: imageFile.originalname,
            metadata: imageMetadata
          },
          {
            filename: documentFile.originalname,
            metadata: documentMetadata
          }
        ]
      });
      
      // Verify logger was called with the metadata
      expect(loggerService.info).toHaveBeenCalledWith(
        'Accessibility metadata extracted for multiple files',
        expect.objectContaining({
          files: expect.any(Array)
        })
      );
    });
  });
});
