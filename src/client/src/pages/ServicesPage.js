import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * ServicesPage Component
 * 
 * Services page for LitSpark Brand Solutions
 * Implements accessible design with proper heading hierarchy and semantic HTML
 */
const ServicesPage = () => {
  const theme = useTheme();

  // Services data
  const services = [
    {
      id: 1,
      title: 'Brand Strategy',
      description: 'Develop a comprehensive brand strategy that positions your business for success in your target market.',
      features: [
        'Brand Positioning & Messaging',
        'Market Research & Analysis',
        'Competitive Landscape Review',
        'Brand Architecture',
        'Brand Voice & Personality'
      ],
      link: '/services/brand-strategy'
    },
    {
      id: 2,
      title: 'Visual Identity',
      description: 'Create a distinctive visual identity that communicates your brand values and resonates with your audience.',
      features: [
        'Logo Design & Development',
        'Color Palette & Typography',
        'Brand Guidelines',
        'Visual Asset Creation',
        'Packaging Design'
      ],
      link: '/services/visual-identity'
    },
    {
      id: 3,
      title: 'Digital Marketing',
      description: 'Implement targeted digital marketing campaigns that increase brand awareness and drive customer engagement.',
      features: [
        'Social Media Strategy',
        'Content Marketing',
        'Email Marketing Campaigns',
        'SEO & SEM',
        'Analytics & Performance Tracking'
      ],
      link: '/services/digital-marketing'
    },
    {
      id: 4,
      title: 'Web Development',
      description: 'Build accessible, responsive websites that provide exceptional user experiences and support your business goals.',
      features: [
        'Website Design & Development',
        'E-commerce Solutions',
        'Content Management Systems',
        'Web Application Development',
        'Website Maintenance & Support'
      ],
      link: '/services/web-development'
    },
    {
      id: 5,
      title: 'Brand Collateral',
      description: 'Design professional brand collateral that reinforces your brand identity across all customer touchpoints.',
      features: [
        'Business Cards & Stationery',
        'Brochures & Sales Materials',
        'Presentation Templates',
        'Trade Show Materials',
        'Environmental Graphics'
      ],
      link: '/services/brand-collateral'
    },
    {
      id: 6,
      title: 'Brand Management',
      description: 'Ongoing brand management services to ensure consistency and evolution of your brand over time.',
      features: [
        'Brand Audit & Assessment',
        'Brand Refresh & Evolution',
        'Brand Training Workshops',
        'Brand Implementation Support',
        'Brand Performance Measurement'
      ],
      link: '/services/brand-management'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            color="primary.main"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h5"
            paragraph
            sx={{ maxWidth: '800px' }}
          >
            Comprehensive branding solutions tailored to your business needs and goals.
          </Typography>
        </Container>
      </Box>

      {/* Services Overview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography component="h2" variant="h3" gutterBottom sx={{ mb: 2 }}>
          How We Can Help
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 6, maxWidth: '800px' }}>
          At LitSpark Brand Solutions, we offer a full spectrum of branding services to help businesses establish, grow, and evolve their brand presence in the market. Our strategic approach ensures that every aspect of your brand works together to create a cohesive and impactful brand experience.
        </Typography>

        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} md={6} key={service.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography gutterBottom variant="h4" component="h3" color="primary.main">
                    {service.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {service.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List disablePadding>
                    {service.features.map((feature, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>
                          <CheckCircleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    component={RouterLink} 
                    to={service.link}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: 'secondary.main',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      '&:focus-visible': {
                        outline: '2px solid #F2BF0F',
                        outlineOffset: '2px',
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Process Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" gutterBottom>
            Our Process
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
            We follow a proven methodology to ensure your branding project is successful from start to finish.
          </Typography>

          <Grid container spacing={4}>
            {[
              { step: 'Discover', description: 'We begin by understanding your business, goals, audience, and market position through in-depth research and analysis.' },
              { step: 'Define', description: 'Based on our findings, we define your brand strategy, positioning, and key messaging to guide all creative decisions.' },
              { step: 'Design', description: 'Our creative team develops visual and verbal elements that bring your brand to life in a distinctive and memorable way.' },
              { step: 'Deliver', description: 'We implement your brand across all touchpoints with careful attention to detail and consistency.' },
              { step: 'Develop', description: 'We continue to monitor, measure, and evolve your brand to ensure long-term success and relevance.' }
            ].map((process, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.contrastText',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography component="h3" variant="h5" gutterBottom>
                    {process.step}
                  </Typography>
                  <Typography variant="body2">
                    {process.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
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
            Ready to Elevate Your Brand?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ mb: 4 }}
          >
            Let's discuss how our services can help you achieve your branding goals.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                fontWeight: 'bold',
                '&:focus-visible': {
                  outline: '2px solid #343A40',
                  outlineOffset: '2px',
                }
              }}
            >
              Get a Free Consultation
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ServicesPage;
