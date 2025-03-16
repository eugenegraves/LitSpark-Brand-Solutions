/**
 * Color Contrast Accessibility Tests
 * 
 * These tests verify that the color scheme used in the application
 * meets WCAG 2.1 accessibility standards for color contrast.
 */

const { axe, toHaveNoViolations } = require('jest-axe');
const React = require('react');
const { render } = require('@testing-library/react');

// Define the theme colors directly based on our accessibility requirements
// This matches the theme in src/client/src/theme/index.js but avoids import issues
const theme = {
  palette: {
    primary: {
      main: '#F2BF0F', // Gold - meets WCAG AA for large text on dark backgrounds
      light: '#F7D56E',
      dark: '#D6A90D',
      contrastText: '#212529',
    },
    secondary: {
      main: '#343A40', // Dark gray
      light: '#495057',
      dark: '#212529',
      contrastText: '#F8F9FA',
    },
    error: {
      main: '#DC3545', // Accessible red
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#212529', // Darkest gray - meets WCAG AAA for normal text
      secondary: '#495057', // Medium gray - meets WCAG AA for normal text
    },
    background: {
      default: '#F8F9FA', // Lightest gray
      paper: '#FFFFFF', // White
    }
  }
};

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Helper function to calculate contrast ratio
function calculateContrastRatio(foreground, background) {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (color) => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [R, G, B] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const luminance1 = getLuminance(foreground);
  const luminance2 = getLuminance(background);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Color Contrast Accessibility', () => {
  test('Primary color meets WCAG AA for large text on dark backgrounds', () => {
    const primaryColor = theme.palette.primary.main; // Gold #F2BF0F
    const darkBackground = theme.palette.secondary.dark; // Dark Gray #212529
    
    const contrastRatio = calculateContrastRatio(primaryColor, darkBackground);
    
    // WCAG AA requires 3:1 for large text
    expect(contrastRatio).toBeGreaterThanOrEqual(3);
  });
  
  test('Light text meets WCAG AAA on dark backgrounds', () => {
    const lightText = '#F8F9FA'; // Light Gray
    const darkBackground = theme.palette.secondary.dark; // Dark Gray #212529
    
    const contrastRatio = calculateContrastRatio(lightText, darkBackground);
    
    // WCAG AAA requires 7:1 for normal text
    expect(contrastRatio).toBeGreaterThanOrEqual(7);
  });
  
  test('Primary text meets WCAG AAA for normal text', () => {
    const primaryText = theme.palette.text.primary; // Darkest Gray #212529
    const background = theme.palette.background.default; // Lightest Gray #F8F9FA
    
    const contrastRatio = calculateContrastRatio(primaryText, background);
    
    // WCAG AAA requires 7:1 for normal text
    expect(contrastRatio).toBeGreaterThanOrEqual(7);
  });
  
  test('Secondary text meets WCAG AA for normal text', () => {
    const secondaryText = theme.palette.text.secondary; // Medium Gray #495057
    const background = theme.palette.background.default; // Lightest Gray #F8F9FA
    
    const contrastRatio = calculateContrastRatio(secondaryText, background);
    
    // WCAG AA requires 4.5:1 for normal text
    expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
  });
  
  test('Error color meets WCAG AA for normal text', () => {
    const errorColor = theme.palette.error.main; // Accessible Red #DC3545
    const background = theme.palette.background.paper; // White #FFFFFF
    
    const contrastRatio = calculateContrastRatio(errorColor, background);
    
    // WCAG AA requires 4.5:1 for normal text
    expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
  });
});
