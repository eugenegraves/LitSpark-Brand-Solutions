/**
 * Breadcrumb Component Tests
 * Tests functionality and accessibility compliance
 */

import React from 'react';
import { render, screen, testAccessibility } from '../../tests/test-utils';
import Breadcrumb from './Breadcrumb';

// Mock data for testing
const mockItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Web Design', path: '/services/web-design' }
];

describe('Breadcrumb Component', () => {
  // Functionality tests
  describe('Functionality', () => {
    test('renders all breadcrumb items', () => {
      render(<Breadcrumb items={mockItems} />);
      
      // Check if all items are rendered
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Web Design')).toBeInTheDocument();
    });
    
    test('renders last item as current page', () => {
      render(<Breadcrumb items={mockItems} />);
      
      // Check if last item has aria-current="page"
      const currentPageItem = screen.getByText('Web Design');
      expect(currentPageItem.closest('[aria-current="page"]')).toBeInTheDocument();
    });
    
    test('renders links for all items except the last one', () => {
      render(<Breadcrumb items={mockItems} />);
      
      // First two items should be links
      const homeLink = screen.getByText('Home').closest('a');
      const servicesLink = screen.getByText('Services').closest('a');
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(servicesLink).toHaveAttribute('href', '/services');
      
      // Last item should not be a link
      const webDesignElement = screen.getByText('Web Design');
      expect(webDesignElement.closest('a')).toBeNull();
    });
    
    test('renders with home icon when showHomeIcon is true', () => {
      render(<Breadcrumb items={mockItems} showHomeIcon={true} />);
      
      // Check if home icon is rendered
      const homeItem = screen.getByText('Home').closest('li');
      expect(homeItem.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });
    
    test('does not render home icon when showHomeIcon is false', () => {
      render(<Breadcrumb items={mockItems} showHomeIcon={false} />);
      
      // Check if home icon is not rendered
      const homeItem = screen.getByText('Home').closest('li');
      expect(homeItem.querySelector('[aria-hidden="true"]')).toBeNull();
    });
  });
  
  // Accessibility tests
  describe('Accessibility', () => {
    test('has appropriate ARIA attributes', () => {
      render(<Breadcrumb items={mockItems} />);
      
      // Check for navigation role
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
      expect(nav).toHaveAttribute('aria-describedby');
      
      // Check for current page marker
      expect(screen.getByText('Web Design').closest('[aria-current="page"]')).toBeInTheDocument();
    });
    
    test('passes axe accessibility tests', async () => {
      await testAccessibility(<Breadcrumb items={mockItems} />);
    });
  });
});
