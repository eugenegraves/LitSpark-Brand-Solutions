import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  FormHelperText,
  MenuItem,
  useTheme
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

/**
 * ContactPage Component
 * 
 * Contact page for LitSpark Brand Solutions
 * Implements accessible form design with proper labels, error states, and focus management
 */
const ContactPage = () => {
  const theme = useTheme();

  // Service options for the dropdown
  const serviceOptions = [
    { value: '', label: 'Select a service' },
    { value: 'brand-strategy', label: 'Brand Strategy' },
    { value: 'visual-identity', label: 'Visual Identity' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'brand-collateral', label: 'Brand Collateral' },
    { value: 'brand-management', label: 'Brand Management' },
    { value: 'other', label: 'Other' }
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <LocationOnIcon fontSize="large" />,
      title: 'Visit Us',
      details: [
        '123 Brand Street',
        'Creative District',
        'New York, NY 10001'
      ]
    },
    {
      icon: <PhoneIcon fontSize="large" />,
      title: 'Call Us',
      details: [
        '(212) 555-1234',
        'Monday-Friday: 9am-6pm',
        'Saturday: 10am-2pm'
      ]
    },
    {
      icon: <EmailIcon fontSize="large" />,
      title: 'Email Us',
      details: [
        'info@litspark.com',
        'support@litspark.com',
        'careers@litspark.com'
      ]
    }
  ];

  // Form submission handler (placeholder)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
  };

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
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            paragraph
            sx={{ maxWidth: '800px' }}
          >
            Have a question or ready to start your branding journey? Reach out to our team.
          </Typography>
        </Container>
      </Box>

      {/* Contact Form and Info Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Typography component="h2" variant="h4" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              Fill out the form below and one of our branding specialists will contact you within 24 hours.
            </Typography>
            
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      autoComplete="given-name"
                      aria-describedby="first-name-helper-text"
                      InputProps={{
                        sx: {
                          '&:focus-visible': {
                            outline: '2px solid #F2BF0F',
                            outlineOffset: '2px',
                          }
                        }
                      }}
                    />
                    <FormHelperText id="first-name-helper-text">
                      Enter your first name
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      autoComplete="family-name"
                      aria-describedby="last-name-helper-text"
                    />
                    <FormHelperText id="last-name-helper-text">
                      Enter your last name
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      autoComplete="email"
                      aria-describedby="email-helper-text"
                    />
                    <FormHelperText id="email-helper-text">
                      We'll never share your email with anyone else
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      autoComplete="tel"
                      aria-describedby="phone-helper-text"
                    />
                    <FormHelperText id="phone-helper-text">
                      Optional, but helpful for quick follow-ups
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="company"
                      name="company"
                      label="Company Name"
                      autoComplete="organization"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        select
                        id="service"
                        name="service"
                        label="Service of Interest"
                        aria-describedby="service-helper-text"
                      >
                        {serviceOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <FormHelperText id="service-helper-text">
                        Select the service you're most interested in
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="message"
                      name="message"
                      label="Your Message"
                      multiline
                      rows={4}
                      aria-describedby="message-helper-text"
                    />
                    <FormHelperText id="message-helper-text">
                      Tell us about your project or inquiry
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ 
                        mt: 2,
                        fontWeight: 'bold',
                        '&:focus-visible': {
                          outline: '2px solid #F2BF0F',
                          outlineOffset: '2px',
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Typography component="h2" variant="h4" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              You can also reach out to us directly using the information below.
            </Typography>
            
            <Grid container spacing={3}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} key={index}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box 
                        sx={{ 
                          color: 'primary.main',
                          mr: 2,
                          mt: 0.5
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography component="h3" variant="h6" gutterBottom>
                          {info.title}
                        </Typography>
                        {info.details.map((detail, i) => (
                          <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                            {detail}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            {/* Map Placeholder */}
            <Box
              sx={{
                mt: 4,
                height: '250px',
                bgcolor: 'rgba(242, 191, 15, 0.1)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${theme.palette.divider}`,
              }}
              role="img"
              aria-label="Map showing LitSpark Brand Solutions office location"
            >
              <Typography variant="body1" color="text.secondary">
                [Interactive Map]
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6 }}>
            Find quick answers to common questions about our services.
          </Typography>
          
          <Grid container spacing={4}>
            {[
              { 
                question: 'How long does a typical branding project take?', 
                answer: 'The timeline varies depending on the scope and complexity of the project. A brand strategy project typically takes 4-6 weeks, while a complete brand identity development can take 8-12 weeks. We\'ll provide a detailed timeline during our initial consultation.' 
              },
              { 
                question: 'What is your pricing structure?', 
                answer: 'We offer customized solutions based on your specific needs and goals. Our pricing is project-based rather than hourly, giving you cost certainty. We provide detailed proposals after understanding your requirements during the initial consultation.' 
              },
              { 
                question: 'Do you work with startups and small businesses?', 
                answer: 'Absolutely! We have packages designed specifically for startups and small businesses that provide essential branding elements within a more accessible budget. We believe every business deserves strong branding, regardless of size.' 
              },
              { 
                question: 'What makes LitSpark different from other branding agencies?', 
                answer: 'Our strategic approach combines data-driven insights with creative excellence. We focus on creating brands that not only look great but also drive business results. Our team brings diverse expertise across industries, and we pride ourselves on building long-term partnerships with our clients.' 
              }
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    borderRadius: 2 
                  }}
                >
                  <Typography component="h3" variant="h6" gutterBottom color="primary.main">
                    {faq.question}
                  </Typography>
                  <Typography variant="body2">
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ContactPage;
