/**
 * Component Architecture Tests - Sprint 0: Task 3
 * 
 * These tests verify that the component architecture follows atomic design principles
 * and that responsive design is properly implemented.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const React = require('react');
const { render } = require('@testing-library/react');

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Component Architecture', () => {
  // Test atomic design structure
  describe('Atomic Design Structure', () => {
    test('Atomic design directories exist', () => {
      const atomicDirs = [
        'src/client/src/components/atoms',
        'src/client/src/components/molecules',
        'src/client/src/components/organisms',
        'src/client/src/components/templates',
      ];
      
      atomicDirs.forEach(dir => {
        const dirPath = path.resolve(process.cwd(), dir);
        expect(fs.existsSync(dirPath)).toBe(true);
        expect(fs.statSync(dirPath).isDirectory()).toBe(true);
      });
    });
    
    test('Atomic components exist', () => {
      // Check for atomic components
      const atomicComponents = [
        'src/client/src/components/atoms/Button.js',
        'src/client/src/components/atoms/Typography.js',
        'src/client/src/components/atoms/Input.js',
        'src/client/src/components/molecules/Card.js',
        'src/client/src/components/molecules/FormField.js',
        'src/client/src/components/organisms/ContactForm.js',
        'src/client/src/components/organisms/ServicesList.js',
        'src/client/src/components/templates/PageTemplate.js',
      ];
      
      atomicComponents.forEach(component => {
        const componentPath = path.resolve(process.cwd(), component);
        expect(fs.existsSync(componentPath)).toBe(true);
        expect(fs.statSync(componentPath).isFile()).toBe(true);
      });
    });
  });
  
  // Test responsive design implementation
  describe('Responsive Design Implementation', () => {
    test('Responsive utilities exist', () => {
      const responsiveUtils = [
        'src/client/src/styles/breakpoints.js',
        'src/client/src/styles/grid.js',
      ];
      
      responsiveUtils.forEach(util => {
        const utilPath = path.resolve(process.cwd(), util);
        expect(fs.existsSync(utilPath)).toBe(true);
        expect(fs.statSync(utilPath).isFile()).toBe(true);
      });
    });
    
    test('Breakpoints are properly defined', () => {
      const breakpointsPath = path.resolve(process.cwd(), 'src/client/src/styles/breakpoints.js');
      const breakpointsContent = fs.readFileSync(breakpointsPath, 'utf8');
      
      // Check for common breakpoints
      expect(breakpointsContent).toContain('xs');
      expect(breakpointsContent).toContain('sm');
      expect(breakpointsContent).toContain('md');
      expect(breakpointsContent).toContain('lg');
      expect(breakpointsContent).toContain('xl');
    });
    
    test('Grid system is implemented', () => {
      const gridPath = path.resolve(process.cwd(), 'src/client/src/styles/grid.js');
      const gridContent = fs.readFileSync(gridPath, 'utf8');
      
      // Check for grid components
      expect(gridContent).toContain('Container');
      expect(gridContent).toContain('Row');
      expect(gridContent).toContain('Column');
    });
  });
  
  // Test component props validation
  describe('Component Props Validation', () => {
    test('Components use PropTypes', () => {
      const componentsToCheck = [
        'src/client/src/components/atoms/Button.js',
        'src/client/src/components/molecules/Card.js',
        'src/client/src/components/organisms/ContactForm.js',
      ];
      
      componentsToCheck.forEach(component => {
        const componentPath = path.resolve(process.cwd(), component);
        const componentContent = fs.readFileSync(componentPath, 'utf8');
        
        // Check for PropTypes import and usage
        expect(componentContent).toContain('PropTypes');
        expect(componentContent).toContain('propTypes');
      });
    });
    
    test('Components have default props', () => {
      const componentsToCheck = [
        'src/client/src/components/atoms/Button.js',
        'src/client/src/components/molecules/Card.js',
      ];
      
      componentsToCheck.forEach(component => {
        const componentPath = path.resolve(process.cwd(), component);
        const componentContent = fs.readFileSync(componentPath, 'utf8');
        
        // Check for defaultProps
        expect(componentContent).toContain('defaultProps');
      });
    });
  });
});
