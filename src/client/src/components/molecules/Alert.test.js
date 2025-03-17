/**
 * Alert Component Tests
 * Tests functionality and accessibility compliance
 */

import React from 'react';
import { render, screen, fireEvent, testAccessibility, waitFor, act } from '../../tests/test-utils';
import Alert from './Alert';

describe('Alert Component', () => {
  // Functionality tests
  describe('Functionality', () => {
    test('renders with the correct content', () => {
      render(
        <Alert title="Test Title">
          This is a test alert message
        </Alert>
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('This is a test alert message')).toBeInTheDocument();
    });
    
    test('renders with the correct variant styles', () => {
      const { rerender } = render(
        <Alert variant="success" data-testid="alert">
          Success alert
        </Alert>
      );
      
      let alert = screen.getByTestId('alert');
      expect(alert).toHaveStyle('background-color: #d1e7dd');
      expect(alert).toHaveStyle('color: #0f5132');
      
      rerender(
        <Alert variant="danger" data-testid="alert">
          Danger alert
        </Alert>
      );
      
      alert = screen.getByTestId('alert');
      expect(alert).toHaveStyle('background-color: #f8d7da');
      expect(alert).toHaveStyle('color: #842029');
      
      rerender(
        <Alert variant="primary" data-testid="alert">
          Primary alert
        </Alert>
      );
      
      alert = screen.getByTestId('alert');
      expect(alert).toHaveStyle('background-color: #f8f0d3');
      expect(alert).toHaveStyle('color: #856404');
    });
    
    test('renders with icon when showIcon is true', () => {
      render(
        <Alert showIcon={true}>
          Alert with icon
        </Alert>
      );
      
      const icon = document.querySelector('.alert-icon');
      expect(icon).toBeInTheDocument();
    });
    
    test('does not render icon when showIcon is false', () => {
      render(
        <Alert showIcon={false}>
          Alert without icon
        </Alert>
      );
      
      const icon = document.querySelector('.alert-icon');
      expect(icon).toBeNull();
    });
    
    test('can be dismissed when dismissible is true', () => {
      const handleDismiss = jest.fn();
      
      render(
        <Alert dismissible={true} onDismiss={handleDismiss}>
          Dismissible alert
        </Alert>
      );
      
      const closeButton = screen.getByLabelText('Close alert');
      fireEvent.click(closeButton);
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Dismissible alert')).not.toBeInTheDocument();
    });
    
    test('does not show close button when dismissible is false', () => {
      render(
        <Alert dismissible={false}>
          Non-dismissible alert
        </Alert>
      );
      
      const closeButton = screen.queryByLabelText('Close alert');
      expect(closeButton).not.toBeInTheDocument();
    });
    
    test('auto-hides after specified duration', async () => {
      jest.useFakeTimers();
      
      const handleDismiss = jest.fn();
      
      render(
        <Alert autoHideDuration={2000} onDismiss={handleDismiss}>
          Auto-hide alert
        </Alert>
      );
      
      expect(screen.getByText('Auto-hide alert')).toBeInTheDocument();
      
      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      await waitFor(() => {
        expect(handleDismiss).toHaveBeenCalledTimes(1);
      });
      
      // The component should be removed from the DOM after handleDismiss is called
      expect(screen.queryByText('Auto-hide alert')).not.toBeInTheDocument();
      
      jest.useRealTimers();
    });
  });
  
  // Accessibility tests
  describe('Accessibility', () => {
    test('has appropriate ARIA attributes for info variant', () => {
      render(
        <Alert variant="info">
          Info alert
        </Alert>
      );
      
      const alert = screen.getByText('Info alert').closest('[role="status"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });
    
    test('has appropriate ARIA attributes for danger variant', () => {
      render(
        <Alert variant="danger">
          Danger alert
        </Alert>
      );
      
      const alert = screen.getByText('Danger alert').closest('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });
    
    test('close button has appropriate accessibility attributes', () => {
      render(
        <Alert dismissible={true}>
          Dismissible alert
        </Alert>
      );
      
      const closeButton = screen.getByLabelText('Close alert');
      expect(closeButton).toHaveAttribute('aria-label', 'Close alert');
      expect(closeButton).toHaveAttribute('aria-controls');
    });
    
    test('passes axe accessibility tests', async () => {
      // Using a simpler Alert variant to speed up the test
      await testAccessibility(
        <Alert variant="info" showIcon={false}>
          This alert should pass accessibility tests
        </Alert>
      );
    }, 30000); // Increase timeout to 30 seconds
  });
});
