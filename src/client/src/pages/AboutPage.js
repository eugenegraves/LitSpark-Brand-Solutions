import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  useTheme
} from '@mui/material';

/**
 * AboutPage Component
 * 
 * About page for LitSpark Brand Solutions
 * Implements accessible design with proper heading hierarchy and semantic HTML
 */
const AboutPage = () => {
  const theme = useTheme();

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Founder & Creative Director',
      bio: 'With over 15 years of experience in branding and design, Sarah leads our creative team with passion and vision.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Strategy Director',
      bio: 'Michael brings analytical expertise and market insights to develop effective brand strategies for our clients.'
    },
    {
      id: 3,
      name: 'Olivia Rodriguez',
      title: 'Digital Marketing Lead',
      bio: 'Olivia specializes in creating digital campaigns that amplify brand presence and drive measurable results.'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Web Development Manager',
      bio: 'David oversees our web development projects, ensuring accessible and high-performing digital experiences.'
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
            About LitSpark Brand Solutions
          </Typography>
          <Typography
            variant="h5"
            paragraph
            sx={{ maxWidth: '800px' }}
          >
            We're a team of passionate branding specialists dedicated to illuminating your brand's unique story and potential.
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            {/* Placeholder for about image */}
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
              aria-label="LitSpark team collaborating in a modern office space"
            >
              <Typography variant="h4" color="primary.main">
                [Team Image]
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="h2" variant="h3" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2018, LitSpark Brand Solutions began with a simple mission: to help businesses shine in their markets through strategic branding and creative solutions.
            </Typography>
            <Typography variant="body1" paragraph>
              What started as a small design studio has grown into a full-service branding agency, serving clients across industries and helping them establish memorable brand identities that resonate with their target audiences.
            </Typography>
            <Typography variant="body1">
              Today, we combine strategic thinking with creative execution to deliver branding solutions that not only look exceptional but also drive business growth and foster meaningful connections with customers.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Our Values Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {['Creativity', 'Strategy', 'Collaboration', 'Excellence'].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 2,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography component="h3" variant="h5" gutterBottom color="primary.main">
                    {value}
                  </Typography>
                  <Typography>
                    {index === 0 && "We approach every project with fresh ideas and innovative thinking to create unique brand experiences."}
                    {index === 1 && "We believe in purposeful design that aligns with business objectives and drives meaningful results."}
                    {index === 2 && "We work closely with our clients, valuing their input and building lasting partnerships."}
                    {index === 3 && "We are committed to delivering exceptional quality in everything we do, exceeding expectations."}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Team Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography component="h2" variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                {/* Placeholder for team member image */}
                <Box
                  sx={{
                    height: 200,
                    bgcolor: 'rgba(52, 58, 64, 0.1)',
                    borderRadius: 2,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  role="img"
                  aria-label={`Portrait of ${member.name}`}
                >
                  <Typography variant="body2" color="text.secondary">
                    [Photo: {member.name}]
                  </Typography>
                </Box>
                <Typography component="h3" variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary.main" gutterBottom>
                  {member.title}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {member.bio}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AboutPage;
