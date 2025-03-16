/**
 * FormField Component
 * 
 * A reusable form field component that follows WCAG 2.1 accessibility standards.
 * Combines input with label and validation for accessible forms.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../atoms/Input';

const StyledFormField = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const FormField = ({
  id,
  name,
  type,
  label,
  value,
  placeholder,
  helperText,
  error,
  errorText,
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
  const fieldId = id || `field-${name}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine the helper text to display (error message takes precedence)
  const displayHelperText = error && errorText ? errorText : helperText;
  
  return (
    <StyledFormField>
      <Input
        id={fieldId}
        name={name}
        type={type}
        label={label}
        value={value}
        placeholder={placeholder}
        helperText={displayHelperText}
        error={error}
        disabled={disabled}
        required={required}
        variant={variant}
        size={size}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
      />
    </StyledFormField>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'textarea'
  ]),
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  variant: PropTypes.oneOf(['outlined', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

FormField.defaultProps = {
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

export default FormField;
