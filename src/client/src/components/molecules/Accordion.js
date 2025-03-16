/**
 * Accordion Component
 * 
 * A reusable accordion component that follows WCAG 2.1 accessibility standards.
 * Features proper keyboard navigation, ARIA attributes, and focus management.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../atoms/Icon';

const AccordionContainer = styled.div`
  border: 1px solid #DEE2E6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: #FFFFFF;
`;

const AccordionHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background-color: #F8F9FA;
  border: none;
  text-align: left;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  color: #212529; /* Dark Gray - ensures 16:1 contrast ratio */
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #E9ECEF;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F; /* Gold focus ring */
    outline-offset: 2px;
    background-color: #E9ECEF;
  }
`;

const AccordionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  
  ${({ $expanded }) => $expanded && `
    transform: rotate(180deg);
  `}
`;

const AccordionContent = styled.div`
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  
  ${({ $expanded }) => $expanded && `
    padding: 1rem;
    max-height: 1000px; /* Arbitrary large value */
  `}
`;

/**
 * Accordion Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Accordion header title
 * @param {node} props.children - Accordion content
 * @param {boolean} props.defaultExpanded - Whether accordion is expanded by default
 * @param {function} props.onChange - Callback when accordion state changes
 */
const Accordion = ({
  title,
  children,
  defaultExpanded = false,
  onChange,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const accordionId = `accordion-${Math.random().toString(36).substr(2, 9)}`;
  const contentId = `accordion-content-${accordionId}`;
  
  const handleToggle = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    if (onChange) {
      onChange(newExpandedState);
    }
  };
  
  return (
    <AccordionContainer {...rest}>
      <AccordionHeader
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={contentId}
        id={accordionId}
      >
        {title}
        <AccordionIcon $expanded={expanded}>
          <Icon 
            name="fas fa-chevron-down" 
            size="small" 
            color="secondary" 
            aria-hidden="true" 
          />
        </AccordionIcon>
      </AccordionHeader>
      <AccordionContent 
        $expanded={expanded}
        id={contentId}
        role="region"
        aria-labelledby={accordionId}
      >
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};

Accordion.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Accordion;
