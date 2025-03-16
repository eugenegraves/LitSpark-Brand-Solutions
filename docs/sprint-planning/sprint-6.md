# Sprint 6: Testing & Quality Assurance

## Overview

**Duration**: 3 weeks (July 13 - August 2, 2025)

Sprint 6 focuses on comprehensive testing and quality assurance of the entire application, including unit testing, integration testing, accessibility testing, and performance optimization.

## Goals

1. Implement comprehensive test coverage
2. Conduct accessibility audits and remediation
3. Perform performance optimization
4. Implement security testing and hardening

## Tasks

### Task 1: Test Coverage Implementation

**Description**: Implement comprehensive test coverage for frontend and backend components, including unit tests, integration tests, and end-to-end tests.

**Subtasks**:
- Implement frontend unit tests
- Create backend unit tests
- Develop integration tests
- Implement end-to-end tests

**Acceptance Criteria**:
- 80% or higher test coverage for critical components
- Automated test suite with CI/CD integration
- Comprehensive test documentation
- Test reporting and visualization

**Accessibility Considerations**:
- Include accessibility assertions in automated tests
- Test keyboard navigation flows
- Verify screen reader compatibility
- Test with various input methods

### Task 2: Accessibility Audits

**Description**: Conduct comprehensive accessibility audits and implement remediation to ensure WCAG 2.1 AA compliance across all application components.

**Subtasks**:
- Conduct automated accessibility scans
- Perform manual accessibility testing
- Create accessibility remediation plan
- Implement accessibility fixes

**Acceptance Criteria**:
- WCAG 2.1 AA compliance across all pages
- Documented accessibility testing results
- Remediation of all critical and high-priority issues
- Accessibility statement and documentation

**Accessibility Considerations**:
- Test with multiple screen readers (NVDA, JAWS, VoiceOver)
- Verify color contrast with the gold (#F2BF0F) and gray color scheme
- Test keyboard-only navigation
- Verify focus management and tab order

### Task 3: Performance Optimization

**Description**: Optimize application performance, including code optimization, asset optimization, caching strategies, and load testing.

**Subtasks**:
- Implement code optimization
- Create asset optimization
- Develop caching strategies
- Conduct load testing

**Acceptance Criteria**:
- Page load time under 3 seconds
- Google Lighthouse performance score of 90+
- Optimized assets and bundle sizes
- Successful load testing under expected traffic

**Accessibility Considerations**:
- Ensure performance optimizations don't impact accessibility
- Maintain accessible loading states
- Test performance with assistive technologies
- Verify animations respect reduced motion preferences

### Task 4: Security Testing

**Description**: Conduct security testing and implement hardening measures, including vulnerability scanning, penetration testing, and security best practices.

**Subtasks**:
- Implement vulnerability scanning
- Conduct penetration testing
- Create security best practices documentation
- Implement security hardening

**Acceptance Criteria**:
- No critical or high vulnerabilities
- Secure authentication and authorization
- Data protection and encryption
- Security documentation and training

**Accessibility Considerations**:
- Ensure security measures don't impact accessibility
- Maintain accessible error messages
- Verify security features work with assistive technologies
- Test security flows with keyboard-only navigation

## Deliverables

1. Comprehensive test suite
2. Accessibility compliance documentation
3. Performance optimization report
4. Security audit and remediation report

## Technical Implementation Details

### Frontend Unit Testing

```jsx
// Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/atoms/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

describe('Button Component', () => {
  const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test('renders button with text', () => {
    renderWithTheme(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies variant styles correctly', () => {
    renderWithTheme(<Button variant="contained">Contained Button</Button>);
    const button = screen.getByRole('button', { name: /contained button/i });
    
    expect(button).toHaveClass('MuiButton-contained');
  });

  test('applies color styles correctly', () => {
    renderWithTheme(<Button color="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });
    
    expect(button).toHaveClass('MuiButton-colorPrimary');
  });

  test('applies fullWidth style when specified', () => {
    renderWithTheme(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByRole('button', { name: /full width button/i });
    
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  test('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    
    expect(button).toBeDisabled();
  });

  test('has accessible focus state', () => {
    renderWithTheme(<Button>Focus Test Button</Button>);
    const button = screen.getByRole('button', { name: /focus test button/i });
    
    button.focus();
    expect(button).toHaveFocus();
    // Additional focus style checks would be done with getComputedStyle in an e2e test
  });
});
```

### Backend Unit Testing

```javascript
// userController.test.js
const { createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Mock User model
jest.mock('../models/User');

describe('User Controller', () => {
  let req;
  let res;
  
  beforeEach(() => {
    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'client'
      },
      params: {
        id: '60d21b4667d0d8992e610c85'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {}
    };
    
    // Clear all mocks
    jest.clearAllMocks();
  });
  
  describe('createUser', () => {
    test('should create a new user and return 201 status', async () => {
      // Mock bcrypt hash
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
      
      // Mock User.create
      User.create.mockResolvedValue({
        _id: '60d21b4667d0d8992e610c85',
        name: 'Test User',
        email: 'test@example.com',
        role: 'client',
        toObject: () => ({
          _id: '60d21b4667d0d8992e610c85',
          name: 'Test User',
          email: 'test@example.com',
          role: 'client'
        })
      });
      
      await createUser(req, res);
      
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.create).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'client'
      });
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        user: {
          _id: '60d21b4667d0d8992e610c85',
          name: 'Test User',
          email: 'test@example.com',
          role: 'client'
        }
      });
    });
    
    test('should handle validation errors', async () => {
      // Mock validation error
      const error = new mongoose.Error.ValidationError();
      error.errors = {
        email: new mongoose.Error.ValidatorError({
          message: 'Email is required',
          path: 'email'
        })
      };
      
      User.create.mockRejectedValue(error);
      
      await createUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Validation Error',
        details: { email: 'Email is required' }
      });
    });
    
    test('should handle duplicate email error', async () => {
      // Mock duplicate key error
      const error = new mongoose.Error.MongoError({
        code: 11000,
        keyPattern: { email: 1 }
      });
      
      User.create.mockRejectedValue(error);
      
      await createUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Conflict',
        message: 'Email already in use'
      });
    });
  });
  
  // Additional tests for getUserById, updateUser, deleteUser would follow
});
```

### Integration Testing

```javascript
// auth.integration.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

describe('Authentication API', () => {
  let testUser;
  
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_TEST_URI);
    
    // Clear users collection
    await User.deleteMany({});
    
    // Create test user
    testUser = await User.create({
      name: 'Integration Test User',
      email: 'integration@test.com',
      password: await bcrypt.hash('testpassword', 10),
      role: 'client'
    });
  });
  
  afterAll(async () => {
    // Disconnect from test database
    await mongoose.connection.close();
  });
  
  describe('POST /api/auth/login', () => {
    test('should login user and return token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'integration@test.com',
          password: 'testpassword'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('name', 'Integration Test User');
      
      // Verify token
      const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);
      expect(decoded).toHaveProperty('id', testUser._id.toString());
    });
    
    test('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'integration@test.com',
          password: 'wrongpassword'
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
    
    test('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'integration@test.com'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email and password are required');
    });
  });
  
  describe('GET /api/auth/me', () => {
    test('should return user profile when authenticated', async () => {
      // Login to get token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'integration@test.com',
          password: 'testpassword'
        });
      
      const token = loginResponse.body.token;
      
      // Get profile with token
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('name', 'Integration Test User');
      expect(response.body.user).toHaveProperty('email', 'integration@test.com');
      expect(response.body.user).not.toHaveProperty('password');
    });
    
    test('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/me');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'No token, authorization denied');
    });
    
    test('should return 401 for invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Token is not valid');
    });
  });
});
```

### End-to-End Testing

```javascript
// cypress/e2e/login.cy.js
describe('Login Flow', () => {
  beforeEach(() => {
    // Reset database to known state
    cy.task('db:seed');
    
    // Visit login page
    cy.visit('/login');
  });
  
  it('should display login form', () => {
    cy.get('h1').should('contain', 'Sign In');
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Sign In');
  });
  
  it('should validate form inputs', () => {
    // Submit empty form
    cy.get('button[type="submit"]').click();
    
    // Check validation messages
    cy.get('input[name="email"] + .error-message').should('be.visible').and('contain', 'Email is required');
    cy.get('input[name="password"] + .error-message').should('be.visible').and('contain', 'Password is required');
    
    // Enter invalid email
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="email"] + .error-message').should('be.visible').and('contain', 'Please enter a valid email');
  });
  
  it('should login successfully with valid credentials', () => {
    // Enter valid credentials
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    
    // Submit form
    cy.get('button[type="submit"]').click();
    
    // Check redirect to dashboard
    cy.url().should('include', '/dashboard');
    cy.get('.user-greeting').should('contain', 'Welcome, Test User');
  });
  
  it('should show error message for invalid credentials', () => {
    // Enter invalid credentials
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    
    // Submit form
    cy.get('button[type="submit"]').click();
    
    // Check error message
    cy.get('.alert-error').should('be.visible').and('contain', 'Invalid email or password');
    
    // URL should still be login page
    cy.url().should('include', '/login');
  });
  
  it('should be accessible via keyboard navigation', () => {
    // Tab to email field
    cy.get('body').tab();
    cy.focused().should('have.attr', 'name', 'email');
    
    // Tab to password field
    cy.focused().tab();
    cy.focused().should('have.attr', 'name', 'password');
    
    // Tab to submit button
    cy.focused().tab();
    cy.focused().should('have.attr', 'type', 'submit');
    
    // Enter credentials with keyboard
    cy.get('input[name="email"]').focus().type('user@example.com');
    cy.get('input[name="password"]').focus().type('password123');
    
    // Submit with Enter key
    cy.get('input[name="password"]').type('{enter}');
    
    // Check redirect to dashboard
    cy.url().should('include', '/dashboard');
  });
});
```

### Accessibility Testing

```javascript
// cypress/e2e/accessibility.cy.js
describe('Accessibility Tests', () => {
  beforeEach(() => {
    // Configure aXe
    cy.injectAxe();
  });
  
  it('Home page should not have accessibility violations', () => {
    cy.visit('/');
    cy.checkA11y();
  });
  
  it('Login page should not have accessibility violations', () => {
    cy.visit('/login');
    cy.checkA11y();
  });
  
  it('Dashboard should not have accessibility violations', () => {
    // Login first
    cy.login('user@example.com', 'password123');
    cy.visit('/dashboard');
    cy.checkA11y();
  });
  
  it('Should have proper focus management', () => {
    cy.visit('/');
    
    // Check skip link
    cy.get('body').tab();
    cy.focused().should('have.class', 'skip-link');
    cy.focused().click();
    cy.focused().should('have.attr', 'id', 'main-content');
    
    // Check focus trap in modal
    cy.get('button:contains("Contact Us")').click();
    cy.get('.modal').should('be.visible');
    
    // Focus should be trapped in modal
    let focusedElementsCount = 0;
    const modalElements = [];
    
    // Tab through all focusable elements in modal
    cy.document().then(doc => {
      const focusableElements = doc.querySelectorAll('.modal button, .modal input, .modal textarea, .modal select, .modal a');
      
      // Store initial focus
      cy.focused().then($el => {
        modalElements.push($el[0]);
        focusedElementsCount++;
      });
      
      // Tab through all elements
      for (let i = 0; i < focusableElements.length * 2; i++) {
        cy.focused().tab().then($el => {
          modalElements.push($el[0]);
          focusedElementsCount++;
        });
      }
    });
    
    // Verify focus is trapped in modal
    cy.wrap(null).then(() => {
      const uniqueElements = new Set(modalElements);
      expect(uniqueElements.size).to.be.lessThan(focusedElementsCount);
    });
    
    // Close modal
    cy.get('.modal button[aria-label="Close"]').click();
    cy.get('.modal').should('not.exist');
  });
  
  it('Should announce dynamic content changes', () => {
    cy.login('user@example.com', 'password123');
    cy.visit('/dashboard');
    
    // Intercept API calls to simulate loading state
    cy.intercept('GET', '/api/notifications', req => {
      req.reply({
        delay: 1000,
        body: [
          { id: 1, message: 'New notification for testing' }
        ]
      });
    });
    
    // Click refresh button
    cy.get('button[aria-label="Refresh notifications"]').click();
    
    // Check loading state
    cy.get('[aria-live="polite"]').should('contain', 'Loading notifications');
    
    // Check updated content
    cy.get('[aria-live="polite"]').should('contain', 'Notifications updated');
    cy.get('.notification-item').should('contain', 'New notification for testing');
  });
});
```

## Accessibility Implementation

### Accessibility Testing Utilities

```javascript
// utils/accessibilityTestUtils.js
const { axe } = require('jest-axe');
const { render } = require('@testing-library/react');
const { ThemeProvider } = require('@mui/material/styles');
const theme = require('../theme');

/**
 * Custom render function that wraps component with ThemeProvider
 * and returns both the rendered component and axe results
 */
const renderWithA11y = async (ui) => {
  const { container, ...renderResult } = render(
    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
  );
  
  const axeResults = await axe(container);
  
  return {
    container,
    axeResults,
    ...renderResult,
  };
};

/**
 * Tests a component for accessibility violations
 */
const expectNoA11yViolations = async (ui) => {
  const { axeResults } = await renderWithA11y(ui);
  expect(axeResults).toHaveNoViolations();
};

/**
 * Simulates keyboard navigation through a component
 */
const simulateTabNavigation = (container, count = 10) => {
  const tabbableElements = [];
  let currentElement = container.querySelector(':focus') || document.activeElement;
  
  for (let i = 0; i < count; i++) {
    // Simulate tab press
    currentElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      bubbles: true,
      cancelable: true,
    }));
    
    // Get next focused element
    currentElement = document.activeElement;
    tabbableElements.push(currentElement);
    
    // Break if we've cycled through all elements
    if (i > 0 && currentElement === tabbableElements[0]) {
      break;
    }
  }
  
  return tabbableElements;
};

module.exports = {
  renderWithA11y,
  expectNoA11yViolations,
  simulateTabNavigation,
};
```

### Performance Optimization

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name].[contenthash].chunk.js' : 'js/[name].chunk.js',
      publicPath: '/',
      clean: true,
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: 'single',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb
            },
          },
          generator: {
            filename: 'images/[name].[hash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false,
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].chunk.css',
      }),
      isProduction && new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240, // 10kb
        minRatio: 0.8,
      }),
      env.analyze && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3000,
      compress: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
};
```

## Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Incomplete test coverage | High | Medium | Define critical paths and ensure they have 100% coverage |
| Accessibility issues in third-party components | Medium | High | Create accessible wrappers and fallbacks for problematic components |
| Performance regression | High | Medium | Implement performance budgets and automated performance testing |
| Security vulnerabilities in dependencies | High | Medium | Regular dependency scanning and updates |

## Definition of Done

- 80% or higher test coverage for critical components
- WCAG 2.1 AA compliance verified across all pages
- Google Lighthouse performance score of 90+
- No critical or high security vulnerabilities
- All automated tests passing in CI/CD pipeline
- Documentation updated with testing and accessibility information
