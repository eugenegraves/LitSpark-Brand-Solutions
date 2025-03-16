import React from 'react';
import { styled } from '@mui/material/styles';

// Styled component for the skip link with accessibility features
const StyledSkipLink = styled('a')(({ theme }) => ({
  position: 'absolute',
  top: '-40px',
  left: '0',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '8px 16px',
  zIndex: 1500,
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'top 0.3s',
  '&:focus': {
    top: '0',
    outline: `2px solid ${theme.palette.primary.dark}`,
    outlineOffset: '2px',
  },
}));

/**
 * SkipLink Component
 * 
 * Provides a keyboard-accessible way to skip navigation and go directly to main content.
 * This is an important accessibility feature for keyboard users.
 */
const SkipLink = () => {
  return (
    <StyledSkipLink href="#main-content">
      Skip to main content
    </StyledSkipLink>
  );
};

export default SkipLink;
