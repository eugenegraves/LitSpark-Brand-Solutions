/**
 * Mock Models for Testing
 * 
 * This file provides mock implementations for database models
 * to allow tests to run without a real database connection.
 */

// Create mock models with all necessary methods
const mockUserModel = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@litspark.com',
    role: 'admin',
    active: true,
    validatePassword: jest.fn().mockResolvedValue(true)
  }),
  findByPk: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@litspark.com',
    role: 'admin',
    active: true,
    validatePassword: jest.fn().mockResolvedValue(true)
  }),
  create: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@litspark.com',
    role: 'admin',
    active: true
  }),
  update: jest.fn().mockResolvedValue([1]),
  destroy: jest.fn().mockResolvedValue(1),
  hasMany: jest.fn().mockReturnThis(),
  belongsTo: jest.fn().mockReturnThis(),
  belongsToMany: jest.fn().mockReturnThis()
};

// Create mock Client model
const mockClientModel = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Client',
    contactName: 'John Doe',
    email: 'client@example.com',
    phone: '123-456-7890'
  }),
  findByPk: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Client',
    contactName: 'John Doe',
    email: 'client@example.com',
    phone: '123-456-7890'
  }),
  create: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Client',
    contactName: 'John Doe',
    email: 'client@example.com',
    phone: '123-456-7890'
  }),
  update: jest.fn().mockResolvedValue([1]),
  destroy: jest.fn().mockResolvedValue(1),
  hasMany: jest.fn().mockReturnThis(),
  belongsTo: jest.fn().mockReturnThis(),
  belongsToMany: jest.fn().mockReturnThis()
};

// Create mock Project model
const mockProjectModel = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Project',
    description: 'Test project description',
    status: 'in_progress',
    startDate: new Date(),
    endDate: new Date()
  }),
  findByPk: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Project',
    description: 'Test project description',
    status: 'in_progress',
    startDate: new Date(),
    endDate: new Date()
  }),
  create: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Project',
    description: 'Test project description',
    status: 'in_progress',
    startDate: new Date(),
    endDate: new Date()
  }),
  update: jest.fn().mockResolvedValue([1]),
  destroy: jest.fn().mockResolvedValue(1),
  hasMany: jest.fn().mockReturnThis(),
  belongsTo: jest.fn().mockReturnThis(),
  belongsToMany: jest.fn().mockReturnThis()
};

// Create mock Service model
const mockServiceModel = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Service',
    category: 'branding',
    description: 'Test service description',
    price: 100.00
  }),
  findByPk: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Service',
    category: 'branding',
    description: 'Test service description',
    price: 100.00
  }),
  create: jest.fn().mockResolvedValue({
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Test Service',
    category: 'branding',
    description: 'Test service description',
    price: 100.00
  }),
  update: jest.fn().mockResolvedValue([1]),
  destroy: jest.fn().mockResolvedValue(1),
  hasMany: jest.fn().mockReturnThis(),
  belongsTo: jest.fn().mockReturnThis(),
  belongsToMany: jest.fn().mockReturnThis()
};

// Mock sequelize instance
const mockSequelize = {
  authenticate: jest.fn().mockResolvedValue({}),
  sync: jest.fn().mockResolvedValue({}),
  transaction: jest.fn().mockImplementation((callback) => {
    if (callback) {
      return callback({ commit: jest.fn(), rollback: jest.fn() });
    }
    return {
      commit: jest.fn(),
      rollback: jest.fn()
    };
  })
};

// Create the db object with models and sequelize instance
const db = {
  User: mockUserModel,
  Client: mockClientModel,
  Project: mockProjectModel,
  Service: mockServiceModel,
  sequelize: mockSequelize,
  Sequelize: require('sequelize')
};

// Set up model relationships
db.User.hasMany(db.Project, { foreignKey: 'userId' });
db.Project.belongsTo(db.User, { foreignKey: 'userId' });

db.Client.hasMany(db.Project, { foreignKey: 'clientId' });
db.Project.belongsTo(db.Client, { foreignKey: 'clientId' });

db.Project.belongsToMany(db.Service, { through: 'ProjectServices', foreignKey: 'projectId' });
db.Service.belongsToMany(db.Project, { through: 'ProjectServices', foreignKey: 'serviceId' });

module.exports = db;
