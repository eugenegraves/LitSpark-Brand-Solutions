/**
 * Button Component
 * 
 * A reusable button component that follows WCAG 2.1 accessibility standards.
 * Features high contrast, visible focus states, and appropriate sizing for touch targets.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Button variants
const variants = {
  primary: css`
    background-color: #F2BF0F; /* Gold */
    color: #212529; /* Dark Gray */
    border: 2px solid #F2BF0F;
    
    &:hover, &:focus {
      background-color: #d9ab0d;
      border-color: #d9ab0d;
    }
  `,
  secondary: css`
    background-color: #212529; /* Dark Gray */
    color: #F8F9FA; /* Light Gray */
    border: 2px solid #212529;
    
    &:hover, &:focus {
      background-color: #343a40;
      border-color: #343a40;
    }
  `,
  outline: css`
    background-color: transparent;
    color: #F2BF0F; /* Gold */
    border: 2px solid #F2BF0F;
    
    &:hover, &:focus {
      background-color: rgba(242, 191, 15, 0.1);
    }
  `,
  text: css`
    background-color: transparent;
    color: #F2BF0F; /* Gold */
    border: none;
    padding: 0.5rem;
    
    &:hover, &:focus {
      text-decoration: underline;
    }
  `,
};

// Button sizes
const sizes = {
  small: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    min-height: 44px; /* Minimum touch target size for accessibility */
    min-width: 44px;
  `,
  medium: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    min-height: 44px;
    min-width: 44px;
  `,
  large: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
    min-height: 48px;
    min-width: 48px;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  line-height: 1.5;
  
  /* Apply variant styles */
  ${props => variants[props.$variant]}
  
  /* Apply size styles */
  ${props => sizes[props.$size]}
  
  /* Disabled state */
  ${props => props.$disabled && css`
    opacity: 0.65;
    pointer-events: none;
  `}
  
  /* Full width */
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  /* Focus visible state - accessible focus ring */
  &:focus-visible {
    outline: 3px solid #F2BF0F;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(242, 191, 15, 0.4);
  }
  
  /* Add icon spacing if there is an icon */
  & > svg + span, & > span + svg {
    margin-left: 0.5rem;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick = () => {},
  ariaLabel,
  ...rest
}) => {
  // Convert boolean props to data attributes
  const dataProps = {
    'data-fullwidth': fullWidth ? 'true' : undefined,
    'data-disabled': disabled ? 'true' : undefined
  };
  
  // Remove non-DOM props from rest
  const domProps = { ...rest };
  
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $fullWidth={fullWidth}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      {...dataProps}
      {...domProps}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};

export default Button;
