/**
 * Mock Database Configuration for Testing
 * 
 * This file provides a mock implementation of the database configuration
 * to allow tests to run without a real database connection.
 */

const { Sequelize } = require('sequelize');

// Create a mock sequelize instance
const sequelize = {
  define: jest.fn().mockImplementation((modelName, attributes, options) => {
    return {
      name: modelName,
      attributes,
      options,
      associate: jest.fn(),
      sync: jest.fn().mockResolvedValue({}),
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({}),
      findByPk: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue([1]),
      destroy: jest.fn().mockResolvedValue(1),
      hasMany: jest.fn().mockReturnValue({}),
      belongsTo: jest.fn().mockReturnValue({}),
      belongsToMany: jest.fn().mockReturnValue({})
    };
  }),
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

// Export the mock sequelize instance
module.exports = { sequelize, Sequelize };
