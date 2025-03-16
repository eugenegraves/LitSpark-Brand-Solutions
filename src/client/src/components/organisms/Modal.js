/**
 * Modal Component
 * 
 * A reusable modal component that follows WCAG 2.1 accessibility standards.
 * Features proper focus management, keyboard navigation, and ARIA attributes.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: ${props => props.$size === 'small' ? '400px' : props.$size === 'large' ? '800px' : '600px'};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #DEE2E6;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #212529;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #6C757D;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  
  &:hover {
    background-color: #F8F9FA;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  color: #212529;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #DEE2E6;
`;

/**
 * Modal Component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - Callback when modal is closed
 * @param {string} props.title - Modal title
 * @param {node} props.children - Modal content
 * @param {node} props.footer - Modal footer content
 * @param {string} props.size - Modal size (small, medium, large)
 * @param {boolean} props.closeOnOverlayClick - Whether to close modal when overlay is clicked
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  ...rest
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  // Store the element that had focus before opening the modal
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
    }
  }, [isOpen]);
  
  // Focus the modal when it opens and restore focus when it closes
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Find the first focusable element in the modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        modalRef.current.focus();
      }
    } else if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);
  
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Trap focus within the modal
  useEffect(() => {
    const handleTabKey = (e) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // If shift+tab on first element, move to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } 
        // If tab on last element, move to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleTabKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);
  
  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Generate unique ID for ARIA attributes
  const modalId = `modal-${Math.random().toString(36).substr(2, 9)}`;
  
  if (!isOpen) return null;
  
  // Create portal to render modal at the end of the document body
  return createPortal(
    <ModalOverlay onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby={modalId}>
      <ModalContainer
        ref={modalRef}
        $size={size}
        role="document"
        tabIndex="-1"
        {...rest}
      >
        <ModalHeader>
          <ModalTitle id={modalId}>{title}</ModalTitle>
          <CloseButton
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="fas fa-times" size="small" color="secondary" aria-hidden="true" />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>{children}</ModalBody>
        
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  closeOnOverlayClick: PropTypes.bool,
};

export default Modal;
