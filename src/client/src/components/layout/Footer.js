import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/**
 * Footer Component
 * 
 * Implements an accessible footer with proper semantic structure
 * Includes keyboard navigation and proper ARIA attributes
 * Responsive design adapts to mobile, tablet, and desktop viewports
 */
const Footer = () => {
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
        { name: 'News', path: '/news' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Brand Strategy', path: '/services/brand-strategy' },
        { name: 'Visual Identity', path: '/services/visual-identity' },
        { name: 'Digital Marketing', path: '/services/digital-marketing' },
        { name: 'Web Development', path: '/services/web-development' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Support', path: '/support' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com/litspark' },
    { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com/litspark' },
    { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com/litspark' },
    { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://linkedin.com/company/litspark' }
  ];

  // Responsive spacing based on screen size
  const getResponsiveSpacing = () => {
    if (isMobile) return { pt: 4, pb: 2 };
    if (isTablet) return { pt: 5, pb: 2.5 };
    return { pt: 6, pb: 3 }; // Desktop default
  };

  // Responsive icon size based on screen size
  const getIconSize = () => {
    return isMobile ? '1.2rem' : '1.5rem';
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'secondary.main', 
        color: 'secondary.contrastText',
        ...getResponsiveSpacing(),
        // Responsive styles using media queries
        '@media (max-width: 600px)': {
          textAlign: 'center',
        },
        '@media (min-width: 601px) and (max-width: 960px)': {
          textAlign: 'left',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 2 : 4}>
          {/* Company info */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              color="primary.main" 
              gutterBottom
              sx={{
                fontSize: {
                  xs: '1.1rem', // Mobile
                  sm: '1.2rem', // Tablet
                  md: '1.25rem' // Desktop
                }
              }}
            >
              LitSpark Brand Solutions
            </Typography>
            <Typography variant="body2" paragraph>
              Illuminating brands with creative solutions that spark growth and recognition in the market.
            </Typography>
            <Box sx={{ 
              mt: 2,
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  aria-label={`Follow us on ${social.name}`}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'primary.main',
                    mr: 1,
                    fontSize: getIconSize(),
                    '&:hover': {
                      bgcolor: 'rgba(242, 191, 15, 0.1)',
                    },
                    '&:focus-visible': {
                      outline: '2px solid #F2BF0F',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          {/* Footer links - responsive grid layout */}
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={4} md={2.5} key={section.title}>
              <Typography 
                variant="h6" 
                color="primary.main" 
                gutterBottom
                sx={{
                  fontSize: {
                    xs: '1.1rem', // Mobile
                    sm: '1.2rem', // Tablet
                    md: '1.25rem' // Desktop
                  },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                {section.title}
              </Typography>
              <Box 
                component="ul" 
                sx={{ 
                  listStyle: 'none', 
                  p: 0, 
                  m: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', sm: 'flex-start' }
                }}
              >
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <MuiLink
                      component={Link}
                      href={link.path}
                      sx={{ 
                        color: 'secondary.contrastText',
                        textDecoration: 'none',
                        fontSize: {
                          xs: '0.875rem', // Mobile
                          sm: '0.875rem', // Tablet
                          md: '1rem' // Desktop
                        },
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        },
                        '&:focus-visible': {
                          outline: '2px solid #F2BF0F',
                          outlineOffset: '2px',
                        }
                      }}
                    >
                      {link.name}
                    </MuiLink>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
          
          {/* Contact information */}
          <Grid item xs={12} md={3}>
            <Typography 
              variant="h6" 
              color="primary.main" 
              gutterBottom
              sx={{
                fontSize: {
                  xs: '1.1rem', // Mobile
                  sm: '1.2rem', // Tablet
                  md: '1.25rem' // Desktop
                },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Contact Us
            </Typography>
            <Box 
              component="address" 
              sx={{ 
                fontStyle: 'normal',
                mb: 2,
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              <Typography variant="body2">123 Brand Avenue</Typography>
              <Typography variant="body2">Suite 456</Typography>
              <Typography variant="body2">San Francisco, CA 94103</Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 0.5,
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              <MuiLink 
                href="mailto:info@litspark.com"
                sx={{ 
                  color: 'secondary.contrastText',
                  '&:hover': {
                    color: 'primary.main',
                  },
                  '&:focus-visible': {
                    outline: '2px solid #F2BF0F',
                    outlineOffset: '2px',
                  }
                }}
              >
                info@litspark.com
              </MuiLink>
            </Typography>
            <Typography 
              variant="body2"
              sx={{ 
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              <MuiLink 
                href="tel:+14155551234"
                sx={{ 
                  color: 'secondary.contrastText',
                  '&:hover': {
                    color: 'primary.main',
                  },
                  '&:focus-visible': {
                    outline: '2px solid #F2BF0F',
                    outlineOffset: '2px',
                  }
                }}
              >
                (415) 555-1234
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        {/* Bottom footer section */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              mb: { xs: 1, sm: 0 },
              fontSize: '0.75rem'
            }}
          >
            &copy; {new Date().getFullYear()} LitSpark Brand Solutions. All rights reserved.
          </Typography>
          <Box 
            sx={{ 
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <MuiLink
              component={Link}
              href="/privacy"
              sx={{ 
                color: 'secondary.contrastText',
                fontSize: '0.75rem',
                '&:hover': {
                  color: 'primary.main',
                },
                '&:focus-visible': {
                  outline: '2px solid #F2BF0F',
                  outlineOffset: '2px',
                }
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              href="/terms"
              sx={{ 
                color: 'secondary.contrastText',
                fontSize: '0.75rem',
                '&:hover': {
                  color: 'primary.main',
                },
                '&:focus-visible': {
                  outline: '2px solid #F2BF0F',
                  outlineOffset: '2px',
                }
              }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              component={Link}
              href="/accessibility"
              sx={{ 
                color: 'secondary.contrastText',
                fontSize: '0.75rem',
                '&:hover': {
                  color: 'primary.main',
                },
                '&:focus-visible': {
                  outline: '2px solid #F2BF0F',
                  outlineOffset: '2px',
                }
              }}
            >
              Accessibility
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
