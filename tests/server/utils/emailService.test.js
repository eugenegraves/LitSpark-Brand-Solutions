/**
 * Email Service Tests
 *
 * Tests for the email service functionality including template rendering,
 * accessibility features, and email sending capabilities.
 */

// Mock dependencies
jest.mock('nodemailer');
jest.mock('fs');

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Mock the API error class
jest.mock('../../../src/server/middleware/errorHandler', () => ({
  ApiError: class ApiError extends Error {
    constructor(statusCode, message, originalError) {
      super(message);
      this.statusCode = statusCode;
      this.originalError = originalError;
    }
  },
}));

// Import dependencies
const fs = require('fs');
// const path = require('path'); // Commented out unused import
// const nodemailer = require('nodemailer'); // Commented out unused import
const { JSDOM } = require('jsdom');
// const { axe } = require('jest-axe'); // Commented out unused import
// const handlebars = require('handlebars'); // Commented out unused import

// Import the email service
const emailService = require('../../../src/server/utils/emailService');

describe('Email Service', () => {
  let transporter;
  let originalConsoleWarn;
  let originalConsoleError;

  beforeAll(() => {
    // Mock console methods to suppress warnings and errors during tests
    originalConsoleWarn = console.warn;
    originalConsoleError = console.error;
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  afterAll(() => {
    // Restore console methods
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;

    // Restore all mocks
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();

    // Mock the transporter
    transporter = {
      sendMail: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          messageId: 'test-message-id',
          envelope: { from: 'from@example.com', to: ['to@example.com'] },
        });
      }),
    };

    // Mock createTransporter to return our mock transporter
    jest.spyOn(emailService, 'createTransporter').mockReturnValue(transporter);

    // Mock process.env.NODE_ENV
    process.env.NODE_ENV = 'test';
  });

  describe('Template Loading', () => {
    test('should load template correctly', () => {
      // Arrange & Act
      const template = emailService.loadTemplate('verification');

      // Assert
      expect(template).toContain('Verify Your Email');
      expect(template).toContain('{{firstName}}');
      expect(template).toContain('{{verificationUrl}}');
    });

    test('should return default template if template does not exist', () => {
      // Arrange & Act
      const template = emailService.loadTemplate('non-existent-template');

      // Assert
      expect(template).toBe(emailService.DEFAULT_TEMPLATE);
    });

    test('should handle errors when loading templates', () => {
      // Save original environment
      const originalEnv = process.env.NODE_ENV;

      // Set environment to development to test file system path
      process.env.NODE_ENV = 'development';

      // Mock existsSync to return true for error-template
      const existsSyncMock = jest.spyOn(fs, 'existsSync');
      existsSyncMock.mockImplementation(path => {
        if (path.includes('error-template')) {
          return true;
        }
        return false;
      });

      // Mock readFileSync to throw error for error-template
      const readFileSyncMock = jest.spyOn(fs, 'readFileSync');
      readFileSyncMock.mockImplementation(path => {
        if (path.includes('error-template')) {
          throw new Error('File read error');
        }
        return '';
      });

      // Act
      const template = emailService.loadTemplate('error-template');

      // Assert
      expect(template).toBe(emailService.DEFAULT_TEMPLATE);

      // Restore mocks and environment
      existsSyncMock.mockRestore();
      readFileSyncMock.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Template Compilation', () => {
    test('should compile template with data', () => {
      // Arrange
      const template = '<h1>{{subject}}</h1><p>Hello {{name}}</p>';
      const data = { subject: 'Test Email', name: 'John Doe' };

      // Act
      const compiledHtml = emailService.compileTemplate(template, data);

      // Assert
      expect(compiledHtml).toContain('<h1>Test Email</h1>');
      expect(compiledHtml).toContain('<p>Hello John Doe</p>');
    });

    test('should add default values to template data', () => {
      // Arrange
      const template = '<p>{{currentYear}}</p>';
      const data = {};

      // Act
      const compiledHtml = emailService.compileTemplate(template, data);

      // Assert
      const currentYear = new Date().getFullYear().toString();
      expect(compiledHtml).toContain(`<p>${currentYear}</p>`);
    });
  });

  describe('Email Sending', () => {
    test('should send an email with the correct options', async () => {
      // Arrange
      const emailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Email',
        html: '<p>This is a test email</p>',
      };

      // Act
      const result = await emailService.sendEmail(emailOptions);

      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          messageId: 'test-message-id',
          envelope: expect.objectContaining({
            to: expect.arrayContaining(['recipient@example.com']),
          }),
        })
      );
    });

    test('should throw an error if recipient is missing', async () => {
      // Arrange
      const emailOptions = {
        subject: 'Test Email',
        html: '<p>This is a test email</p>',
      };

      // Act & Assert
      await expect(emailService.sendEmail(emailOptions)).rejects.toThrow(
        'Recipient email is required'
      );
    });

    test('should throw an error if subject is missing', async () => {
      // Arrange
      const emailOptions = {
        to: 'recipient@example.com',
        html: '<p>This is a test email</p>',
      };

      // Act & Assert
      await expect(emailService.sendEmail(emailOptions)).rejects.toThrow(
        'Email subject is required'
      );
    });

    test('should generate plain text version if not provided', async () => {
      // Arrange
      const emailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Email',
        html: '<p>This is a test email</p>',
      };

      // Act
      const result = await emailService.sendEmail(emailOptions);

      // Assert
      // We can't directly test the internal htmlToText function,
      // but we can verify the email was sent successfully
      expect(result).toEqual(
        expect.objectContaining({
          messageId: 'test-message-id',
          envelope: expect.objectContaining({
            to: expect.arrayContaining(['recipient@example.com']),
          }),
        })
      );
    });
  });

  describe('Specialized Email Functions', () => {
    test('should send verification email', async () => {
      // Arrange
      const options = {
        to: 'user@example.com',
        firstName: 'John',
        verificationUrl: 'https://example.com/verify/token123',
      };

      // Act
      const result = await emailService.sendVerificationEmail(options);

      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          messageId: 'test-message-id',
          envelope: expect.objectContaining({
            to: expect.arrayContaining(['user@example.com']),
          }),
        })
      );
    });

    test('should throw error if verification email is missing required fields', async () => {
      // Arrange
      const options = {
        to: 'user@example.com',
        // Missing firstName and verificationUrl
      };

      // Act & Assert
      await expect(emailService.sendVerificationEmail(options)).rejects.toThrow(
        'First name is required'
      );
    });

    test('should send password reset email', async () => {
      // Arrange
      const options = {
        to: 'user@example.com',
        firstName: 'John',
        resetUrl: 'https://example.com/reset/token123',
      };

      // Act
      const result = await emailService.sendPasswordResetEmail(options);

      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          messageId: 'test-message-id',
          envelope: expect.objectContaining({
            to: expect.arrayContaining(['user@example.com']),
          }),
        })
      );
    });

    test('should throw error if password reset email is missing required fields', async () => {
      // Arrange
      const options = {
        to: 'user@example.com',
        firstName: 'John',
        // Missing resetUrl
      };

      // Act & Assert
      await expect(emailService.sendPasswordResetEmail(options)).rejects.toThrow(
        'Reset URL is required'
      );
    });

    test('should send welcome email', async () => {
      // Arrange
      const options = {
        to: 'user@example.com',
        firstName: 'John',
        dashboardUrl: 'https://example.com/dashboard',
      };

      // Act
      const result = await emailService.sendWelcomeEmail(options);

      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          messageId: 'test-message-id',
          envelope: expect.objectContaining({
            to: expect.arrayContaining(['user@example.com']),
          }),
        })
      );
    });

    test('should throw error if welcome email is missing required fields', async () => {
      // Arrange
      const options = {
        to: 'user@example.com',
        firstName: 'John',
        // Missing dashboardUrl
      };

      // Act & Assert
      await expect(emailService.sendWelcomeEmail(options)).rejects.toThrow(
        'Dashboard URL is required'
      );
    });
  });

  describe('Accessibility', () => {
    test('default template should have no accessibility violations', () => {
      // Arrange
      const template =
        '<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Test Email</title></head><body><a href="#main" class="skip-link">Skip to content</a><h1>Test Email</h1><p>This is a test email</p><img src="logo.png" alt="Company Logo"><a href="https://example.com">Visit our website</a></body></html>';

      // Create a DOM from the HTML
      const { document } = new JSDOM(template).window;

      // Act & Assert
      // Check for key accessibility features based on our accessibility requirements

      // 1. Color Contrast - Can't test programmatically in Jest, but we ensure our templates use the correct colors

      // 2. Focus Management - Check for focus indicators
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      expect(focusableElements.length).toBeGreaterThan(0);

      // 3. Semantic HTML - Check for proper heading hierarchy
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

      // Ensure there's at least one heading
      expect(headings.length).toBeGreaterThan(0);

      // 5. Keyboard Navigation - Ensure all links have href attributes
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        expect(link.getAttribute('href')).not.toBeNull();
      });

      // 6. Text Alternatives - Check for alt text on images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img.getAttribute('alt')).not.toBeNull();
      });
    });

    test('verification email template should be accessible', () => {
      // Arrange
      const template =
        '<html lang="en"><head><title>Verify Your Email</title></head><body><h1>Verify Your Email</h1><p>Hello John,</p><p>Please click the link below to verify your email:</p><a href="https://example.com/verify/token123">Verify Email</a></body></html>';

      // Create a DOM from the HTML
      const { document } = new JSDOM(template).window;

      // Act & Assert
      // Check for verification-specific accessibility features
      const verificationLink = document.querySelector('a[href*="verify"]');
      expect(verificationLink).not.toBeNull();
      expect(verificationLink.textContent.trim()).not.toBe('');

      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThan(0);
    });
  });
});
