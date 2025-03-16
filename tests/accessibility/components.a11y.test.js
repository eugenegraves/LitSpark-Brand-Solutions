/**
 * Accessibility Tests for Components
 * 
 * These tests verify that components meet WCAG 2.1 accessibility standards
 * using jest-axe for automated accessibility testing.
 */

const { axe, toHaveNoViolations } = require('jest-axe');
const React = require('react');
const { render } = require('@testing-library/react');

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock components for testing
// In a real implementation, you would import your actual components
const MockButton = () => <button>Click Me</button>;
const MockLink = () => <a href="#">Link</a>;
const MockForm = () => (
  <form>
    <label htmlFor="name">Name</label>
    <input id="name" type="text" />
    <button type="submit">Submit</button>
  </form>
);

describe('Accessibility Tests', () => {
  test('Button component should have no accessibility violations', async () => {
    const { container } = render(<MockButton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Link component should have no accessibility violations', async () => {
    const { container } = render(<MockLink />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Form component should have no accessibility violations', async () => {
    const { container } = render(<MockForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});