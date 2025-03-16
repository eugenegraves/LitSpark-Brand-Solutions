import React from 'react';
import { styled } from '@mui/material/styles';

/**
 * SkipLink Component
 * 
 * Provides keyboard users a way to skip navigation and go directly to main content
 * Implements accessibility focus management with visible focus indicators
 * Uses the gold color (#F2BF0F) for focus states as per accessibility guidelines
 */
const StyledSkipLink = styled('a')(({ theme }) => ({
  position: 'absolute',
  top: '-40px', // Hidden by default
  left: '0',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  padding: theme.spacing(1, 2),
  zIndex: theme.zIndex.tooltip + 1,
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'top 0.2s ease-in-out',
  '&:focus': {
    top: '0', // Becomes visible on focus
    outline: `2px solid #F2BF0F`,
    outlineOffset: '2px',
  },
}));

const SkipLink = () => {
  return (
    <StyledSkipLink href="#main-content">
      Skip to main content
    </StyledSkipLink>
  );
};

export default SkipLink;
