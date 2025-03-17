/**
 * Breakpoints
 * 
 * Utility for managing responsive breakpoints in styled-components
 * Follows WCAG 2.1 best practices for responsive design
 */

// Breakpoint sizes in pixels
const sizes = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};

// Generate min-width media queries
const up = key => {
  return `@media (min-width: ${sizes[key]}px)`;
};

// Generate max-width media queries
const down = key => {
  const value = sizes[key];
  return `@media (max-width: ${value - 0.02}px)`;
};

// Generate media queries between min and max
const between = (start, end) => {
  return `@media (min-width: ${sizes[start]}px) and (max-width: ${sizes[end] - 0.02}px)`;
};

// Generate media queries for specific breakpoint only
const only = key => {
  const keys = Object.keys(sizes);
  const index = keys.indexOf(key);
  
  if (index === keys.length - 1) {
    return up(key);
  }
  
  return between(key, keys[index + 1]);
};

export const breakpoints = {
  up,
  down,
  between,
  only,
  sizes
};

export default breakpoints;
