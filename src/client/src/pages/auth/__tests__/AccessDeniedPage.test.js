/**
 * Tests for AccessDeniedPage component
 * 
 * Tests functionality and accessibility compliance.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import AccessDeniedPage from '../AccessDeniedPage';
import { AuthProvider } from '../../../contexts/AuthContext';

// Mock the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}));

// Import the mocked useAuth hook
import { useAuth } from '../../../contexts/AuthContext';

describe('AccessDeniedPage', () => {
  // Setup - reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      user: { email: 'test@example.com', role: 'user' },
      logout: jest.fn().mockResolvedValue({}),
      error: null,
      loading: false
    });
  });

  // Test 1: Renders the access denied page with correct content
  test('renders the access denied page with correct content', () => {
    render(
      <MemoryRouter>
        <AccessDeniedPage />
      </MemoryRouter>
    );

    // Check for main elements
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/access denied/i);
    expect(screen.getByText(/you don't have permission/i)).toBeInTheDocument();
    expect(screen.getByText(/go to dashboard/i)).toBeInTheDocument();
  });

  // Test 2: Return to dashboard link navigates to dashboard
  test('return to dashboard link navigates to dashboard', () => {
    render(
      <MemoryRouter>
        <AccessDeniedPage />
      </MemoryRouter>
    );

    // Check if dashboard link has correct href
    const dashboardLink = screen.getByText(/go to dashboard/i);
    expect(dashboardLink.getAttribute('href')).toBe('/dashboard');
  });

  // Test 3: Shows user role information
  test('shows user role information', () => {
    render(
      <MemoryRouter>
        <AccessDeniedPage />
      </MemoryRouter>
    );

    // Check if user role is displayed
    expect(screen.getByText(/your current role:/i)).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  // Test 4: Handles case when user is not available
  test('handles case when user is not available', () => {
    useAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
      error: null,
      loading: false
    });

    render(
      <MemoryRouter>
        <AccessDeniedPage />
      </MemoryRouter>
    );

    // Should show "Unknown" when user is not available
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  // Test 5: Accessibility test - page has no accessibility violations
  test('page has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <AccessDeniedPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
