/**
 * Breadcrumb Component
 * 
 * A reusable breadcrumb component that follows WCAG 2.1 accessibility standards.
 * Provides clear navigation path and location context for users.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';
import { breakpoints } from '../../theme/breakpoints';

const BreadcrumbContainer = styled.nav`
  margin: 1rem 0;
  
  @media ${breakpoints.down('sm')} {
    margin: 0.75rem 0;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  color: ${props => props.$active ? '#212529' : '#6C757D'};
  font-weight: ${props => props.$active ? '600' : '400'};
  
  &:not(:last-child) {
    margin-right: 0.5rem;
    
    &::after {
      content: '/';
      display: inline-block;
      margin-left: 0.5rem;
      color: #ADB5BD;
    }
  }
  
  @media ${breakpoints.down('sm')} {
    font-size: 0.875rem;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: #6C757D;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #F2BF0F;
    text-decoration: underline;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
    color: #F2BF0F;
  }
`;

const HomeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 0.25rem;
`;

/**
 * Breadcrumb Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of breadcrumb items with label and path
 * @param {boolean} props.showHomeIcon - Whether to show home icon for the first item
 */
const Breadcrumb = ({
  items,
  showHomeIcon = true,
  ...rest
}) => {
  // Generate unique ID for ARIA attributes
  const breadcrumbId = `breadcrumb-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <BreadcrumbContainer 
      aria-label="Breadcrumb" 
      aria-describedby={breadcrumbId}
      {...rest}
    >
      <span id={breadcrumbId} className="sr-only">
        You are here:
      </span>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <BreadcrumbItem key={`breadcrumb-${index}`} $active={isLast}>
              {isLast ? (
                // Current page (not a link)
                <span aria-current="page">
                  {item.label}
                </span>
              ) : (
                // Link to previous page
                <BreadcrumbLink to={item.path}>
                  {index === 0 && showHomeIcon && (
                    <HomeIcon>
                      <Icon name="fas fa-home" size="small" color="secondary" aria-hidden="true" />
                    </HomeIcon>
                  )}
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  showHomeIcon: PropTypes.bool,
};

export default Breadcrumb;
