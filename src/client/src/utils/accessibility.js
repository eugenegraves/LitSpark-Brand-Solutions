/**
 * Accessibility Utilities
 * 
 * Utility functions for accessibility testing and implementation
 */

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color code (with or without #)
 * @returns {Object} RGB color object with r, g, b properties
 */
export const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
};

/**
 * Calculate relative luminance for WCAG contrast calculations
 * @param {Object} rgb - RGB color object with r, g, b properties
 * @returns {number} Relative luminance value
 */
export const getLuminance = (rgb) => {
  // Convert RGB values to sRGB
  const sRGB = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255
  };
  
  // Calculate luminance
  const values = Object.values(sRGB).map(val => {
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
};

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color in hex format
 * @param {string} color2 - Second color in hex format
 * @returns {number} Contrast ratio (higher is better)
 */
export const getContrastRatio = (color1, color2) => {
  const luminance1 = getLuminance(hexToRgb(color1));
  const luminance2 = getLuminance(hexToRgb(color2));
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if a color combination meets WCAG contrast requirements
 * @param {string} foreground - Foreground color in hex format
 * @param {string} background - Background color in hex format
 * @param {string} level - WCAG level to check ('AA' or 'AAA')
 * @param {string} textSize - Text size ('normal' or 'large')
 * @returns {boolean} Whether the combination meets the requirements
 */
export const meetsContrastRequirements = (foreground, background, level = 'AA', textSize = 'normal') => {
  const ratio = getContrastRatio(foreground, background);
  
  // WCAG 2.1 contrast requirements
  const requirements = {
    AA: {
      normal: 4.5,
      large: 3.0
    },
    AAA: {
      normal: 7.0,
      large: 4.5
    }
  };
  
  return ratio >= requirements[level][textSize];
};

/**
 * Get the contrast level that a color combination meets
 * @param {string} foreground - Foreground color in hex format
 * @param {string} background - Background color in hex format
 * @returns {Object} Object with AA and AAA compliance for normal and large text
 */
export const getContrastCompliance = (foreground, background) => {
  const ratio = getContrastRatio(foreground, background);
  
  return {
    ratio,
    AA: {
      normal: ratio >= 4.5,
      large: ratio >= 3.0
    },
    AAA: {
      normal: ratio >= 7.0,
      large: ratio >= 4.5
    }
  };
};
