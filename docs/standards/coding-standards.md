# Coding Standards

## Overview

This document outlines the coding standards and best practices for the LitSpark Brand Solutions project. Adhering to these standards ensures code consistency, maintainability, and quality across the codebase.

## JavaScript / React Standards

### General JavaScript

1. **Use ES6+ Features**
   - Prefer arrow functions for anonymous functions
   - Use destructuring for objects and arrays
   - Utilize template literals for string interpolation
   - Implement default parameters where appropriate

2. **Naming Conventions**
   - Use `camelCase` for variables, functions, and methods
   - Use `PascalCase` for classes and React components
   - Use `UPPER_SNAKE_CASE` for constants
   - Use descriptive names that clearly indicate purpose

3. **Code Formatting**
   - Indentation: 2 spaces
   - Maximum line length: 100 characters
   - Use semicolons at the end of statements
   - Use single quotes for string literals

4. **Comments**
   - Use JSDoc style comments for functions and components
   - Include purpose, parameters, and return values
   - Comment complex logic or non-obvious solutions
   - Keep comments up-to-date with code changes

### React Specific

1. **Component Structure**
   - Follow atomic design principles (atoms, molecules, organisms, templates, pages)
   - One component per file
   - Use functional components with hooks instead of class components
   - Keep components focused on a single responsibility

2. **Props**
   - Validate props using PropTypes or TypeScript
   - Use default props where appropriate
   - Destructure props in function parameters
   - Avoid prop drilling by using context when needed

3. **State Management**
   - Use React hooks (useState, useReducer) for local state
   - Consider context API for shared state across components
   - Keep state as local as possible
   - Avoid unnecessary state, derive values when possible

4. **Styling**
   - Use styled-components for component styling
   - Follow the project's design system
   - Use theme variables for colors, spacing, etc.
   - Prefix styled-component props with `$` to avoid DOM warnings

5. **Performance**
   - Use React.memo for pure components
   - Implement useMemo and useCallback for expensive calculations
   - Avoid inline function definitions in render
   - Use virtual lists for long scrollable content

## CSS / Styling Standards

1. **Organization**
   - Follow BEM (Block, Element, Modifier) naming convention when not using styled-components
   - Group related styles together
   - Order properties alphabetically within groups

2. **Responsive Design**
   - Use mobile-first approach
   - Utilize the theme breakpoints consistently
   - Test on multiple device sizes

3. **Accessibility**
   - Ensure sufficient color contrast (WCAG AA minimum)
   - Provide focus styles for interactive elements
   - Use relative units (rem, em) for font sizes

## Next.js Specific Standards

1. **Routing**
   - Use Next.js Link component for internal navigation
   - Implement dynamic routes appropriately
   - Handle loading and error states for page transitions

2. **Data Fetching**
   - Use appropriate data fetching methods (getStaticProps, getServerSideProps)
   - Implement proper error handling and loading states
   - Cache data where appropriate

3. **Image Optimization**
   - Use Next.js Image component for optimized images
   - Specify appropriate sizes and quality
   - Provide alt text for all images

## Code Quality Tools

The project uses the following tools to enforce coding standards:

1. **ESLint** - For JavaScript/React linting
2. **Prettier** - For code formatting
3. **Stylelint** - For CSS/styled-components linting
4. **Jest** - For unit testing
5. **Cypress** - For end-to-end testing

## Version Control Standards

1. **Branching Strategy**
   - Follow GitFlow branching model
   - Feature branches should be named: `feature/descriptive-name`
   - Bug fixes should be named: `fix/issue-description`

2. **Commit Messages**
   - Follow conventional commits format
   - Include issue/ticket number when applicable
   - Be descriptive but concise

3. **Pull Requests**
   - Include description of changes
   - Reference related issues
   - Keep PRs focused on a single concern
   - Require at least one reviewer approval

## Code Review Standards

1. **What to Look For**
   - Code correctness and functionality
   - Adherence to coding standards
   - Performance considerations
   - Security implications
   - Accessibility compliance

2. **Review Process**
   - Be constructive and respectful
   - Explain reasoning behind suggestions
   - Focus on the code, not the author
   - Approve only when all concerns are addressed

## Continuous Integration

All code must pass the following checks before merging:

1. Linting (ESLint, Stylelint)
2. Unit tests (Jest)
3. End-to-end tests (Cypress)
4. Build verification
5. Accessibility checks
