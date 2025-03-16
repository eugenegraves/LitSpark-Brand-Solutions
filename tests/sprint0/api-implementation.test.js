/**
 * API Implementation Tests - Sprint 0: Task 3
 * 
 * These tests verify that the API routes and controllers are properly implemented.
 */

// Mock modules before importing anything else
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
  genSalt: jest.fn().mockResolvedValue('salt'),
  hashSync: jest.fn().mockReturnValue('hashed_password'),
  compareSync: jest.fn().mockReturnValue(true)
}));

// Mock the database models
jest.mock('../../src/server/models', () => require('../__mocks__/models'));

// Mock the database configuration
jest.mock('../../src/server/config/database', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(),
    sync: jest.fn().mockResolvedValue()
  },
  testConnection: jest.fn().mockImplementation(() => {
    console.log('Mock database connection established');
    return Promise.resolve();
  })
}));

// Now import other modules
const request = require('supertest');
const app = require('../../src/server');
const jwt = require('jsonwebtoken');

// Mock user for authentication
const mockUser = {
  id: '12345678-1234-1234-1234-123456789012',
  email: 'test@litspark.com',
  role: 'admin'
};

// Generate a test token
const generateTestToken = () => {
  return jwt.sign(
    { id: mockUser.id, email: mockUser.email, role: mockUser.role },
    process.env.JWT_SECRET || 'litspark-secret-key',
    { expiresIn: '1h' }
  );
};

describe('API Implementation', () => {
  // Test authentication endpoints
  describe('Authentication API', () => {
    test('Health check endpoint returns 200', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });

    test('Login endpoint exists', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123'
      });
      
      // Should not be 404 (route not found)
      expect(response.status).not.toBe(404);
    });

    test('Register endpoint exists', async () => {
      const response = await request(app).post('/api/auth/register').send({
        firstName: 'Test',
        lastName: 'User',
        email: 'newuser@example.com',
        password: 'password123'
      });
      
      // Should not be 404 (route not found)
      expect(response.status).not.toBe(404);
    });
  });

  // Test user endpoints
  describe('Users API', () => {
    test('Get users endpoint requires authentication', async () => {
      const response = await request(app).get('/api/users');
      
      // Should be 401 (unauthorized) without token
      expect(response.status).toBe(401);
    });

    test('Get users endpoint works with authentication', async () => {
      const token = generateTestToken();
      
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);
      
      // Should not be 401 or 404 with token
      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(404);
    });
  });

  // Test project endpoints
  describe('Projects API', () => {
    test('Get projects endpoint requires authentication', async () => {
      const response = await request(app).get('/api/projects');
      
      // Should be 401 (unauthorized) without token
      expect(response.status).toBe(401);
    });

    test('Get projects endpoint works with authentication', async () => {
      const token = generateTestToken();
      
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);
      
      // Should not be 401 or 404 with token
      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(404);
    });
  });

  // Test client endpoints
  describe('Clients API', () => {
    test('Get clients endpoint requires authentication', async () => {
      const response = await request(app).get('/api/clients');
      
      // Should be 401 (unauthorized) without token
      expect(response.status).toBe(401);
    });

    test('Get clients endpoint works with authentication', async () => {
      const token = generateTestToken();
      
      const response = await request(app)
        .get('/api/clients')
        .set('Authorization', `Bearer ${token}`);
      
      // Should not be 401 or 404 with token
      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(404);
    });
  });

  // Test service endpoints
  describe('Services API', () => {
    test('Get services endpoint is publicly accessible', async () => {
      const response = await request(app).get('/api/services');
      
      // Should not be 401 (unauthorized) or 404 (not found)
      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(404);
    });

    test('Create service endpoint requires admin authentication', async () => {
      const response = await request(app).post('/api/services').send({
        name: 'Test Service',
        category: 'branding',
        description: 'Test service description'
      });
      
      // Should be 401 (unauthorized) without token
      expect(response.status).toBe(401);
    });
  });
});
