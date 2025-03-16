import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  useTheme
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * HomePage Component
 * 
 * Main landing page for LitSpark Brand Solutions
 * Implements accessible design with proper heading hierarchy and focus management
 */
const HomePage = () => {
  const theme = useTheme();

  // Featured services
  const services = [
    {
      id: 1,
      title: 'Brand Strategy',
      description: 'Develop a comprehensive brand strategy that positions your business for success in your target market.',
      image: '/assets/images/brand-strategy.jpg',
      alt: 'Team collaborating on brand strategy with sticky notes on a whiteboard',
      link: '/services/brand-strategy'
    },
    {
      id: 2,
      title: 'Visual Identity',
      description: 'Create a distinctive visual identity that communicates your brand values and resonates with your audience.',
      image: '/assets/images/visual-identity.jpg',
      alt: 'Designer working on logo design with color swatches',
      link: '/services/visual-identity'
    },
    {
      id: 3,
      title: 'Digital Marketing',
      description: 'Implement targeted digital marketing campaigns that increase brand awareness and drive customer engagement.',
      image: '/assets/images/digital-marketing.jpg',
      alt: 'Digital marketing dashboard showing analytics and campaign metrics',
      link: '/services/digital-marketing'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="primary.main"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Illuminate Your Brand's Potential
              </Typography>
              <Typography
                variant="h5"
                paragraph
                sx={{ mb: 4, color: 'secondary.contrastText' }}
              >
                Strategic branding solutions that spark recognition, trust, and growth for your business.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  href="/services"
                  sx={{ 
                    fontWeight: 'bold',
                    '&:focus-visible': {
                      outline: '2px solid #F2BF0F',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  Our Services
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/contact"
                  sx={{ 
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'rgba(242, 191, 15, 0.1)',
                    },
                    '&:focus-visible': {
                      outline: '2px solid #F2BF0F',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  Get in Touch
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Placeholder for hero image - in a real implementation, this would be an actual image */}
              <Box
                sx={{
                  height: { xs: '300px', md: '400px' },
                  bgcolor: 'rgba(242, 191, 15, 0.1)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                role="img"
                aria-label="Creative branding process illustration"
              >
                <Typography variant="h4" color="primary.main">
                  [Hero Image]
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item key={service.id} xs={12} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  {/* Placeholder for service image */}
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: 'rgba(242, 191, 15, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    role="img"
                    aria-label={service.alt}
                  >
                    <Typography variant="h6" color="primary.main">
                      [Image: {service.title}]
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {service.title}
                    </Typography>
                    <Typography>
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={Link}
                      href={service.link}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(242, 191, 15, 0.1)',
                        },
                        '&:focus-visible': {
                          outline: '2px solid #F2BF0F',
                          outlineOffset: '2px',
                        }
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              href="/services"
              sx={{ 
                '&:focus-visible': {
                  outline: '2px solid #F2BF0F',
                  outlineOffset: '2px',
                }
              }}
            >
              View All Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            gutterBottom
          >
            Ready to Transform Your Brand?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ mb: 4 }}
          >
            Let's collaborate to create a brand that stands out in the market and connects with your audience.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              href="/contact"
              sx={{ 
                fontWeight: 'bold',
                '&:focus-visible': {
                  outline: '2px solid #343A40',
                  outlineOffset: '2px',
                }
              }}
            >
              Schedule a Consultation
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
