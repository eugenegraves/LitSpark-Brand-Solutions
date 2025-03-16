/**
 * Mock Database Configuration for Testing
 * 
 * This file provides mock implementations of database functionality
 * to allow tests to run without connecting to a real database.
 */

const sequelize = {
  authenticate: jest.fn().mockResolvedValue(),
  sync: jest.fn().mockResolvedValue(),
  define: jest.fn().mockReturnValue({
    init: jest.fn(),
    associate: jest.fn(),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    findByPk: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue([1]),
    destroy: jest.fn().mockResolvedValue(1)
  })
};

const testConnection = jest.fn().mockImplementation(() => {
  console.log('Mock database connection established');
  return Promise.resolve();
});

module.exports = {
  sequelize,
  testConnection
};
