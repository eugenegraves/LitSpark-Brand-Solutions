/**
 * Breakpoints for Responsive Design
 * 
 * This file defines the breakpoints used throughout the application
 * following a mobile-first approach with min-width media queries.
 * 
 * Follows WCAG 2.1 best practices for responsive design.
 */

// Breakpoint values in pixels
export const breakpointValues = {
  xs: 0,    // Extra small devices (portrait phones)
  sm: 576,  // Small devices (landscape phones)
  md: 768,  // Medium devices (tablets)
  lg: 992,  // Large devices (desktops)
  xl: 1200, // Extra large devices (large desktops)
};

// Media query strings for use with styled-components
export const breakpoints = {
  xs: `@media (min-width: ${breakpointValues.xs}px)`,
  sm: `@media (min-width: ${breakpointValues.sm}px)`,
  md: `@media (min-width: ${breakpointValues.md}px)`,
  lg: `@media (min-width: ${breakpointValues.lg}px)`,
  xl: `@media (min-width: ${breakpointValues.xl}px)`,
};

// Helper function to create a media query
export const mediaQuery = (breakpoint) => {
  if (!breakpointValues[breakpoint]) {
    console.warn(`Breakpoint "${breakpoint}" does not exist.`);
    return '';
  }
  return `@media (min-width: ${breakpointValues[breakpoint]}px)`;
};

// Helper function to check if the current viewport is at least a certain breakpoint
export const isMinWidth = (breakpoint) => {
  if (typeof window === 'undefined' || !breakpointValues[breakpoint]) {
    return false;
  }
  return window.innerWidth >= breakpointValues[breakpoint];
};

export default breakpoints;
