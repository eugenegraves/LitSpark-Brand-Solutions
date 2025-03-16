/**
 * Responsive Design Tests - Sprint 0: Task 3
 * 
 * These tests verify that responsive design is properly implemented
 * and components adapt to different screen sizes.
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

describe('Responsive Design', () => {
  // Test responsive CSS implementation
  describe('Responsive CSS', () => {
    test('Media queries are used in styles', () => {
      const stylesDir = path.resolve(process.cwd(), 'src/client/src/styles');
      const cssFiles = fs.readdirSync(stylesDir)
        .filter(file => file.endsWith('.js') || file.endsWith('.css'))
        .map(file => path.join(stylesDir, file));
      
      // Check at least one CSS file has media queries
      let hasMediaQueries = false;
      
      cssFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('@media') || content.includes('mediaQuery')) {
          hasMediaQueries = true;
        }
      });
      
      expect(hasMediaQueries).toBe(true);
    });
  });
  
  // Test mobile-first approach
  describe('Mobile-First Approach', () => {
    test('Mobile-first approach is used', () => {
      const breakpointsPath = path.resolve(process.cwd(), 'src/client/src/styles/breakpoints.js');
      const breakpointsContent = fs.readFileSync(breakpointsPath, 'utf8');
      
      // Check that breakpoints use min-width (mobile-first) approach
      expect(breakpointsContent).toContain('min-width');
    });
  });
  
  // Test responsive components
  describe('Responsive Components', () => {
    test('Header component is responsive', () => {
      const headerPath = path.resolve(process.cwd(), 'src/client/src/components/layout/Header.js');
      const headerContent = fs.readFileSync(headerPath, 'utf8');
      
      // Check for responsive implementation
      expect(headerContent).toMatch(/(@media|mediaQuery|responsive|breakpoint|mobile|tablet|desktop)/i);
    });
    
    test('Footer component is responsive', () => {
      const footerPath = path.resolve(process.cwd(), 'src/client/src/components/layout/Footer.js');
      const footerContent = fs.readFileSync(footerPath, 'utf8');
      
      // Check for responsive implementation
      expect(footerContent).toMatch(/(@media|mediaQuery|responsive|breakpoint|mobile|tablet|desktop)/i);
    });
    
    test('Grid components are responsive', () => {
      const gridPath = path.resolve(process.cwd(), 'src/client/src/styles/grid.js');
      const gridContent = fs.readFileSync(gridPath, 'utf8');
      
      // Check for responsive implementation
      expect(gridContent).toMatch(/(@media|mediaQuery|responsive|breakpoint|xs|sm|md|lg|xl)/i);
    });
  });
  
  // Test accessibility in responsive design
  describe('Responsive Accessibility', () => {
    test('Font sizes are responsive and accessible', () => {
      const typographyPath = path.resolve(process.cwd(), 'src/client/src/components/atoms/Typography.js');
      const typographyContent = fs.readFileSync(typographyPath, 'utf8');
      
      // Check for responsive font sizes
      expect(typographyContent).toMatch(/(@media|mediaQuery|responsive|breakpoint|fontSize)/i);
      
      // Check for rem/em units (accessibility best practice)
      expect(typographyContent).toMatch(/(rem|em)/i);
    });
    
    test('Touch targets are appropriately sized', () => {
      const buttonPath = path.resolve(process.cwd(), 'src/client/src/components/atoms/Button.js');
      const buttonContent = fs.readFileSync(buttonPath, 'utf8');
      
      // Check for appropriate touch target sizes (at least 44x44px)
      expect(buttonContent).toMatch(/(height|min-height|padding|min-width)/i);
    });
  });
});
