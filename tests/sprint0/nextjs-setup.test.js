/**
 * Next.js Setup Tests - Sprint 0: Task 3
 * 
 * These tests verify that Next.js is properly configured for the client application.
 */

const fs = require('fs');
const path = require('path');

describe('Next.js Setup', () => {
  test('Next.js configuration file exists', () => {
    const nextConfigPath = path.resolve(process.cwd(), 'src/client/next.config.js');
    expect(fs.existsSync(nextConfigPath)).toBe(true);
    expect(fs.statSync(nextConfigPath).isFile()).toBe(true);
  });

  test('Next.js package dependencies are installed', () => {
    const packageJsonPath = path.resolve(process.cwd(), 'src/client/package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check for Next.js dependency
    expect(packageJson.dependencies).toHaveProperty('next');
    
    // Check for Next.js scripts
    expect(packageJson.scripts).toHaveProperty('dev');
    expect(packageJson.scripts).toHaveProperty('build');
    expect(packageJson.scripts).toHaveProperty('start');
  });

  test('Next.js pages directory exists with required files', () => {
    const pagesDir = path.resolve(process.cwd(), 'src/client/pages');
    expect(fs.existsSync(pagesDir)).toBe(true);
    expect(fs.statSync(pagesDir).isDirectory()).toBe(true);
    
    // Check for index page
    const indexPath = path.join(pagesDir, 'index.js');
    expect(fs.existsSync(indexPath)).toBe(true);
    
    // Check for _app.js
    const appPath = path.join(pagesDir, '_app.js');
    expect(fs.existsSync(appPath)).toBe(true);
    
    // Check for _document.js
    const documentPath = path.join(pagesDir, '_document.js');
    expect(fs.existsSync(documentPath)).toBe(true);
  });

  test('Next.js API routes directory exists', () => {
    const apiDir = path.resolve(process.cwd(), 'src/client/pages/api');
    expect(fs.existsSync(apiDir)).toBe(true);
    expect(fs.statSync(apiDir).isDirectory()).toBe(true);
    
    // Check for health check API route
    const healthPath = path.join(apiDir, 'health.js');
    expect(fs.existsSync(healthPath)).toBe(true);
  });

  test('Next.js public directory exists', () => {
    const publicDir = path.resolve(process.cwd(), 'src/client/public');
    expect(fs.existsSync(publicDir)).toBe(true);
    expect(fs.statSync(publicDir).isDirectory()).toBe(true);
  });
});
