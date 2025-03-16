/**
 * Database Models Tests - Sprint 0: Task 3
 * 
 * These tests verify that Sequelize models are properly configured.
 */

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

describe('Database Models Setup', () => {
  test('Database configuration file exists', () => {
    const dbConfigPath = path.resolve(process.cwd(), 'src/server/config/database.js');
    expect(fs.existsSync(dbConfigPath)).toBe(true);
    
    const dbConfig = require(dbConfigPath);
    expect(dbConfig).toHaveProperty('sequelize');
    expect(dbConfig.sequelize instanceof Sequelize).toBe(true);
  });

  test('Models directory exists with required model files', () => {
    const modelsDir = path.resolve(process.cwd(), 'src/server/models');
    expect(fs.existsSync(modelsDir)).toBe(true);
    expect(fs.statSync(modelsDir).isDirectory()).toBe(true);
    
    // Check for index.js (model loader)
    const indexPath = path.join(modelsDir, 'index.js');
    expect(fs.existsSync(indexPath)).toBe(true);
    
    // Check for essential models
    const requiredModels = ['User.js', 'Project.js', 'Client.js', 'Service.js'];
    requiredModels.forEach(model => {
      const modelPath = path.join(modelsDir, model);
      expect(fs.existsSync(modelPath)).toBe(true);
    });
  });

  test('Models have required attributes and methods', () => {
    const modelsDir = path.resolve(process.cwd(), 'src/server/models');
    
    // Check User model
    const userModelPath = path.join(modelsDir, 'User.js');
    const userModelContent = fs.readFileSync(userModelPath, 'utf8');
    
    // Check for essential fields
    expect(userModelContent).toContain('email');
    expect(userModelContent).toContain('password');
    expect(userModelContent).toContain('role');
    
    // Check for methods
    expect(userModelContent).toContain('validatePassword');
    
    // Check Project model
    const projectModelPath = path.join(modelsDir, 'Project.js');
    const projectModelContent = fs.readFileSync(projectModelPath, 'utf8');
    
    // Check for essential fields
    expect(projectModelContent).toContain('title');
    expect(projectModelContent).toContain('description');
    expect(projectModelContent).toContain('status');
  });

  test('Model associations are defined', () => {
    const modelsIndexPath = path.resolve(process.cwd(), 'src/server/models/index.js');
    const indexContent = fs.readFileSync(modelsIndexPath, 'utf8');
    
    // Check for association definitions
    expect(indexContent).toContain('hasMany');
    expect(indexContent).toContain('belongsTo');
    expect(indexContent).toContain('belongsToMany');
  });
});
