/**
 * Accessibility Tests
 * 
 * This file contains comprehensive accessibility tests for all UI components
 * using jest-axe to check WCAG compliance.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import theme from '../theme';

// Import components to test
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Badge from '../components/atoms/Badge';
import Icon from '../components/atoms/Icon';
import FormField from '../components/molecules/FormField';
import Card from '../components/molecules/Card';
import Alert from '../components/molecules/Alert';
import Breadcrumb from '../components/molecules/Breadcrumb';
import Pagination from '../components/molecules/Pagination';
import Accordion from '../components/molecules/Accordion';
import Tabs from '../components/molecules/Tabs';
import Modal from '../components/organisms/Modal';
import Navigation from '../components/organisms/Navigation';
import Footer from '../components/organisms/Footer';
import SkipLink from '../components/accessibility/SkipLink';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

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

// Test data for components
const mockBreadcrumbItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Web Design', path: '/services/web-design' }
];

const mockPaginationProps = {
  currentPage: 3,
  totalPages: 10,
  onPageChange: jest.fn(),
};

const mockAccordionItems = [
  { 
    title: 'What services do you offer?',
    content: 'We offer branding, web design, and digital marketing services.'
  },
  {
    title: 'How much do your services cost?',
    content: 'Our pricing varies based on project scope and requirements.'
  }
];

const mockTabItems = [
  { label: 'Overview', content: 'Overview content' },
  { label: 'Features', content: 'Features content' },
  { label: 'Pricing', content: 'Pricing content' }
];

const mockNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

const mockFooterProps = {
  logo: <div>Logo</div>,
  description: 'Company description',
  navLinks: [
    {
      heading: 'Services',
      links: [
        { label: 'Brand Strategy', path: '/services/brand-strategy' },
        { label: 'Web Design', path: '/services/web-design' }
      ]
    }
  ],
  contact: {
    address: '123 Brand St, San Francisco, CA 94103',
    phone: '(555) 123-4567',
    email: 'hello@example.com'
  },
  socialLinks: [
    { icon: 'fab fa-facebook', url: 'https://facebook.com', label: 'Facebook' }
  ],
  copyright: ' 2023 Company Name',
  bottomLinks: [
    { label: 'Privacy Policy', path: '/privacy' }
  ]
};

// Accessibility tests
describe('Accessibility Tests', () => {
  it('Button component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(<Button>Click Me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Input component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Input id="test-input" name="test" label="Test Input" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Badge component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(<Badge>New</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Icon component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Icon name="fas fa-star" aria-label="Star" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('FormField component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <FormField id="test-field" name="test" label="Test Field" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Card component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Card>
        <h3>Card Title</h3>
        <p>Card content</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Alert component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Alert title="Important Notice">This is an important message.</Alert>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Breadcrumb component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Breadcrumb items={mockBreadcrumbItems} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Pagination component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Pagination {...mockPaginationProps} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Accordion component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Accordion 
        title="What services do you offer?" 
        defaultExpanded={false}
        onChange={() => {}}
      >
        We offer branding, web design, and digital marketing services.
      </Accordion>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Tabs component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Tabs 
        tabs={mockTabItems} 
        defaultTab={0}
        onChange={() => {}}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Modal component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Navigation component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Navigation 
        logo={<div>Logo</div>} 
        links={mockNavLinks} 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Footer component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <Footer {...mockFooterProps} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('SkipLink component should have no accessibility violations', async () => {
    const { container } = renderWithProviders(
      <SkipLink href="#main-content" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
