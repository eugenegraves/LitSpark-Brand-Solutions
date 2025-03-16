import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Logo Component
 * 
 * Displays the LitSpark Brand Solutions logo with accessible text
 * Implements proper color contrast for accessibility
 * Uses semantic HTML and ARIA attributes where needed
 */
const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const LogoIcon = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  fontSize: '1.2rem',
}));

const Logo = ({ variant = 'h6', color = 'primary', ...props }) => {
  return (
    <LogoWrapper {...props}>
      <LogoIcon role="img" aria-label="LitSpark Brand Solutions Logo">
        LS
      </LogoIcon>
      <Typography 
        variant={variant} 
        color={color} 
        fontWeight="bold"
        sx={{ 
          display: { xs: 'none', sm: 'block' } 
        }}
      >
        LitSpark
      </Typography>
    </LogoWrapper>
  );
};

export default Logo;
