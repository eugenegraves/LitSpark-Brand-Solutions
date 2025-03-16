/**
 * Jest Setup File
 * 
 * This file runs before each test file and sets up the testing environment
 * with necessary configurations and extensions.
 */

// Import Jest DOM extensions for DOM element assertions
import '@testing-library/jest-dom';

// Polyfill for TextEncoder and TextDecoder which are required by JSDOM
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock window.matchMedia for responsive design testing
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

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};

// Set up accessibility testing environment
jest.setTimeout(10000); // Increase timeout for accessibility tests
