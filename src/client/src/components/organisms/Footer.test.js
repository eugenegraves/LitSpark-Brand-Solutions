/**
 * Footer Component Tests
 * Tests functionality and accessibility compliance
 */

import React from 'react';
import { render, screen, testAccessibility } from '../../tests/test-utils';
import Footer from './Footer';

// Mock data for testing
const mockLogo = <div data-testid="mock-logo">Logo</div>;
const mockDescription = 'LitSpark Brand Solutions helps businesses create memorable brands that connect with their audience.';
const mockNavLinks = [
  {
    heading: 'Services',
    links: [
      { label: 'Brand Strategy', path: '/services/brand-strategy' },
      { label: 'Web Design', path: '/services/web-design' },
      { label: 'Digital Marketing', path: '/services/digital-marketing' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Team', path: '/team' },
      { label: 'Careers', path: '/careers' }
    ]
  }
];
const mockContact = {
  address: '123 Brand St, San Francisco, CA 94103',
  phone: '(555) 123-4567',
  email: 'hello@litspark.com',
  hours: 'Mon-Fri: 9am - 5pm PST'
};
const mockSocialLinks = [
  { icon: 'fab fa-facebook', url: 'https://facebook.com/litspark', label: 'Facebook' },
  { icon: 'fab fa-twitter', url: 'https://twitter.com/litspark', label: 'Twitter' },
  { icon: 'fab fa-instagram', url: 'https://instagram.com/litspark', label: 'Instagram' }
];
const mockCopyright = '© {year} LitSpark Brand Solutions. All rights reserved.';
const mockBottomLinks = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Sitemap', path: '/sitemap' }
];

describe('Footer Component', () => {
  // Default props for testing
  const defaultProps = {
    logo: mockLogo,
    description: mockDescription,
    navLinks: mockNavLinks,
    contact: mockContact,
    socialLinks: mockSocialLinks,
    copyright: mockCopyright,
    bottomLinks: mockBottomLinks
  };
  
  // Functionality tests
  describe('Functionality', () => {
    test('renders logo and description', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
      expect(screen.getByText(mockDescription)).toBeInTheDocument();
    });
    
    test('renders navigation sections with correct headings', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
    });
    
    test('renders all navigation links', () => {
      render(<Footer {...defaultProps} />);
      
      // Check services links
      expect(screen.getByText('Brand Strategy')).toBeInTheDocument();
      expect(screen.getByText('Web Design')).toBeInTheDocument();
      expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
      
      // Check company links
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Our Team')).toBeInTheDocument();
      expect(screen.getByText('Careers')).toBeInTheDocument();
    });
    
    test('renders contact information', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText(mockContact.address)).toBeInTheDocument();
      expect(screen.getByText(mockContact.phone)).toBeInTheDocument();
      expect(screen.getByText(mockContact.email)).toBeInTheDocument();
      expect(screen.getByText(mockContact.hours)).toBeInTheDocument();
    });
    
    test('renders social links', () => {
      render(<Footer {...defaultProps} />);
      
      // Check if all social links are rendered
      mockSocialLinks.forEach(link => {
        expect(screen.getByLabelText(link.label)).toBeInTheDocument();
      });
    });
    
    test('renders copyright with current year', () => {
      render(<Footer {...defaultProps} />);
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} LitSpark Brand Solutions. All rights reserved.`)).toBeInTheDocument();
    });
    
    test('renders bottom links', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Sitemap')).toBeInTheDocument();
    });
  });
  
  // Accessibility tests
  describe('Accessibility', () => {
    test('has appropriate ARIA labels for navigation sections', () => {
      render(<Footer {...defaultProps} />);
      
      // Find navigation sections
      const navSections = screen.getAllByRole('navigation');
      
      // Check if each section has an aria-label
      expect(navSections[0]).toHaveAttribute('aria-label', 'Services Navigation');
      expect(navSections[1]).toHaveAttribute('aria-label', 'Company Navigation');
    });
    
    test('social links have appropriate ARIA labels', () => {
      render(<Footer {...defaultProps} />);
      
      mockSocialLinks.forEach(link => {
        const socialLink = screen.getByLabelText(link.label);
        expect(socialLink).toHaveAttribute('aria-label', link.label);
        expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
    
    test('contact links have appropriate attributes', () => {
      render(<Footer {...defaultProps} />);
      
      // Check phone link
      const phoneLink = screen.getByText(mockContact.phone);
      expect(phoneLink).toHaveAttribute('href', `tel:${mockContact.phone.replace(/\D/g, '')}`);
      
      // Check email link
      const emailLink = screen.getByText(mockContact.email);
      expect(emailLink).toHaveAttribute('href', `mailto:${mockContact.email}`);
    });
    
    test('passes axe accessibility tests', async () => {
      await testAccessibility(<Footer {...defaultProps} />);
    });
  });
});
