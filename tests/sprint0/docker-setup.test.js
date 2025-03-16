/**
 * Docker Setup Tests - Sprint 0: Task 1
 * 
 * These tests verify that the Docker development environment is properly configured
 * including Dockerfile, docker-compose.yml, and related configuration files.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

describe('Docker Development Environment', () => {
  test('Dockerfile exists and contains required configuration', () => {
    const dockerfilePath = path.resolve(process.cwd(), 'Dockerfile');
    expect(fs.existsSync(dockerfilePath)).toBe(true);
    
    const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf8');
    
    // Check for required configurations
    expect(dockerfileContent).toContain('FROM node:16-alpine');
    expect(dockerfileContent).toContain('WORKDIR /app');
    expect(dockerfileContent).toContain('EXPOSE');
    expect(dockerfileContent).toContain('CMD');
  });
  
  test('docker-compose.yml exists and contains required services', () => {
    const dockerComposePath = path.resolve(process.cwd(), 'docker-compose.yml');
    expect(fs.existsSync(dockerComposePath)).toBe(true);
    
    const dockerComposeContent = fs.readFileSync(dockerComposePath, 'utf8');
    const dockerComposeConfig = yaml.load(dockerComposeContent);
    
    // Check for required services
    expect(dockerComposeConfig.services).toBeDefined();
    expect(dockerComposeConfig.services.app).toBeDefined();
    expect(dockerComposeConfig.services.db).toBeDefined();
    
    // Check database configuration
    const dbService = dockerComposeConfig.services.db;
    expect(dbService.image).toContain('postgres');
    expect(dbService.environment).toBeDefined();
    expect(dbService.volumes).toBeDefined();
  });
  
  test('Database initialization scripts exist', () => {
    const initScriptPath = path.resolve(process.cwd(), 'docker/postgres/init/01-init.sql');
    expect(fs.existsSync(initScriptPath)).toBe(true);
    
    const scriptContent = fs.readFileSync(initScriptPath, 'utf8');
    
    // Check for required database objects
    expect(scriptContent).toContain('CREATE TABLE');
    expect(scriptContent).toContain('users');
    expect(scriptContent).toContain('clients');
    expect(scriptContent).toContain('projects');
  });
});

describe('Version Control Configuration', () => {
  test('Git branching strategy is defined', () => {
    const gitflowPath = path.resolve(process.cwd(), '.gitflow');
    const branchingMdPath = path.resolve(process.cwd(), 'BRANCHING.md');
    
    // Either .gitflow or BRANCHING.md should exist
    expect(fs.existsSync(gitflowPath) || fs.existsSync(branchingMdPath)).toBe(true);
    
    if (fs.existsSync(branchingMdPath)) {
      const branchingContent = fs.readFileSync(branchingMdPath, 'utf8');
      expect(branchingContent).toContain('Branching Strategy');
      expect(branchingContent).toContain('feature');
      expect(branchingContent).toContain('develop');
      expect(branchingContent).toContain('main');
    }
    
    if (fs.existsSync(gitflowPath)) {
      const gitflowContent = fs.readFileSync(gitflowPath, 'utf8');
      expect(gitflowContent).toContain('gitflow');
      expect(gitflowContent).toContain('feature');
      expect(gitflowContent).toContain('develop');
    }
  });
  
  test('.gitignore is properly configured', () => {
    const gitignorePath = path.resolve(process.cwd(), '.gitignore');
    expect(fs.existsSync(gitignorePath)).toBe(true);
    
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    
    // Check for common ignored patterns
    expect(gitignoreContent).toContain('node_modules');
    expect(gitignoreContent).toContain('.env');
    expect(gitignoreContent).toContain('coverage');
    expect(gitignoreContent).toContain('build');
    expect(gitignoreContent).toContain('dist');
  });
});

describe('Linting and Code Formatting', () => {
  test('ESLint is configured', () => {
    const eslintPath = path.resolve(process.cwd(), '.eslintrc.js');
    expect(fs.existsSync(eslintPath)).toBe(true);
    
    const eslintContent = fs.readFileSync(eslintPath, 'utf8');
    
    // Check for required configurations
    expect(eslintContent).toContain('module.exports');
    expect(eslintContent).toContain('rules');
    expect(eslintContent).toContain('jsx-a11y');
  });
  
  test('Prettier is configured', () => {
    const prettierPath = path.resolve(process.cwd(), '.prettierrc');
    expect(fs.existsSync(prettierPath)).toBe(true);
    
    const prettierContent = fs.readFileSync(prettierPath, 'utf8');
    const prettierConfig = JSON.parse(prettierContent);
    
    // Check for required configurations
    expect(prettierConfig).toHaveProperty('singleQuote');
    expect(prettierConfig).toHaveProperty('tabWidth');
    expect(prettierConfig).toHaveProperty('semi');
  });
  
  test('Git hooks are configured', () => {
    const huskyPreCommitPath = path.resolve(process.cwd(), '.husky/pre-commit');
    const lintStagedPath = path.resolve(process.cwd(), '.lintstagedrc');
    
    // Check for Husky pre-commit hook
    expect(fs.existsSync(huskyPreCommitPath)).toBe(true);
    
    // Check for lint-staged configuration
    expect(fs.existsSync(lintStagedPath)).toBe(true);
    
    const lintStagedContent = fs.readFileSync(lintStagedPath, 'utf8');
    const lintStagedConfig = JSON.parse(lintStagedContent);
    
    // Check that lint-staged has configuration for JavaScript files
    expect(Object.keys(lintStagedConfig)).toContain('*.{js,jsx}');
  });
});
