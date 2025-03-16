/**
 * Badge Component
 * 
 * A reusable badge component that follows WCAG 2.1 accessibility standards.
 * Features high contrast colors and proper text alternatives.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Badge variants with accessible color combinations
const variants = {
  primary: css`
    background-color: #F2BF0F; /* Gold */
    color: #212529; /* Dark Gray - ensures 4.5:1 contrast ratio */
  `,
  secondary: css`
    background-color: #343A40; /* Dark Gray */
    color: #F8F9FA; /* Light Gray - ensures 16:1 contrast ratio */
  `,
  success: css`
    background-color: #198754; /* Accessible green */
    color: #FFFFFF; /* White - ensures 4.5:1 contrast ratio */
  `,
  danger: css`
    background-color: #DC3545; /* Accessible red */
    color: #FFFFFF; /* White - ensures 4.5:1 contrast ratio */
  `,
  info: css`
    background-color: #0DCAF0; /* Accessible cyan */
    color: #212529; /* Dark Gray - ensures 4.5:1 contrast ratio */
  `,
  warning: css`
    background-color: #FFC107; /* Accessible amber */
    color: #212529; /* Dark Gray - ensures 4.5:1 contrast ratio */
  `,
};

// Badge sizes
const sizes = {
  small: css`
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  `,
  medium: css`
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  `,
  large: css`
    font-size: 1rem;
    padding: 0.5rem 1rem;
  `,
};

// Styled badge component
const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  
  /* Apply variant styles */
  ${({ variant }) => variants[variant] || variants.primary}
  
  /* Apply size styles */
  ${({ size }) => sizes[size] || sizes.medium}
  
  /* Apply pill style if specified */
  ${({ pill }) => pill && css`
    border-radius: 50rem;
  `}
`;

/**
 * Badge Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge style variant
 * @param {string} props.size - Badge size
 * @param {boolean} props.pill - Whether to display as pill (rounded)
 * @param {node} props.children - Badge content
 * @param {string} props.ariaLabel - Accessible label (if needed)
 */
const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  pill = false,
  ariaLabel,
  ...rest
}) => {
  // Determine if we need an aria-label
  const ariaProps = ariaLabel ? { 'aria-label': ariaLabel } : {};
  
  return (
    <StyledBadge
      variant={variant}
      size={size}
      pill={pill}
      role="status"
      {...ariaProps}
      {...rest}
    >
      {children}
    </StyledBadge>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  pill: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default Badge;
