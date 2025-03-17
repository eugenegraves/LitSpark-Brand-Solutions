/**
 * Keyboard Navigation Tests
 * 
 * This file contains tests to verify that all interactive components
 * are properly accessible via keyboard navigation.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

// Import components to test
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Navigation from '../components/organisms/Navigation';
import Accordion from '../components/molecules/Accordion';
import Tabs from '../components/molecules/Tabs';
import Modal from '../components/organisms/Modal';
import Pagination from '../components/molecules/Pagination';

// Custom render with providers
const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Mock data for components
const mockAccordionItems = [
  { 
    title: 'Section 1',
    content: 'Content for section 1'
  },
  {
    title: 'Section 2',
    content: 'Content for section 2'
  }
];

const mockTabItems = [
  { label: 'Tab 1', content: 'Content for tab 1' },
  { label: 'Tab 2', content: 'Content for tab 2' },
  { label: 'Tab 3', content: 'Content for tab 3' }
];

const mockNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { 
    label: 'About', 
    dropdown: [
      { label: 'Our Team', path: '/about/team' },
      { label: 'Our Story', path: '/about/story' }
    ]
  },
  { label: 'Contact', path: '/contact' }
];

// Helper function to simulate tab key press
const pressTab = () => {
  fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab', code: 'Tab' });
};

// Helper function to simulate shift+tab key press
const pressShiftTab = () => {
  fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab', code: 'Tab', shiftKey: true });
};

// Helper function to simulate enter key press
const pressEnter = () => {
  fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter', code: 'Enter' });
};

// Helper function to simulate escape key press
const pressEscape = () => {
  fireEvent.keyDown(document.activeElement || document.body, { key: 'Escape', code: 'Escape' });
};

// Helper function to simulate arrow key presses
const pressArrowKey = (direction) => {
  fireEvent.keyDown(document.activeElement || document.body, { key: direction, code: direction });
};

describe('Keyboard Navigation Tests', () => {
  // Button tests
  describe('Button Component', () => {
    test('should be focusable with tab key', () => {
      renderWithProviders(<Button>Test Button</Button>);
      
      const button = screen.getByText('Test Button');
      expect(document.activeElement).not.toBe(button);
      
      pressTab();
      expect(document.activeElement).toBe(button);
    });
    
    test('should be activatable with Enter key', () => {
      const handleClick = jest.fn();
      renderWithProviders(<Button onClick={handleClick}>Test Button</Button>);
      
      const button = screen.getByText('Test Button');
      button.focus();
      
      pressEnter();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    test('should be activatable with Space key', () => {
      const handleClick = jest.fn();
      renderWithProviders(<Button onClick={handleClick}>Test Button</Button>);
      
      const button = screen.getByText('Test Button');
      button.focus();
      
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  
  // Input tests
  describe('Input Component', () => {
    test('should be focusable with tab key', () => {
      renderWithProviders(<Input id="test-input" name="test" label="Test Input" />);
      
      const input = screen.getByLabelText('Test Input');
      expect(document.activeElement).not.toBe(input);
      
      pressTab();
      expect(document.activeElement).toBe(input);
    });
  });
  
  // Accordion tests
  describe('Accordion Component', () => {
    test('should navigate between accordion headers with tab key', () => {
      renderWithProviders(<Accordion items={mockAccordionItems} />);
      
      // Get accordion headers
      const headers = screen.getAllByRole('button');
      expect(headers.length).toBe(2);
      
      // First tab should focus first header
      pressTab();
      expect(document.activeElement).toBe(headers[0]);
      
      // Second tab should focus second header
      pressTab();
      expect(document.activeElement).toBe(headers[1]);
    });
    
    test('should toggle accordion panel with Enter key', () => {
      renderWithProviders(<Accordion items={mockAccordionItems} />);
      
      // Get first accordion header
      const header = screen.getAllByRole('button')[0];
      const panelId = header.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      
      // Panel should be collapsed initially
      expect(header.getAttribute('aria-expanded')).toBe('false');
      expect(panel).not.toBeVisible();
      
      // Focus header and press Enter
      header.focus();
      pressEnter();
      
      // Panel should be expanded
      expect(header.getAttribute('aria-expanded')).toBe('true');
      expect(panel).toBeVisible();
      
      // Press Enter again
      pressEnter();
      
      // Panel should be collapsed again
      expect(header.getAttribute('aria-expanded')).toBe('false');
      expect(panel).not.toBeVisible();
    });
  });
  
  // Tabs tests
  describe('Tabs Component', () => {
    test('should navigate between tab buttons with tab key', () => {
      renderWithProviders(<Tabs items={mockTabItems} />);
      
      // Get tab buttons
      const tabButtons = screen.getAllByRole('tab');
      expect(tabButtons.length).toBe(3);
      
      // First tab should focus first tab button
      pressTab();
      expect(document.activeElement).toBe(tabButtons[0]);
      
      // Second tab should focus second tab button
      pressTab();
      expect(document.activeElement).toBe(tabButtons[1]);
      
      // Third tab should focus third tab button
      pressTab();
      expect(document.activeElement).toBe(tabButtons[2]);
    });
    
    test('should switch tabs with arrow keys', () => {
      renderWithProviders(<Tabs items={mockTabItems} />);
      
      // Get tab buttons
      const tabButtons = screen.getAllByRole('tab');
      
      // Focus first tab
      tabButtons[0].focus();
      expect(tabButtons[0].getAttribute('aria-selected')).toBe('true');
      
      // Press right arrow to move to next tab
      pressArrowKey('ArrowRight');
      expect(tabButtons[1].getAttribute('aria-selected')).toBe('true');
      
      // Press right arrow again to move to last tab
      pressArrowKey('ArrowRight');
      expect(tabButtons[2].getAttribute('aria-selected')).toBe('true');
      
      // Press left arrow to move back
      pressArrowKey('ArrowLeft');
      expect(tabButtons[1].getAttribute('aria-selected')).toBe('true');
    });
  });
  
  // Modal tests
  describe('Modal Component', () => {
    test('should trap focus within the modal when open', () => {
      renderWithProviders(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <p>Modal content</p>
          <Button>Modal Button</Button>
        </Modal>
      );
      
      // Get focusable elements in modal
      const closeButton = screen.getByLabelText('Close modal');
      const modalButton = screen.getByText('Modal Button');
      
      // First tab should focus close button
      pressTab();
      expect(document.activeElement).toBe(closeButton);
      
      // Second tab should focus modal button
      pressTab();
      expect(document.activeElement).toBe(modalButton);
      
      // Third tab should loop back to close button (focus trap)
      pressTab();
      expect(document.activeElement).toBe(closeButton);
    });
    
    test('should close with Escape key', () => {
      const handleClose = jest.fn();
      renderWithProviders(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      
      // Press Escape
      pressEscape();
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
  
  // Navigation tests
  describe('Navigation Component', () => {
    test('should navigate dropdown menu with keyboard', () => {
      renderWithProviders(
        <Navigation 
          logo={<div>Logo</div>} 
          links={mockNavLinks} 
        />
      );
      
      // Find dropdown button
      const dropdownButton = screen.getByText('About');
      
      // Focus dropdown button
      dropdownButton.focus();
      expect(document.activeElement).toBe(dropdownButton);
      
      // Press Enter to open dropdown
      pressEnter();
      
      // Dropdown should be open
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('true');
      
      // Tab to first dropdown item
      pressTab();
      const firstDropdownItem = screen.getByText('Our Team').closest('a');
      expect(document.activeElement).toBe(firstDropdownItem);
      
      // Press Escape to close dropdown
      pressEscape();
      
      // Dropdown should be closed
      expect(dropdownButton.getAttribute('aria-expanded')).toBe('false');
    });
  });
  
  // Pagination tests
  describe('Pagination Component', () => {
    test('should navigate between pagination buttons with tab key', () => {
      const handlePageChange = jest.fn();
      renderWithProviders(
        <Pagination 
          currentPage={3} 
          totalPages={10} 
          onPageChange={handlePageChange} 
        />
      );
      
      // Get pagination buttons
      const prevButton = screen.getByLabelText('Go to previous page');
      const pageButtons = screen.getAllByRole('button').filter(
        button => button.getAttribute('aria-label')?.startsWith('Go to page')
      );
      const nextButton = screen.getByLabelText('Go to next page');
      
      // First tab should focus previous button
      pressTab();
      expect(document.activeElement).toBe(prevButton);
      
      // Next tabs should focus page buttons
      for (let i = 0; i < pageButtons.length; i++) {
        pressTab();
        expect(document.activeElement).toBe(pageButtons[i]);
      }
      
      // Last tab should focus next button
      pressTab();
      expect(document.activeElement).toBe(nextButton);
    });
    
    test('should activate pagination buttons with Enter key', () => {
      const handlePageChange = jest.fn();
      renderWithProviders(
        <Pagination 
          currentPage={3} 
          totalPages={10} 
          onPageChange={handlePageChange} 
        />
      );
      
      // Find and focus page 4 button
      const page4Button = screen.getByLabelText('Go to page 4');
      page4Button.focus();
      
      // Press Enter
      pressEnter();
      expect(handlePageChange).toHaveBeenCalledWith(4);
    });
  });
});
