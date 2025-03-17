/**
 * Tests for Auth Middleware
 * 
 * Tests authentication middleware including token validation and
 * role-based access control.
 */

const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const authMiddleware = require('../../middleware/auth');

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../../models', () => ({
  User: {
    findByPk: jest.fn()
  }
}));

describe('Auth Middleware', () => {
  // Setup - reset mocks before each test
  let req, res, next;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock Express request, response, and next function
    req = {
      headers: {},
      cookies: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  // Test 1: isAuthenticated middleware validates token and sets user
  test('isAuthenticated middleware validates token and sets user', async () => {
    // Mock token
    const token = 'valid-token';
    req.headers.authorization = `Bearer ${token}`;
    
    // Mock decoded token
    const decodedToken = { id: 1 };
    jwt.verify.mockReturnValue(decodedToken);
    
    // Mock user
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      role: 'user',
      active: true
    };
    User.findByPk.mockResolvedValue(mockUser);
    
    // Call middleware
    await authMiddleware.isAuthenticated(req, res, next);
    
    // Assertions
    expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
    expect(User.findByPk).toHaveBeenCalledWith(decodedToken.id);
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  // Test 2: isAuthenticated middleware returns error for missing token
  test('isAuthenticated middleware returns error for missing token', async () => {
    // Call middleware
    await authMiddleware.isAuthenticated(req, res, next);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test 3: isAuthenticated middleware returns error for invalid token
  test('isAuthenticated middleware returns error for invalid token', async () => {
    // Mock token
    const token = 'invalid-token';
    req.headers.authorization = `Bearer ${token}`;
    
    // Mock token verification error
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });
    
    // Call middleware
    await authMiddleware.isAuthenticated(req, res, next);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not valid' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test 4: isAuthenticated middleware returns error for inactive user
  test('isAuthenticated middleware returns error for inactive user', async () => {
    // Mock token
    const token = 'valid-token';
    req.headers.authorization = `Bearer ${token}`;
    
    // Mock decoded token
    const decodedToken = { id: 1 };
    jwt.verify.mockReturnValue(decodedToken);
    
    // Mock inactive user
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      role: 'user',
      active: false
    };
    User.findByPk.mockResolvedValue(mockUser);
    
    // Call middleware
    await authMiddleware.isAuthenticated(req, res, next);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'User account is inactive' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test 5: isAdmin middleware allows admin users
  test('isAdmin middleware allows admin users', async () => {
    // Mock admin user
    req.user = {
      id: 1,
      email: 'admin@example.com',
      role: 'admin'
    };
    
    // Call middleware
    authMiddleware.isAdmin(req, res, next);
    
    // Assertions
    expect(next).toHaveBeenCalled();
  });

  // Test 6: isAdmin middleware blocks non-admin users
  test('isAdmin middleware blocks non-admin users', async () => {
    // Mock regular user
    req.user = {
      id: 1,
      email: 'user@example.com',
      role: 'user'
    };
    
    // Call middleware
    authMiddleware.isAdmin(req, res, next);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: Admin role required' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test 7: isClient middleware allows client users
  test('isClient middleware allows client users', async () => {
    // Mock client user
    req.user = {
      id: 1,
      email: 'client@example.com',
      role: 'client'
    };
    
    // Call middleware
    authMiddleware.isClient(req, res, next);
    
    // Assertions
    expect(next).toHaveBeenCalled();
  });

  // Test 8: isClient middleware blocks non-client users
  test('isClient middleware blocks non-client users', async () => {
    // Mock regular user
    req.user = {
      id: 1,
      email: 'user@example.com',
      role: 'user'
    };
    
    // Call middleware
    authMiddleware.isClient(req, res, next);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: Client role required' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test 9: hasRole middleware allows users with specified role
  test('hasRole middleware allows users with specified role', async () => {
    // Mock user with specific role
    req.user = {
      id: 1,
      email: 'user@example.com',
      role: 'editor'
    };
    
    // Create middleware with specific role
    const middleware = authMiddleware.hasRole('editor');
    
    // Call middleware
    middleware(req, res, next);
    
    // Assertions
    expect(next).toHaveBeenCalled();
  });

  // Test 10: hasRole middleware blocks users without specified role
  test('hasRole middleware blocks users without specified role', async () => {
    // Mock user with different role
    req.user = {
      id: 1,
      email: 'user@example.com',
      role: 'user'
    };
    
    // Create middleware with specific role
    const middleware = authMiddleware.hasRole('editor');
    
    // Call middleware
    middleware(req, res, next);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: editor role required' });
    expect(next).not.toHaveBeenCalled();
  });

  // Test 11: hasAnyRole middleware allows users with any specified role
  test('hasAnyRole middleware allows users with any specified role', async () => {
    // Mock user with one of the specified roles
    req.user = {
      id: 1,
      email: 'user@example.com',
      role: 'editor'
    };
    
    // Create middleware with multiple roles
    const middleware = authMiddleware.hasAnyRole(['admin', 'editor', 'client']);
    
    // Call middleware
    middleware(req, res, next);
    
    // Assertions
    expect(next).toHaveBeenCalled();
  });

  // Test 12: hasAnyRole middleware blocks users without any specified role
  test('hasAnyRole middleware blocks users without any specified role', async () => {
    // Mock user with different role
    req.user = {
      id: 1,
      email: 'user@example.com',
      role: 'user'
    };
    
    // Create middleware with multiple roles
    const middleware = authMiddleware.hasAnyRole(['admin', 'editor', 'client']);
    
    // Call middleware
    middleware(req, res, next);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access denied: Required role not found' });
    expect(next).not.toHaveBeenCalled();
  });
});
