/**
 * Test utilities for component testing
 * Provides common utilities for testing components with React Testing Library
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import theme from '../theme';

// Add jest-axe matchers to Jest
expect.extend(toHaveNoViolations);

// Custom render that includes providers
const customRender = (ui, options = {}) => {
  const AllProviders = ({ children }) => {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    );
  };
  
  return render(ui, { wrapper: AllProviders, ...options });
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Accessibility test helper
export const testAccessibility = async (component) => {
  const { container } = customRender(component);
  const results = await axe(container, {
    rules: {
      // Disable certain rules that might be too strict for our test environment
      'color-contrast': { enabled: false }, // We test color contrast separately
      'document-title': { enabled: false }, // Not relevant in component tests
      'html-has-lang': { enabled: false }, // Not relevant in component tests
      'landmark-one-main': { enabled: false }, // Not relevant in component tests
      'page-has-heading-one': { enabled: false }, // Not relevant in component tests
      'region': { enabled: false } // Not relevant in component tests
    }
  });
  expect(results).toHaveNoViolations();
};
