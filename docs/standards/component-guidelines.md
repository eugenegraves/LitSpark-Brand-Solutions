# Component Development Guidelines

## Overview

This document outlines the guidelines and best practices for developing components in the LitSpark Brand Solutions project. Following these guidelines ensures consistency, reusability, and accessibility across all components.

## Atomic Design Methodology

We follow the atomic design methodology, which breaks down components into five distinct categories:

1. **Atoms** - Basic building blocks (buttons, inputs, typography, etc.)
2. **Molecules** - Simple groups of UI elements functioning together (form fields, cards, etc.)
3. **Organisms** - Complex UI components composed of molecules and atoms (headers, forms, etc.)
4. **Templates** - Page-level objects that place components into a layout
5. **Pages** - Specific instances of templates with real content

## Component Structure

### File Organization

```
/components
  /atoms
    /Button
      Button.js
      Button.test.js
      index.js
  /molecules
    /Card
      Card.js
      Card.test.js
      index.js
  /organisms
    /ServicesList
      ServicesList.js
      ServicesList.test.js
      index.js
  /layout
    /Header
      Header.js
      Header.test.js
      index.js
```

### Component File Structure

```jsx
// Import statements
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled components
const StyledComponent = styled.div`
  /* Styles here */
`;

/**
 * Component description
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactElement} - Rendered component
 */
const ComponentName = ({ prop1, prop2, ...props }) => {
  // Component logic

  return (
    <StyledComponent $prop1={prop1} {...props}>
      {/* Component content */}
    </StyledComponent>
  );
};

// PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string,
  prop2: PropTypes.bool,
};

// Default props
ComponentName.defaultProps = {
  prop1: 'default',
  prop2: false,
};

export default ComponentName;
```

## Accessibility Requirements

All components must adhere to WCAG 2.1 AA standards at minimum. Key requirements include:

1. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Visible focus indicators must be provided
   - Logical tab order must be maintained

2. **Screen Reader Support**
   - Use semantic HTML elements
   - Provide appropriate ARIA attributes when necessary
   - Include alternative text for images and icons

3. **Color and Contrast**
   - Maintain minimum contrast ratio of 4.5:1 for normal text
   - Use the gold (#F2BF0F) and gray color scheme that meets contrast requirements
   - Do not rely on color alone to convey information

4. **Focus Management**
   - Implement visible focus indicators (2px gold outline with 2px offset)
   - Ensure focus is properly managed in interactive components
   - Provide skip links for keyboard navigation

## Styling Guidelines

1. **Use Styled Components**
   - Prefix props with `$` to avoid DOM attribute warnings
   - Use theme variables for consistent styling
   - Implement responsive styles using theme breakpoints

2. **Handling Boolean Props**
   - Convert boolean props to data attributes for DOM elements
   - Use string values ('true'/'false') for data attributes

```jsx
// Example
const StyledButton = styled.button`
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const Button = ({ fullWidth, ...props }) => (
  <StyledButton 
    $fullWidth={fullWidth} 
    data-full-width={fullWidth ? 'true' : 'false'}
    {...props} 
  />
);
```

## Component Documentation

Each component should include:

1. **JSDoc Comments**
   - Component description
   - Prop descriptions
   - Return value
   - Examples of usage

2. **Storybook Stories**
   - Basic usage
   - Variations based on props
   - Responsive behavior
   - Interactive examples

## Testing Requirements

1. **Unit Tests**
   - Test component rendering
   - Test prop variations
   - Test user interactions
   - Test accessibility features

2. **Integration Tests**
   - Test component interactions
   - Test with real data
   - Test edge cases

3. **Accessibility Testing**
   - Automated testing with jest-axe
   - Manual testing with screen readers
   - Keyboard navigation testing

## Performance Considerations

1. **Optimization**
   - Memoize components when appropriate
   - Avoid unnecessary re-renders
   - Lazy load components when possible

2. **Bundle Size**
   - Keep dependencies minimal
   - Use code splitting for large components
   - Monitor bundle size impact

## Next.js Integration

1. **Routing**
   - Use Next.js Link component for navigation
   - Avoid nested anchor tags
   - Implement proper accessibility for navigation

2. **Image Optimization**
   - Use Next.js Image component
   - Specify appropriate sizes
   - Include alt text

## Examples

### Button Component Example

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${props => props.theme.spacing(1.5)} ${props => props.theme.spacing(3)};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Variant styles */
  background-color: ${props => {
    if (props.$variant === 'contained') return props.theme.palette[props.$color].main;
    return 'transparent';
  }};
  
  color: ${props => {
    if (props.$variant === 'contained') return props.theme.palette[props.$color].contrastText;
    return props.theme.palette[props.$color].main;
  }};
  
  border: ${props => {
    if (props.$variant === 'outlined') return `2px solid ${props.theme.palette[props.$color].main}`;
    return 'none';
  }};
  
  &:hover {
    background-color: ${props => {
      if (props.$variant === 'contained') return props.theme.palette[props.$color].dark;
      return `rgba(${props.theme.palette[props.$color].rgb}, 0.1)`;
    }};
  }
  
  &:focus-visible {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
`;

/**
 * Button Component
 * 
 * A reusable button component with various styles and sizes
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactElement} - Rendered button
 */
const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $color={color}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      data-full-width={fullWidth ? 'true' : 'false'}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
```
