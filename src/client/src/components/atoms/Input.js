/**
 * Input Component
 * 
 * A reusable input component that follows WCAG 2.1 accessibility standards.
 * Features high contrast, visible focus states, and proper labeling.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Input variants
const variants = {
  outlined: css`
    border: 2px solid #ADB5BD;
    background-color: transparent;
    
    &:hover {
      border-color: #6C757D;
    }
    
    &:focus {
      border-color: #F2BF0F;
      box-shadow: 0 0 0 3px rgba(242, 191, 15, 0.25);
    }
  `,
  filled: css`
    border: 1px solid transparent;
    border-bottom: 2px solid #ADB5BD;
    background-color: #E9ECEF;
    
    &:hover {
      background-color: #DEE2E6;
    }
    
    &:focus {
      background-color: #E9ECEF;
      border-bottom-color: #F2BF0F;
      box-shadow: 0 0 0 3px rgba(242, 191, 15, 0.25);
    }
  `,
};

// Input sizes
const sizes = {
  small: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    height: 38px;
  `,
  medium: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    height: 44px;
  `,
  large: css`
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
    height: 50px;
  `,
};

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #212529;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  transition: all 0.2s ease-in-out;
  
  /* Apply variant styles */
  ${props => variants[props.variant]}
  
  /* Apply size styles */
  ${props => sizes[props.size]}
  
  /* Error state */
  ${props => props.error && css`
    border-color: #dc3545;
    
    &:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
    }
  `}
  
  /* Disabled state */
  ${props => props.disabled && css`
    background-color: #E9ECEF;
    opacity: 0.65;
    cursor: not-allowed;
  `}
  
  /* Focus visible state - accessible focus management */
  &:focus-visible {
    outline: none;
    border-color: #F2BF0F;
    box-shadow: 0 0 0 3px rgba(242, 191, 15, 0.25);
  }
`;

const StyledHelperText = styled.div`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${props => props.error ? '#dc3545' : '#6C757D'};
`;

const Input = ({
  id,
  name,
  type,
  label,
  value,
  placeholder,
  helperText,
  error,
  disabled,
  required,
  variant,
  size,
  onChange,
  onBlur,
  onFocus,
  ...rest
}) => {
  // Generate a unique ID if none is provided
  const inputId = id || `input-${name}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <StyledInputWrapper>
      {label && (
        <StyledLabel htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </StyledLabel>
      )}
      <StyledInput
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={helperText ? `${inputId}-helper-text` : undefined}
        variant={variant}
        size={size}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
      />
      {helperText && (
        <StyledHelperText 
          id={`${inputId}-helper-text`}
          error={error}
        >
          {helperText}
        </StyledHelperText>
      )}
    </StyledInputWrapper>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local'
  ]),
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  variant: PropTypes.oneOf(['outlined', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  variant: 'outlined',
  size: 'medium',
  error: false,
  disabled: false,
  required: false,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

export default Input;
