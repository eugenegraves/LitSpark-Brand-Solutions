/**
 * Pagination Component Tests
 * Tests functionality and accessibility compliance
 */

import React from 'react';
import { render, screen, fireEvent, testAccessibility } from '../../tests/test-utils';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  // Default props for testing
  const defaultProps = {
    currentPage: 3,
    totalPages: 10,
    onPageChange: jest.fn(),
    siblingCount: 1
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // Functionality tests
  describe('Functionality', () => {
    test('renders the correct page numbers', () => {
      render(<Pagination {...defaultProps} />);
      
      // With siblingCount=1 and currentPage=3, we should see pages 1, 2, 3, 4, 5, 10
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      
      // Page 6 should not be visible
      expect(screen.queryByText('6')).not.toBeInTheDocument();
    });
    
    test('highlights the current page', () => {
      render(<Pagination {...defaultProps} />);
      
      // Current page should have aria-current="page"
      const currentPage = screen.getByText('3');
      expect(currentPage.closest('[aria-current="page"]')).toBeInTheDocument();
    });
    
    test('calls onPageChange when clicking a page number', () => {
      render(<Pagination {...defaultProps} />);
      
      // Click on page 4
      fireEvent.click(screen.getByText('4'));
      
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
    });
    
    test('calls onPageChange when clicking previous button', () => {
      render(<Pagination {...defaultProps} />);
      
      // Find and click the previous button
      const prevButton = screen.getByLabelText('Go to previous page');
      fireEvent.click(prevButton);
      
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
    });
    
    test('calls onPageChange when clicking next button', () => {
      render(<Pagination {...defaultProps} />);
      
      // Find and click the next button
      const nextButton = screen.getByLabelText('Go to next page');
      fireEvent.click(nextButton);
      
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
    });
    
    test('disables previous button on first page', () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      
      const prevButton = screen.getByLabelText('Go to previous page');
      expect(prevButton).toBeDisabled();
      
      fireEvent.click(prevButton);
      expect(defaultProps.onPageChange).not.toHaveBeenCalled();
    });
    
    test('disables next button on last page', () => {
      render(<Pagination {...defaultProps} currentPage={10} />);
      
      const nextButton = screen.getByLabelText('Go to next page');
      expect(nextButton).toBeDisabled();
      
      fireEvent.click(nextButton);
      expect(defaultProps.onPageChange).not.toHaveBeenCalled();
    });
    
    test('renders ellipsis when needed', () => {
      render(<Pagination {...defaultProps} />);
      
      // Should have an ellipsis after page 5
      const ellipsis = document.querySelectorAll('[aria-hidden="true"]');
      expect(ellipsis.length).toBe(1);
    });
    
    test('shows first/last buttons when showFirstLast is true', () => {
      render(<Pagination {...defaultProps} currentPage={5} showFirstLast={true} />);
      
      const firstButton = screen.getByLabelText('Go to first page');
      const lastButton = screen.getByLabelText('Go to last page');
      
      expect(firstButton).toBeInTheDocument();
      expect(lastButton).toBeInTheDocument();
      
      fireEvent.click(firstButton);
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
      
      fireEvent.click(lastButton);
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(10);
    });
    
    test('does not show first/last buttons when showFirstLast is false', () => {
      render(<Pagination {...defaultProps} currentPage={5} showFirstLast={false} />);
      
      const firstButton = screen.queryByLabelText('Go to first page');
      const lastButton = screen.queryByLabelText('Go to last page');
      
      expect(firstButton).not.toBeInTheDocument();
      expect(lastButton).not.toBeInTheDocument();
    });
  });
  
  // Accessibility tests
  describe('Accessibility', () => {
    test('has appropriate ARIA attributes', () => {
      render(<Pagination {...defaultProps} />);
      
      // Check for navigation role
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Pagination');
      expect(nav).toHaveAttribute('aria-describedby');
      
      // Check for current page marker
      expect(screen.getByText('3').closest('[aria-current="page"]')).toBeInTheDocument();
      
      // Check for button labels
      expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 4')).toBeInTheDocument();
    });
    
    test('has screen reader text describing current page', () => {
      render(<Pagination {...defaultProps} />);
      
      const srElement = document.querySelector('.sr-only');
      expect(srElement).toBeInTheDocument();
      expect(srElement.textContent).toContain('Page 3 of 10');
    });
    
    test('passes axe accessibility tests', async () => {
      await testAccessibility(<Pagination {...defaultProps} />);
    });
  });
});
