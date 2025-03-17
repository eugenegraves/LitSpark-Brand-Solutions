/**
 * Tests for VerificationRequiredPage component
 * 
 * Tests functionality and accessibility compliance.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import VerificationRequiredPage from '../VerificationRequiredPage';
import { AuthProvider } from '../../../contexts/AuthContext';

// Mock the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}));

// Import the mocked useAuth hook
import { useAuth } from '../../../contexts/AuthContext';

// Mock fetch API
global.fetch = jest.fn();

describe('VerificationRequiredPage', () => {
  // Setup - reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockReset();
    
    useAuth.mockReturnValue({
      user: { email: 'test@example.com' },
      loading: false
    });
  });

  // Test 1: Renders the verification required page with correct content
  test('renders the verification required page with correct content', () => {
    render(
      <MemoryRouter>
        <VerificationRequiredPage />
      </MemoryRouter>
    );

    // Check for main elements
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/email verification required/i);
    expect(screen.getByText(/please check your inbox/i)).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resend verification email/i })).toBeInTheDocument();
  });

  // Test 2: Resend verification button triggers fetch API call
  test('resend verification button triggers API call', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Verification email sent' })
    });

    render(
      <MemoryRouter>
        <VerificationRequiredPage />
      </MemoryRouter>
    );

    // Click resend button
    const resendButton = screen.getByRole('button', { name: /resend verification email/i });
    
    await act(async () => {
      await userEvent.click(resendButton);
    });
    
    // Check if fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('/api/auth/resend-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@example.com' }),
    });
  });

  // Test 3: Shows success message after resending verification email
  test('shows success message after resending verification email', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Verification email sent' })
    });

    render(
      <MemoryRouter>
        <VerificationRequiredPage />
      </MemoryRouter>
    );

    // Click resend button
    const resendButton = screen.getByRole('button', { name: /resend verification email/i });
    
    await act(async () => {
      await userEvent.click(resendButton);
    });
    
    // Check for success message
    expect(screen.getByText(/verification email has been resent successfully/i)).toBeInTheDocument();
  });

  // Test 4: Shows loading state during resend operation
  test('shows loading state during resend operation', async () => {
    // Create a promise that won't resolve immediately
    let resolvePromise;
    const fetchPromise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    
    global.fetch.mockReturnValueOnce(fetchPromise);

    render(
      <MemoryRouter>
        <VerificationRequiredPage />
      </MemoryRouter>
    );

    // Click resend button
    const resendButton = screen.getByRole('button', { name: /resend verification email/i });
    
    // Start the async operation but don't wait for it to complete
    act(() => {
      userEvent.click(resendButton);
    });
    
    // Check if loading state is shown
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/sending/i);
      expect(screen.getByRole('button')).toBeDisabled();
    });
    
    // Resolve the promise to clean up
    await act(async () => {
      resolvePromise({ ok: true, json: async () => ({ message: 'Success' }) });
      await fetchPromise;
    });
  });

  // Test 5: Shows error message when resend fails
  test('shows error message when resend fails', async () => {
    const errorMessage = 'Failed to send verification email';
    
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage })
    });

    render(
      <MemoryRouter>
        <VerificationRequiredPage />
      </MemoryRouter>
    );

    // Click resend button
    const resendButton = screen.getByRole('button', { name: /resend verification email/i });
    
    await act(async () => {
      await userEvent.click(resendButton);
    });
    
    // Check if error message is shown
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // Test 6: Accessibility test - page has no accessibility violations
  test('page has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <VerificationRequiredPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test 7: Handles case when user is not available
  test('handles case when user is not available', () => {
    useAuth.mockReturnValue({
      user: null,
      loading: false
    });

    render(
      <MemoryRouter>
        <VerificationRequiredPage />
      </MemoryRouter>
    );

    // Should show a message about not being logged in
    expect(screen.getByText(/your email address needs to be verified/i)).toBeInTheDocument();
  });
});
