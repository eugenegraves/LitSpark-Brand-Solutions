/**
 * Tooltip Component
 * 
 * A reusable tooltip component that follows WCAG 2.1 accessibility standards.
 * Provides additional context for UI elements in an accessible way.
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// Tooltip positions
const positions = {
  top: css`
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
  `,
  bottom: css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(8px);
  `,
  left: css`
    right: 100%;
    top: 50%;
    transform: translateX(-8px) translateY(-50%);
  `,
  right: css`
    left: 100%;
    top: 50%;
    transform: translateX(8px) translateY(-50%);
  `,
};

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
`;

const TooltipContent = styled.div`
  position: absolute;
  z-index: 1000;
  background-color: #343A40; /* Dark Gray */
  color: #F8F9FA; /* Light Gray - ensures 16:1 contrast ratio */
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-width: 250px;
  text-align: center;
  
  /* Apply position styles */
  ${({ position }) => positions[position]}
  
  /* Show tooltip when parent is focused or hovered */
  ${({ visible }) => visible && css`
    opacity: 1;
    visibility: visible;
  `}
`;

/**
 * Tooltip Component
 * 
 * @param {Object} props - Component props
 * @param {node} props.children - The element to attach the tooltip to
 * @param {string} props.content - Tooltip content
 * @param {string} props.position - Tooltip position
 * @param {boolean} props.showOnFocus - Whether to show tooltip on focus (for keyboard users)
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  showOnFocus = true,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const childRef = useRef(null);
  
  // Show tooltip on mouse enter or focus
  const handleShowTooltip = () => {
    setVisible(true);
  };
  
  // Hide tooltip on mouse leave or blur
  const handleHideTooltip = () => {
    setVisible(false);
  };
  
  // Clone the child element to add event handlers
  const childElement = React.Children.only(children);
  const enhancedChild = React.cloneElement(childElement, {
    ref: childRef,
    onMouseEnter: handleShowTooltip,
    onMouseLeave: handleHideTooltip,
    ...(showOnFocus && {
      onFocus: handleShowTooltip,
      onBlur: handleHideTooltip,
    }),
  });
  
  // Generate a unique ID for ARIA attributes
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <TooltipContainer {...rest}>
      {React.cloneElement(enhancedChild, {
        'aria-describedby': tooltipId,
      })}
      <TooltipContent
        id={tooltipId}
        position={position}
        visible={visible}
        role="tooltip"
      >
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
};

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  showOnFocus: PropTypes.bool,
};

export default Tooltip;
