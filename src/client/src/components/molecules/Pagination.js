/**
 * Pagination Component
 * 
 * A reusable pagination component that follows WCAG 2.1 accessibility standards.
 * Features proper keyboard navigation, ARIA attributes, and focus management.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '../atoms/Icon';
import { breakpoints } from '../../styles/breakpoints';

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  
  @media ${breakpoints.down('sm')} {
    margin: 1.5rem 0;
  }
`;

const PaginationList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  
  @media ${breakpoints.down('sm')} {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const pageItemStyles = css`
  margin: 0 0.25rem;
  
  @media ${breakpoints.down('sm')} {
    margin: 0.25rem;
  }
`;

const PageItem = styled.li`
  ${pageItemStyles}
`;

const PageLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.$active ? '#F2BF0F' : 'transparent'};
  color: ${props => props.$active ? '#212529' : '#495057'};
  border: 1px solid ${props => props.$active ? '#F2BF0F' : '#DEE2E6'};
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: ${props => props.$active ? 'default' : 'pointer'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$active ? '#F2BF0F' : '#F8F9FA'};
    border-color: ${props => props.$active ? '#F2BF0F' : '#ADB5BD'};
    color: ${props => props.$active ? '#212529' : '#343A40'};
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
    z-index: 1;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #F8F9FA;
    color: #ADB5BD;
    border-color: #DEE2E6;
  }
  
  @media ${breakpoints.down('sm')} {
    min-width: 2.25rem;
    height: 2.25rem;
    padding: 0.375rem;
    font-size: 0.875rem;
  }
`;

const EllipsisItem = styled.li`
  ${pageItemStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  color: #6C757D;
  
  @media ${breakpoints.down('sm')} {
    min-width: 2.25rem;
    height: 2.25rem;
  }
`;

/**
 * Pagination Component
 * 
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current active page (1-based)
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPageChange - Callback when page changes
 * @param {number} props.siblingCount - Number of siblings to show on each side of current page
 * @param {boolean} props.showFirstLast - Whether to show first/last page buttons
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  ...rest
}) => {
  // Generate page range to display
  const getPageRange = () => {
    // Always show first page, last page, current page, and siblingCount pages on each side
    const range = [];
    
    // Calculate range start and end
    let rangeStart = Math.max(1, currentPage - siblingCount);
    let rangeEnd = Math.min(totalPages, currentPage + siblingCount);
    
    // Adjust range to show at least 2*siblingCount+1 pages if possible
    if (rangeEnd - rangeStart + 1 < Math.min(totalPages, 2 * siblingCount + 1)) {
      if (currentPage < totalPages / 2) {
        rangeEnd = Math.min(totalPages, rangeStart + 2 * siblingCount);
      } else {
        rangeStart = Math.max(1, rangeEnd - 2 * siblingCount);
      }
    }
    
    // Add pages to range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }
    
    // Add ellipsis and edge pages
    const result = [];
    
    // Add first page and ellipsis if needed
    if (rangeStart > 1) {
      result.push(1);
      if (rangeStart > 2) {
        result.push('ellipsis-start');
      }
    }
    
    // Add range
    result.push(...range);
    
    // Add ellipsis and last page if needed
    if (rangeEnd < totalPages) {
      if (rangeEnd < totalPages - 1) {
        result.push('ellipsis-end');
      }
      result.push(totalPages);
    }
    
    return result;
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  // Generate unique ID for ARIA attributes
  const paginationId = `pagination-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <PaginationContainer 
      aria-label="Pagination" 
      aria-describedby={paginationId}
      {...rest}
    >
      <span id={paginationId} className="sr-only">
        Page {currentPage} of {totalPages}
      </span>
      <PaginationList>
        {/* Previous page button */}
        <PageItem>
          <PageLink
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <Icon name="fas fa-chevron-left" size="small" color="secondary" aria-hidden="true" />
          </PageLink>
        </PageItem>
        
        {/* First page button (optional) */}
        {showFirstLast && currentPage > siblingCount + 2 && (
          <PageItem>
            <PageLink
              onClick={() => handlePageChange(1)}
              aria-label="Go to first page"
            >
              <Icon name="fas fa-angle-double-left" size="small" color="secondary" aria-hidden="true" />
            </PageLink>
          </PageItem>
        )}
        
        {/* Page numbers */}
        {getPageRange().map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <EllipsisItem key={page} aria-hidden="true">
                &hellip;
              </EllipsisItem>
            );
          }
          
          return (
            <PageItem key={page}>
              <PageLink
                $active={page === currentPage}
                onClick={() => handlePageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </PageLink>
            </PageItem>
          );
        })}
        
        {/* Last page button (optional) */}
        {showFirstLast && currentPage < totalPages - siblingCount - 1 && (
          <PageItem>
            <PageLink
              onClick={() => handlePageChange(totalPages)}
              aria-label="Go to last page"
            >
              <Icon name="fas fa-angle-double-right" size="small" color="secondary" aria-hidden="true" />
            </PageLink>
          </PageItem>
        )}
        
        {/* Next page button */}
        <PageItem>
          <PageLink
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <Icon name="fas fa-chevron-right" size="small" color="secondary" aria-hidden="true" />
          </PageLink>
        </PageItem>
      </PaginationList>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
  showFirstLast: PropTypes.bool,
};

export default Pagination;
