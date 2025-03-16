/**
 * API Routes Tests - Sprint 0: Task 3
 * 
 * These tests verify that Express.js API routes are properly configured.
 */

const fs = require('fs');
const path = require('path');
const request = require('supertest');

// Use mock models directly
jest.mock('../../src/server/models', () => require('../__mocks__/models'));

// Import server after mocking models
const app = require('../../src/server');

describe('API Routes Setup', () => {
  test('Routes directory exists with required route files', () => {
    const routesDir = path.resolve(process.cwd(), 'src/server/routes');
    expect(fs.existsSync(routesDir)).toBe(true);
    expect(fs.statSync(routesDir).isDirectory()).toBe(true);
    
    // Check for essential route files
    const requiredRoutes = ['users.js', 'projects.js', 'clients.js', 'services.js', 'auth.js'];
    requiredRoutes.forEach(route => {
      const routePath = path.join(routesDir, route);
      expect(fs.existsSync(routePath)).toBe(true);
    });
  });

  test('Controllers directory exists with required controller files', () => {
    const controllersDir = path.resolve(process.cwd(), 'src/server/controllers');
    expect(fs.existsSync(controllersDir)).toBe(true);
    expect(fs.statSync(controllersDir).isDirectory()).toBe(true);
    
    // Check for essential controller files
    const requiredControllers = ['userController.js', 'projectController.js', 'clientController.js', 'serviceController.js', 'authController.js'];
    requiredControllers.forEach(controller => {
      const controllerPath = path.join(controllersDir, controller);
      expect(fs.existsSync(controllerPath)).toBe(true);
    });
  });

  test('API health endpoint returns 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });

  test('API users endpoint exists', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).not.toBe(404); // Should be 200 or 401 if auth required
  });

  test('API projects endpoint exists', async () => {
    const response = await request(app).get('/api/projects');
    expect(response.status).not.toBe(404); // Should be 200 or 401 if auth required
  });

  test('API clients endpoint exists', async () => {
    const response = await request(app).get('/api/clients');
    expect(response.status).not.toBe(404); // Should be 200 or 401 if auth required
  });

  test('API services endpoint exists', async () => {
    const response = await request(app).get('/api/services');
    expect(response.status).not.toBe(404); // Should be 200 or 401 if auth required
  });

  test('API auth endpoints exist', async () => {
    const loginResponse = await request(app).post('/api/auth/login');
    expect(loginResponse.status).not.toBe(404); // Should be 400 or 401
    
    const registerResponse = await request(app).post('/api/auth/register');
    expect(registerResponse.status).not.toBe(404); // Should be 400 or 401
  });
});
