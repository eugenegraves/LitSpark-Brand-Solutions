/**
 * Alert Component
 * 
 * A reusable alert component that follows WCAG 2.1 accessibility standards.
 * Features proper ARIA roles, semantic structure, and color independence.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '../atoms/Icon';
import { breakpoints } from '../../theme/breakpoints';

// Alert variants with accessible color combinations
const variants = {
  success: css`
    background-color: #d1e7dd;
    color: #0f5132;
    border-color: #badbcc;
    
    .alert-icon {
      color: #198754;
    }
  `,
  danger: css`
    background-color: #f8d7da;
    color: #842029;
    border-color: #f5c2c7;
    
    .alert-icon {
      color: #dc3545;
    }
  `,
  warning: css`
    background-color: #fff3cd;
    color: #664d03;
    border-color: #ffecb5;
    
    .alert-icon {
      color: #ffc107;
    }
  `,
  info: css`
    background-color: #cff4fc;
    color: #055160;
    border-color: #b6effb;
    
    .alert-icon {
      color: #0dcaf0;
    }
  `,
  primary: css`
    background-color: #f8f0d3;
    color: #856404;
    border-color: #f5e7b5;
    
    .alert-icon {
      color: #F2BF0F;
    }
  `,
};

const AlertContainer = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  
  /* Apply variant styles */
  ${({ $variant }) => variants[$variant]}
  
  /* Apply dismissible styles */
  ${({ $dismissible }) => $dismissible && css`
    padding-right: 3rem;
  `}
  
  @media ${breakpoints.down('sm')} {
    padding: 0.75rem;
  }
`;

const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const AlertMessage = styled.div`
  margin-bottom: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem;
  background: transparent;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover, &:focus {
    opacity: 1;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
`;

/**
 * Alert Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Alert style variant
 * @param {node} props.title - Alert title (optional)
 * @param {node} props.children - Alert content
 * @param {boolean} props.dismissible - Whether alert can be dismissed
 * @param {function} props.onDismiss - Callback when alert is dismissed
 * @param {boolean} props.showIcon - Whether to show status icon
 * @param {number} props.autoHideDuration - Duration in ms after which alert auto-hides (0 = never)
 */
const Alert = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  showIcon = true,
  autoHideDuration = 0,
  ...rest
}) => {
  const [visible, setVisible] = useState(true);
  
  // Auto-hide alert after specified duration
  useEffect(() => {
    if (autoHideDuration > 0 && visible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, visible]);
  
  // Handle dismiss button click
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };
  
  if (!visible) return null;
  
  // Determine icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return 'fas fa-check-circle';
      case 'danger':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
        return 'fas fa-info-circle';
      case 'primary':
        return 'fas fa-lightbulb';
      default:
        return 'fas fa-info-circle';
    }
  };
  
  // Determine ARIA role based on variant
  const getRole = () => {
    switch (variant) {
      case 'danger':
        return 'alert';
      case 'warning':
        return 'alert';
      default:
        return 'status';
    }
  };
  
  // Generate unique ID for ARIA attributes
  const alertId = `alert-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <AlertContainer
      $variant={variant}
      $dismissible={dismissible}
      role={getRole()}
      aria-live={variant === 'danger' ? 'assertive' : 'polite'}
      id={alertId}
      {...rest}
    >
      {showIcon && (
        <AlertIcon className="alert-icon">
          <Icon name={getIcon()} size="medium" aria-hidden="true" />
        </AlertIcon>
      )}
      
      <AlertContent>
        {title && (
          <AlertTitle>{title}</AlertTitle>
        )}
        <AlertMessage>{children}</AlertMessage>
      </AlertContent>
      
      {dismissible && (
        <CloseButton
          onClick={handleDismiss}
          aria-label="Close alert"
          aria-controls={alertId}
        >
          <Icon name="fas fa-times" size="small" aria-hidden="true" />
        </CloseButton>
      )}
    </AlertContainer>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['success', 'danger', 'warning', 'info', 'primary']),
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  showIcon: PropTypes.bool,
  autoHideDuration: PropTypes.number,
};

export default Alert;
