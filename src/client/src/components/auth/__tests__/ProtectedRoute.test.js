/**
 * Tests for ProtectedRoute component
 * 
 * Tests authentication checks, role-based access control, loading states,
 * and accessibility compliance.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import ProtectedRoute from '../ProtectedRoute';

// Mock react-router-dom
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    Navigate: jest.fn().mockImplementation(({ to }) => (
      <div data-testid="navigate" data-to={to}>Navigate to {to}</div>
    )),
    useLocation: jest.fn().mockReturnValue({ pathname: '/current-path' })
  };
});

// Mock the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}));

// Import the mocked useAuth hook
import { useAuth } from '../../../contexts/AuthContext';

// Test component
const TestComponent = () => <div>Protected Content</div>;

describe('ProtectedRoute', () => {
  // Setup - reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders the protected component when user is authenticated
  test('renders the protected component when user is authenticated', () => {
    useAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com', role: 'user', emailVerified: true },
      isAuthenticated: true,
      loading: false
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  // Test 2: Redirects to login page when user is not authenticated
  test('redirects to login page when user is not authenticated', () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: false
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  // Test 3: Shows loading state when authentication is in progress
  test('shows loading state when authentication is in progress', () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: true
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Test 4: Redirects to verification page when email is not verified
  test('redirects to verification page when email is not verified', () => {
    useAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com', role: 'user', emailVerified: false },
      isAuthenticated: true,
      loading: false
    });

    render(
      <MemoryRouter>
        <ProtectedRoute requireVerified={true}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/verification-required');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  // Test 5: Redirects to access denied page when user doesn't have required role
  test('redirects to access denied page when user doesn\'t have required role', () => {
    useAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com', role: 'user', emailVerified: true },
      isAuthenticated: true,
      loading: false
    });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={['admin']}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/access-denied');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  // Test 6: Allows access when user has one of the required roles
  test('allows access when user has one of the required roles', () => {
    useAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com', role: 'admin', emailVerified: true },
      isAuthenticated: true,
      loading: false
    });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={['admin', 'manager']}>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  // Test 7: Loading state has no accessibility violations
  test('loading state has no accessibility violations', async () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      loading: true
    });

    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test 8: Protected content has no accessibility violations
  test('protected content has no accessibility violations', async () => {
    useAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com', role: 'user', emailVerified: true },
      isAuthenticated: true,
      loading: false
    });

    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
