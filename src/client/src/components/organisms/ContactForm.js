/**
 * ContactForm Component
 * 
 * An accessible contact form that follows WCAG 2.1 accessibility standards.
 * Features proper form validation, error handling, and keyboard navigation.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import { breakpoints } from '../../styles/breakpoints';

const StyledForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  
  ${breakpoints.md} {
    flex-direction: row;
  }
`;

const FormColumn = styled.div`
  flex: 1;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const FormFeedback = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  background-color: ${props => props.isError ? '#f8d7da' : '#d4edda'};
  color: ${props => props.isError ? '#721c24' : '#155724'};
  border: 1px solid ${props => props.isError ? '#f5c6cb' : '#c3e6cb'};
`;

const ContactForm = ({ onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState({
    message: '',
    isError: false,
    visible: false,
  });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    // Validate phone (optional, but must be valid if provided)
    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[-()\s]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setFormFeedback({
        message: 'Please fix the errors in the form.',
        isError: true,
        visible: true,
      });
      
      // Focus the first field with an error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(`field-${firstErrorField}`).focus();
      }
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call the onSubmit prop with form data
      await onSubmit(formData);
      
      // Show success message
      setFormFeedback({
        message: 'Your message has been sent successfully!',
        isError: false,
        visible: true,
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      // Show error message
      setFormFeedback({
        message: 'There was an error sending your message. Please try again.',
        isError: true,
        visible: true,
      });
    } finally {
      setIsSubmitting(false);
      
      // Scroll to top of form to show feedback
      window.scrollTo({
        top: document.getElementById('contact-form').offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };
  
  return (
    <StyledForm id="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="form-title">
      <FormHeader>
        <Typography variant="h2" id="form-title" align="center">Contact Us</Typography>
        <Typography variant="body1" align="center">
          Fill out the form below and we'll get back to you as soon as possible.
        </Typography>
      </FormHeader>
      
      {formFeedback.visible && (
        <FormFeedback 
          isError={formFeedback.isError}
          role="alert"
          aria-live="polite"
        >
          {formFeedback.message}
        </FormFeedback>
      )}
      
      <FormRow>
        <FormColumn>
          <FormField
            id="field-firstName"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            errorText={errors.firstName}
            required
          />
        </FormColumn>
        <FormColumn>
          <FormField
            id="field-lastName"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            errorText={errors.lastName}
          />
        </FormColumn>
      </FormRow>
      
      <FormField
        id="field-email"
        name="email"
        type="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        errorText={errors.email}
        required
      />
      
      <FormField
        id="field-phone"
        name="phone"
        type="tel"
        label="Phone Number (optional)"
        value={formData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        errorText={errors.phone}
        helperText="Format: +1 (123) 456-7890"
      />
      
      <FormField
        id="field-message"
        name="message"
        label="Message"
        value={formData.message}
        onChange={handleChange}
        error={!!errors.message}
        errorText={errors.message}
        required
        multiline
        rows={5}
      />
      
      <SubmitContainer>
        <Button 
          type="submit" 
          variant="primary"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </SubmitContainer>
    </StyledForm>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
