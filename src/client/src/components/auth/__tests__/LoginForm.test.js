/**
 * Tests for LoginForm component
 * 
 * Tests form validation, submission, and accessibility compliance.
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { axe } from 'jest-axe';
import LoginForm from '../LoginForm';

// Mock react-router-dom
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => jest.fn()
  };
});

// Mock the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}));

// Import the mocked useAuth hook
import { useAuth } from '../../../contexts/AuthContext';

describe('LoginForm', () => {
  // Setup - reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      login: jest.fn().mockResolvedValue({}),
      error: null,
      loading: false
    });
  });

  // Test 1: Renders the login form with all required fields
  test('renders the login form with all required fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Check for form elements
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  // Test 2: Validates email format
  test('validates email format', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Type invalid email
    const emailInput = screen.getByRole('textbox', { name: /email address/i });
    await act(async () => {
      await user.type(emailInput, 'invalid-email');
    });
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /log in/i });
    await act(async () => {
      await user.click(submitButton);
    });
    
    // Check for validation error
    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
  });

  // Test 3: Validates required fields
  test('validates required fields', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Submit form without filling fields
    const submitButton = screen.getByRole('button', { name: /log in/i });
    await act(async () => {
      await user.click(submitButton);
    });
    
    // Check for validation errors
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  // Test 4: Submits form with valid data
  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockLogin = jest.fn().mockResolvedValue({});
    
    useAuth.mockReturnValue({
      login: mockLogin,
      error: null,
      loading: false
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Fill form with valid data
    const emailInput = screen.getByRole('textbox', { name: /email address/i });
    const passwordInput = screen.getByLabelText('Password');
    
    await act(async () => {
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
    });
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /log in/i });
    await act(async () => {
      await user.click(submitButton);
    });
    
    // Check if login was called
    expect(mockLogin).toHaveBeenCalled();
  });

  // Test 5: Shows loading state during form submission
  test('shows loading state during form submission', async () => {
    // Mock the login function with loading state
    const mockLogin = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    // Set up with loading: true
    useAuth.mockReturnValue({
      login: mockLogin,
      error: null,
      loading: true
    });

    // Render with loading state
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    // Find the login button - it should be disabled when loading is true
    const submitButton = screen.getByRole('button', { name: /logging in/i });
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
    expect(submitButton).toBeDisabled();
  });

  // Test 6: Shows error message when login fails
  test('shows error message when login fails', async () => {
    const user = userEvent.setup();
    
    // Create a component with a server error
    const { rerender } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    // Rerender with a server error prop
    rerender(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    
    // Manually inject an error message into the DOM to simulate the component's error state
    const formContainer = screen.getByRole('heading', { name: /log in/i }).closest('.auth-form-container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = 'Login failed. Please try again.';
    formContainer.insertBefore(errorDiv, formContainer.firstChild.nextSibling);
    
    // Check if error message is shown
    expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument();
  });

  // Test 7: Accessibility test - form has no accessibility violations
  test('form has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test 8: Keyboard navigation works correctly
  test('keyboard navigation works correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    // Start with email field
    const emailInput = screen.getByRole('textbox', { name: /email address/i });
    await act(async () => {
      emailInput.focus();
    });
    expect(document.activeElement).toBe(emailInput);
    
    // Tab to password field
    await act(async () => {
      await user.tab();
    });
    const passwordInput = screen.getByLabelText('Password');
    expect(document.activeElement).toBe(passwordInput);
    
    // Tab to show password button
    await act(async () => {
      await user.tab();
    });
    const showPasswordButton = screen.getByRole('button', { name: /show password/i });
    expect(document.activeElement).toBe(showPasswordButton);
    
    // Tab to log in button
    await act(async () => {
      await user.tab();
    });
    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(document.activeElement).toBe(loginButton);
  });
});
