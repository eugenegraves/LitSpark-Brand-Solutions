/**
 * Typography Component
 * 
 * A reusable typography component that follows WCAG 2.1 accessibility standards.
 * Features responsive font sizes, proper contrast ratios, and semantic HTML.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { breakpoints } from '../../styles/breakpoints';

// Typography variants
const variants = {
  h1: css`
    font-size: 2rem; /* 32px at base size */
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    
    ${breakpoints.md} {
      font-size: 2.5rem; /* 40px at medium screens */
    }
    
    ${breakpoints.lg} {
      font-size: 3rem; /* 48px at large screens */
    }
  `,
  h2: css`
    font-size: 1.75rem; /* 28px at base size */
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.875rem;
    
    ${breakpoints.md} {
      font-size: 2rem; /* 32px at medium screens */
    }
    
    ${breakpoints.lg} {
      font-size: 2.25rem; /* 36px at large screens */
    }
  `,
  h3: css`
    font-size: 1.5rem; /* 24px at base size */
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.75rem;
    
    ${breakpoints.md} {
      font-size: 1.75rem; /* 28px at medium screens */
    }
  `,
  h4: css`
    font-size: 1.25rem; /* 20px at base size */
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.625rem;
    
    ${breakpoints.md} {
      font-size: 1.5rem; /* 24px at medium screens */
    }
  `,
  h5: css`
    font-size: 1.125rem; /* 18px at base size */
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  `,
  h6: css`
    font-size: 1rem; /* 16px at base size */
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  `,
  body1: css`
    font-size: 1rem; /* 16px */
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 1rem;
  `,
  body2: css`
    font-size: 0.875rem; /* 14px */
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 0.875rem;
  `,
  caption: css`
    font-size: 0.75rem; /* 12px */
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  `,
  button: css`
    font-size: 1rem; /* 16px */
    font-weight: 600;
    line-height: 1.5;
    text-transform: none;
  `,
};

// Color variants that meet WCAG 2.1 contrast requirements
const colorVariants = {
  primary: css`color: #212529;`, /* Dark Gray - high contrast on light backgrounds */
  secondary: css`color: #495057;`, /* Medium Gray - good contrast on light backgrounds */
  light: css`color: #F8F9FA;`, /* Light Gray - high contrast on dark backgrounds */
  gold: css`color: #F2BF0F;`, /* Gold - meets WCAG AA for large text on dark backgrounds */
  error: css`color: #dc3545;`, /* Red - accessible error color */
  success: css`color: #28a745;`, /* Green - accessible success color */
};

// Typography alignment
const alignments = {
  left: css`text-align: left;`,
  center: css`text-align: center;`,
  right: css`text-align: right;`,
  justify: css`text-align: justify;`,
};

const StyledTypography = styled.div`
  /* Apply variant styles */
  ${props => variants[props.$variant]}
  
  /* Apply color styles */
  ${props => colorVariants[props.$color]}
  
  /* Apply alignment */
  ${props => alignments[props.$align]}
  
  /* Apply gutterBottom */
  ${props => !props.$gutterBottom && css`
    margin-bottom: 0;
  `}
  
  /* Apply custom styles */
  ${props => props.$noWrap && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

const Typography = ({
  children,
  variant = 'body1',
  color = 'primary',
  align = 'left',
  gutterBottom = true,
  noWrap = false,
  component,
  paragraph,
  ...rest
}) => {
  // Map variant to default HTML element if component is not specified
  const getComponent = () => {
    if (component) return component;
    
    const variantToComponent = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body1: 'p',
      body2: 'p',
      caption: 'span',
      button: 'span',
    };
    
    return variantToComponent[variant] || 'span';
  };
  
  // Create clean DOM props by removing custom props
  const domProps = { ...rest };
  
  // Convert boolean props to data attributes
  const dataProps = {
    'data-gutterbottom': gutterBottom ? 'true' : undefined,
    'data-nowrap': noWrap ? 'true' : undefined,
    'data-paragraph': (paragraph || variant === 'body1' || variant === 'body2') ? 'true' : undefined
  };
  
  return (
    <StyledTypography
      as={getComponent()}
      $variant={variant}
      $color={color}
      $align={align}
      $gutterBottom={gutterBottom}
      $noWrap={noWrap}
      {...dataProps}
      {...domProps}
    >
      {children}
    </StyledTypography>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
    'body1', 'body2', 'caption', 'button'
  ]),
  color: PropTypes.oneOf([
    'primary', 'secondary', 'light', 'gold', 'error', 'success'
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  gutterBottom: PropTypes.bool,
  noWrap: PropTypes.bool,
  component: PropTypes.elementType,
};

export default Typography;
