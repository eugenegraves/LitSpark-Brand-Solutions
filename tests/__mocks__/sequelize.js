/**
 * Mock Sequelize for Testing
 * 
 * This file provides mock implementations of Sequelize functionality
 * to allow tests to run without connecting to a real database.
 */

const SequelizeMock = jest.createMockFromModule('sequelize');

// Mock Model class
class Model {
  static init() {
    return this;
  }
  
  static associate() {}
  
  static findAll() {
    return Promise.resolve([]);
  }
  
  static findByPk() {
    return Promise.resolve({});
  }
  
  static create() {
    return Promise.resolve({});
  }
  
  static findOne() {
    return Promise.resolve({});
  }
  
  static destroy() {
    return Promise.resolve(1);
  }
  
  static count() {
    return Promise.resolve(0);
  }
  
  save() {
    return Promise.resolve(this);
  }
  
  destroy() {
    return Promise.resolve(1);
  }
  
  getProjects() {
    return Promise.resolve([]);
  }
  
  setServices() {
    return Promise.resolve();
  }
}

// Mock Sequelize instance
class MockSequelize {
  constructor() {
    this.models = {};
  }
  
  define(modelName) {
    const ModelClass = class extends Model {};
    this.models[modelName] = ModelClass;
    return ModelClass;
  }
  
  authenticate() {
    return Promise.resolve();
  }
  
  sync() {
    return Promise.resolve(this);
  }
  
  transaction(callback) {
    if (callback) {
      return callback({
        commit: () => Promise.resolve(),
        rollback: () => Promise.resolve()
      });
    }
    return {
      commit: () => Promise.resolve(),
      rollback: () => Promise.resolve()
    };
  }
}

// Create DataTypes with proper function implementations
const DataTypes = {
  STRING: 'STRING',
  TEXT: 'TEXT',
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE',
  UUID: 'UUID',
  UUIDV4: 'UUIDV4',
  ENUM: (...values) => ({ type: 'ENUM', values }),
  ARRAY: (type) => `ARRAY(${type})`,
  JSON: 'JSON',
  JSONB: 'JSONB',
  // Add DECIMAL as a function that returns an object
  DECIMAL: (precision, scale) => ({ 
    type: 'DECIMAL', 
    precision: precision || 10, 
    scale: scale || 2 
  })
};

// Export mock classes
module.exports = {
  Sequelize: MockSequelize,
  DataTypes,
  Op: {
    eq: Symbol('eq'),
    ne: Symbol('ne'),
    gt: Symbol('gt'),
    lt: Symbol('lt'),
    gte: Symbol('gte'),
    lte: Symbol('lte'),
    in: Symbol('in'),
    notIn: Symbol('notIn'),
    like: Symbol('like'),
    notLike: Symbol('notLike'),
    iLike: Symbol('iLike'),
    notILike: Symbol('notILike'),
    and: Symbol('and'),
    or: Symbol('or')
  }
};
