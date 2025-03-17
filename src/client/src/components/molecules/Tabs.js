/**
 * Tabs Component
 * 
 * A reusable tabs component that follows WCAG 2.1 accessibility standards.
 * Features proper keyboard navigation, ARIA attributes, and focus management.
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';

const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid #DEE2E6;
  position: relative;
  
  @media ${breakpoints.down('sm')} {
    flex-direction: column;
    border-bottom: none;
  }
`;

const TabButton = styled.button`
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.$active ? '#F2BF0F' : '#495057'};
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: #F2BF0F;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
    z-index: 1;
  }
  
  ${props => props.$active && `
    border-bottom-color: #F2BF0F;
  `}
  
  @media ${breakpoints.down('sm')} {
    border: 1px solid #DEE2E6;
    border-bottom: ${props => props.$active ? '1px solid #F2BF0F' : '1px solid #DEE2E6'};
    border-radius: 4px;
    margin-bottom: 0.5rem;
    
    ${props => props.$active && `
      background-color: rgba(242, 191, 15, 0.1);
    `}
  }
`;

const TabContent = styled.div`
  padding: 1.5rem 0;
  display: ${props => props.$active ? 'block' : 'none'};
`;

/**
 * Tabs Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with label and content
 * @param {number} props.defaultTab - Index of default active tab
 * @param {function} props.onChange - Callback when tab changes
 */
const Tabs = ({
  tabs,
  defaultTab = 0,
  onChange,
  ...rest
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const tabRefs = useRef([]);
  
  // Generate unique IDs for ARIA attributes
  const tabsId = `tabs-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    let newIndex;
    
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    // Prevent default behavior
    e.preventDefault();
    
    // Change tab and focus
    handleTabChange(newIndex);
    
    // Focus on the new tab button after state update
    setTimeout(() => {
      tabRefs.current[newIndex]?.focus();
    }, 0);
  };
  
  // Initialize refs array
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);
  
  return (
    <TabsContainer {...rest}>
      <TabList role="tablist" aria-label={`tabs-${tabsId}`}>
        {tabs.map((tab, index) => (
          <TabButton
            key={`tab-${index}`}
            id={`tab-${tabsId}-${index}`}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${tabsId}-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            $active={activeTab === index}
            onClick={() => handleTabChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (tabRefs.current[index] = el)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      
      {tabs.map((tab, index) => (
        <TabContent
          key={`tabpanel-${index}`}
          id={`tabpanel-${tabsId}-${index}`}
          role="tabpanel"
          aria-labelledby={`tab-${tabsId}-${index}`}
          tabIndex={0}
          $active={activeTab === index}
          hidden={activeTab !== index}
        >
          {tab.content}
        </TabContent>
      ))}
    </TabsContainer>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultTab: PropTypes.number,
  onChange: PropTypes.func,
};

export default Tabs;
