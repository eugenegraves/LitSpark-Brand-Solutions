/**
 * Responsive Grid System
 * 
 * This file implements a responsive grid system using styled-components.
 * It follows a mobile-first approach and adheres to WCAG 2.1 accessibility standards.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from './breakpoints';

// Container component - centers content and provides max-width
const StyledContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;

  ${breakpoints.sm} {
    max-width: 540px;
  }

  ${breakpoints.md} {
    max-width: 720px;
  }

  ${breakpoints.lg} {
    max-width: 960px;
  }

  ${breakpoints.xl} {
    max-width: 1140px;
  }

  ${props => props.fluid && `
    max-width: 100%;
  `}
`;

export const Container = ({ children, fluid, ...rest }) => (
  <StyledContainer fluid={fluid} {...rest}>
    {children}
  </StyledContainer>
);

Container.propTypes = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
};

Container.defaultProps = {
  fluid: false,
};

// Row component - provides flexbox row
const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  box-sizing: border-box;

  ${props => props.noGutters && `
    margin-right: 0;
    margin-left: 0;
    
    > div {
      padding-right: 0;
      padding-left: 0;
    }
  `}
`;

export const Row = ({ children, noGutters, ...rest }) => (
  <StyledRow noGutters={noGutters} {...rest}>
    {children}
  </StyledRow>
);

Row.propTypes = {
  children: PropTypes.node,
  noGutters: PropTypes.bool,
};

Row.defaultProps = {
  noGutters: false,
};

// Helper function to generate column width styles
const getColumnWidth = (span) => {
  if (!span) return '';
  
  const width = (span / 12) * 100;
  return `
    flex: 0 0 ${width}%;
    max-width: ${width}%;
  `;
};

// Column component - provides flexbox column with responsive widths
const StyledColumn = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;

  ${props => props.xs && getColumnWidth(props.xs)}

  ${props => props.sm && breakpoints.sm} {
    ${props => props.sm && getColumnWidth(props.sm)}
  }

  ${props => props.md && breakpoints.md} {
    ${props => props.md && getColumnWidth(props.md)}
  }

  ${props => props.lg && breakpoints.lg} {
    ${props => props.lg && getColumnWidth(props.lg)}
  }

  ${props => props.xl && breakpoints.xl} {
    ${props => props.xl && getColumnWidth(props.xl)}
  }

  ${props => props.offset && `
    margin-left: ${(props.offset / 12) * 100}%;
  `}
`;

export const Column = ({ children, xs, sm, md, lg, xl, offset, ...rest }) => (
  <StyledColumn 
    xs={xs} 
    sm={sm} 
    md={md} 
    lg={lg} 
    xl={xl} 
    offset={offset} 
    {...rest}
  >
    {children}
  </StyledColumn>
);

Column.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  offset: PropTypes.number,
};

export default {
  Container,
  Row,
  Column,
};
