/**
 * Tests for Auth Controller
 * 
 * Tests authentication endpoints including registration, login, email verification,
 * password reset, and token management.
 */

const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const authController = require('../../controllers/authController');
const emailService = require('../../utils/emailService');

// Mock dependencies
jest.mock('../../models', () => ({
  User: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
  }
}));

jest.mock('../../utils/emailService', () => jest.fn());
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('crypto', () => ({
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue('mock-token')
  })
}));

// Create mock Express app
const express = require('express');
const app = express();
app.use(express.json());

// Register auth routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/verify-email', authController.verifyEmail);
app.post('/api/auth/resend-verification', authController.resendVerification);
app.post('/api/auth/forgot-password', authController.forgotPassword);
app.post('/api/auth/reset-password', authController.resetPassword);
app.post('/api/auth/refresh-token', authController.refreshToken);

describe('Auth Controller', () => {
  // Setup - reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Register endpoint creates a new user
  test('register endpoint creates a new user', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'user',
      emailVerified: false,
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock dependencies
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValueOnce('mock-token').mockReturnValueOnce('mock-refresh-token');
    emailService.mockResolvedValue(true);

    // Make request
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      });

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.message).toContain('User registered successfully');
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBe('mock-token');
    expect(response.body.refreshToken).toBe('mock-refresh-token');
    
    // Check if user was created
    expect(User.create).toHaveBeenCalledWith({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      emailVerificationToken: 'mock-token',
      emailVerificationExpires: expect.any(Date)
    });
    
    // Check if email was sent
    expect(emailService).toHaveBeenCalled();
  });

  // Test 2: Register endpoint returns error if user already exists
  test('register endpoint returns error if user already exists', async () => {
    // Mock existing user
    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

    // Make request
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
    expect(User.create).not.toHaveBeenCalled();
  });

  // Test 3: Login endpoint authenticates user and returns tokens
  test('login endpoint authenticates user and returns tokens', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'user',
      active: true,
      emailVerified: true,
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock dependencies
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValueOnce('mock-token').mockReturnValueOnce('mock-refresh-token');

    // Make request
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBe('mock-token');
    expect(response.body.refreshToken).toBe('mock-refresh-token');
    
    // Check if user was updated
    expect(mockUser.save).toHaveBeenCalled();
  });

  // Test 4: Login endpoint returns error for invalid credentials
  test('login endpoint returns error for invalid credentials', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword'
    };

    // Mock dependencies
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    // Make request
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  // Test 5: Verify email endpoint verifies user email
  test('verify email endpoint verifies user email', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      emailVerificationToken: 'valid-token',
      emailVerificationExpires: new Date(Date.now() + 3600000),
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock dependencies
    User.findOne.mockResolvedValue(mockUser);

    // Make request
    const response = await request(app)
      .post('/api/auth/verify-email')
      .send({
        token: 'valid-token'
      });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Email verified successfully');
    
    // Check if user was updated
    expect(mockUser.emailVerified).toBe(true);
    expect(mockUser.emailVerificationToken).toBeNull();
    expect(mockUser.emailVerificationExpires).toBeNull();
    expect(mockUser.save).toHaveBeenCalled();
  });

  // Test 6: Verify email endpoint returns error for invalid token
  test('verify email endpoint returns error for invalid token', async () => {
    // Mock dependencies
    User.findOne.mockResolvedValue(null);

    // Make request
    const response = await request(app)
      .post('/api/auth/verify-email')
      .send({
        token: 'invalid-token'
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid or expired token');
  });

  // Test 7: Resend verification endpoint sends new verification email
  test('resend verification endpoint sends new verification email', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      firstName: 'Test',
      email: 'test@example.com',
      emailVerified: false,
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock dependencies
    User.findOne.mockResolvedValue(mockUser);
    emailService.mockResolvedValue(true);

    // Make request
    const response = await request(app)
      .post('/api/auth/resend-verification')
      .send({
        email: 'test@example.com'
      });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Verification email sent successfully');
    
    // Check if user was updated
    expect(mockUser.emailVerificationToken).toBe('mock-token');
    expect(mockUser.emailVerificationExpires).toBeDefined();
    expect(mockUser.save).toHaveBeenCalled();
    
    // Check if email was sent
    expect(emailService).toHaveBeenCalled();
  });

  // Test 8: Forgot password endpoint sends reset email
  test('forgot password endpoint sends reset email', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      firstName: 'Test',
      email: 'test@example.com',
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock dependencies
    User.findOne.mockResolvedValue(mockUser);
    emailService.mockResolvedValue(true);

    // Make request
    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: 'test@example.com'
      });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('If an account with that email exists');
    
    // Check if user was updated
    expect(mockUser.resetPasswordToken).toBe('mock-token');
    expect(mockUser.resetPasswordExpires).toBeDefined();
    expect(mockUser.save).toHaveBeenCalled();
    
    // Check if email was sent
    expect(emailService).toHaveBeenCalled();
  });

  // Test 9: Reset password endpoint updates user password
  test('reset password endpoint updates user password', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      firstName: 'Test',
      email: 'test@example.com',
      resetPasswordToken: 'valid-token',
      resetPasswordExpires: new Date(Date.now() + 3600000),
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock dependencies
    User.findOne.mockResolvedValue(mockUser);
    emailService.mockResolvedValue(true);

    // Make request
    const response = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: 'valid-token',
        password: 'newpassword123'
      });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password reset successful');
    
    // Check if user was updated
    expect(mockUser.password).toBe('newpassword123');
    expect(mockUser.resetPasswordToken).toBeNull();
    expect(mockUser.resetPasswordExpires).toBeNull();
    expect(mockUser.save).toHaveBeenCalled();
    
    // Check if email was sent
    expect(emailService).toHaveBeenCalled();
  });

  // Test 10: Refresh token endpoint issues new tokens
  test('refresh token endpoint issues new tokens', async () => {
    // Mock user data
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      refreshToken: 'valid-refresh-token',
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock dependencies
    jwt.verify.mockReturnValue({ id: 1 });
    User.findByPk.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValueOnce('new-token').mockReturnValueOnce('new-refresh-token');

    // Make request
    const response = await request(app)
      .post('/api/auth/refresh-token')
      .send({
        refreshToken: 'valid-refresh-token'
      });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.token).toBe('new-token');
    expect(response.body.refreshToken).toBe('new-refresh-token');
    
    // Check if user was updated
    expect(mockUser.refreshToken).toBe('new-refresh-token');
    expect(mockUser.save).toHaveBeenCalled();
  });
});
