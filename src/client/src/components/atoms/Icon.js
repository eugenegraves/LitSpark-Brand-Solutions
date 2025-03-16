/**
 * Icon Component
 * 
 * A reusable icon component that follows WCAG 2.1 accessibility standards.
 * Features proper text alternatives and focus states for interactive icons.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Icon sizes
const sizes = {
  small: css`
    font-size: 1rem;
    width: 1rem;
    height: 1rem;
  `,
  medium: css`
    font-size: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
  `,
  large: css`
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
  `,
};

// Icon colors with accessible contrast ratios
const colors = {
  primary: css`
    color: #F2BF0F; /* Gold */
  `,
  secondary: css`
    color: #343A40; /* Dark Gray */
  `,
  light: css`
    color: #F8F9FA; /* Light Gray */
  `,
  dark: css`
    color: #212529; /* Darkest Gray */
  `,
  success: css`
    color: #198754; /* Accessible green */
  `,
  danger: css`
    color: #DC3545; /* Accessible red */
  `,
  info: css`
    color: #0DCAF0; /* Accessible cyan */
  `,
  warning: css`
    color: #FFC107; /* Accessible amber */
  `,
};

// Styled icon component
const StyledIcon = styled.i`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Apply size styles */
  ${({ size }) => sizes[size] || sizes.medium}
  
  /* Apply color styles */
  ${({ color }) => colors[color] || colors.primary}
  
  /* Apply focus styles for interactive icons */
  ${({ interactive }) => interactive && css`
    cursor: pointer;
    
    &:focus {
      outline: 2px solid #F2BF0F; /* Gold focus ring */
      outline-offset: 2px;
    }
  `}
`;

/**
 * Icon Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Icon name (class name for font icon)
 * @param {string} props.size - Icon size
 * @param {string} props.color - Icon color
 * @param {boolean} props.interactive - Whether the icon is interactive
 * @param {string} props.ariaLabel - Accessible label for the icon
 * @param {function} props.onClick - Click handler for interactive icons
 */
const Icon = ({
  name,
  size = 'medium',
  color = 'primary',
  interactive = false,
  ariaLabel,
  onClick,
  ...rest
}) => {
  // Determine appropriate ARIA attributes
  const ariaProps = {};
  
  if (interactive) {
    // Interactive icons need accessible names
    ariaProps['aria-label'] = ariaLabel;
    ariaProps.role = 'button';
    ariaProps.tabIndex = 0;
    
    // Add keyboard event handler for accessibility
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick && onClick(e);
      }
    };
    
    rest.onKeyDown = handleKeyDown;
  } else if (ariaLabel) {
    // Decorative icons with labels should use aria-label
    ariaProps['aria-label'] = ariaLabel;
  } else {
    // Purely decorative icons should be hidden from screen readers
    ariaProps['aria-hidden'] = 'true';
  }
  
  return (
    <StyledIcon
      className={name}
      size={size}
      color={color}
      interactive={interactive}
      onClick={interactive ? onClick : undefined}
      {...ariaProps}
      {...rest}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark', 'success', 'danger', 'info', 'warning']),
  interactive: PropTypes.bool,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
