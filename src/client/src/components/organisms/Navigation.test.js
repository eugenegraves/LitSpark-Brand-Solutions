/**
 * Navigation Component Tests
 * Tests functionality and accessibility compliance
 */

import React from 'react';
import { render, screen, fireEvent, testAccessibility } from '../../tests/test-utils';
import Navigation from './Navigation';
import Button from '../atoms/Button';

// Mock data for testing
const mockLogo = <div data-testid="mock-logo">Logo</div>;
const mockLinks = [
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
const mockActionButton = <Button variant="primary">Get Started</Button>;

describe('Navigation Component', () => {
  // Functionality tests
  describe('Functionality', () => {
    test('renders logo and navigation links', () => {
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Check if logo is rendered
      expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
      
      // Check if links are rendered
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      
      // Check if action button is rendered
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });
    
    test('renders dropdown menu when dropdown button is clicked', () => {
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Dropdown items should not be visible initially
      expect(screen.queryByText('Our Team')).not.toBeInTheDocument();
      
      // Click on dropdown button
      fireEvent.click(screen.getByText('About'));
      
      // Dropdown items should be visible
      expect(screen.getByText('Our Team')).toBeInTheDocument();
      expect(screen.getByText('Our Story')).toBeInTheDocument();
    });
    
    test('toggles mobile menu when mobile menu button is clicked', () => {
      // Mock window.innerWidth to simulate mobile view
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Find mobile menu button
      const mobileMenuButton = screen.getByLabelText('Open menu');
      
      // Mobile menu should be closed initially
      const navLinks = document.getElementById('navigation-links');
      expect(navLinks).toHaveStyle('right: -100%');
      
      // Click on mobile menu button
      fireEvent.click(mobileMenuButton);
      
      // Mobile menu should be open
      expect(navLinks).toHaveStyle('right: 0');
      
      // Close button should be visible
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toBeInTheDocument();
      
      // Click on close button
      fireEvent.click(closeButton);
      
      // Mobile menu should be closed
      expect(navLinks).toHaveStyle('right: -100%');
      
      // Reset window size
      global.innerWidth = 1024;
      global.dispatchEvent(new Event('resize'));
    });
    
    test('closes dropdown when clicking outside', () => {
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Click on dropdown button
      fireEvent.click(screen.getByText('About'));
      
      // Dropdown items should be visible
      expect(screen.getByText('Our Team')).toBeInTheDocument();
      
      // Click outside the dropdown
      fireEvent.mouseDown(document.body);
      
      // Dropdown items should not be visible
      expect(screen.queryByText('Our Team')).not.toBeInTheDocument();
    });
  });
  
  // Accessibility tests
  describe('Accessibility', () => {
    test('has appropriate ARIA attributes for navigation', () => {
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Check for navigation role
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main Navigation');
    });
    
    test('has appropriate ARIA attributes for dropdown', () => {
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Find dropdown button
      const dropdownButton = screen.getByText('About');
      
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
      expect(dropdownButton).toHaveAttribute('aria-haspopup', 'true');
      
      // Click on dropdown button
      fireEvent.click(dropdownButton);
      
      // ARIA attributes should be updated
      expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');
      
      // Dropdown menu should have appropriate attributes
      const dropdownMenu = document.getElementById(dropdownButton.getAttribute('aria-controls'));
      expect(dropdownMenu).toBeInTheDocument();
      expect(dropdownMenu).toHaveAttribute('role', 'menu');
    });
    
    test('has appropriate ARIA attributes for mobile menu', () => {
      // Mock window.innerWidth to simulate mobile view
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Find mobile menu button
      const mobileMenuButton = screen.getByLabelText('Open menu');
      
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
      expect(mobileMenuButton).toHaveAttribute('aria-controls', 'navigation-links');
      
      // Click on mobile menu button
      fireEvent.click(mobileMenuButton);
      
      // ARIA attributes should be updated
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Reset window size
      global.innerWidth = 1024;
      global.dispatchEvent(new Event('resize'));
    });
    
    test('supports keyboard navigation for dropdown', () => {
      render(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
      
      // Find dropdown button
      const dropdownButton = screen.getByText('About');
      
      // Focus on dropdown button
      dropdownButton.focus();
      
      // Press Enter to open dropdown
      fireEvent.keyDown(dropdownButton, { key: 'Enter' });
      
      // Dropdown should be open
      expect(screen.getByText('Our Team')).toBeInTheDocument();
      
      // Press Escape to close dropdown
      fireEvent.keyDown(dropdownButton, { key: 'Escape' });
      
      // Dropdown should be closed
      expect(screen.queryByText('Our Team')).not.toBeInTheDocument();
    });
    
    test('passes axe accessibility tests', async () => {
      await testAccessibility(
        <Navigation 
          logo={mockLogo} 
          links={mockLinks} 
          actionButton={mockActionButton} 
        />
      );
    });
  });
});
