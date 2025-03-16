import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

/**
 * NotFoundPage Component
 * 
 * 404 page for LitSpark Brand Solutions
 * Implements accessible design with clear navigation options
 */
const NotFoundPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          color="primary.main"
          sx={{ 
            fontSize: { xs: '6rem', md: '8rem' },
            fontWeight: 700,
            mb: 2,
          }}
          aria-live="polite"
        >
          404
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ 
            mb: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Please check the URL or navigate back to the homepage.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/"
          startIcon={<HomeIcon />}
          sx={{ 
            fontWeight: 'bold',
            '&:focus-visible': {
              outline: '2px solid #F2BF0F',
              outlineOffset: '2px',
            }
          }}
        >
          Back to Homepage
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
