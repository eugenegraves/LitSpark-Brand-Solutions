/**
 * Home Page
 * 
 * This is the main landing page for LitSpark Brand Solutions.
 * It showcases the company's services and provides a call to action.
 */

import React from 'react';
import Head from 'next/head';
import { Container, Grid, Box } from '@mui/material';
import Typography from '../src/components/atoms/Typography';
import Button from '../src/components/atoms/Button';
import Card from '../src/components/molecules/Card';
import ServicesList from '../src/components/organisms/ServicesList';
import PageTemplate from '../src/components/templates/PageTemplate';

// Sample services data (would typically come from an API)
const services = [
  {
    id: 1,
    title: 'Brand Strategy',
    description: 'Develop a comprehensive brand strategy that aligns with your business goals.',
    icon: 'strategy',
  },
  {
    id: 2,
    title: 'Visual Identity',
    description: 'Create a distinctive visual identity that resonates with your target audience.',
    icon: 'design',
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description: 'Implement effective digital marketing campaigns to grow your brand presence.',
    icon: 'marketing',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>LitSpark Brand Solutions | Home</title>
        <meta name="description" content="Professional branding and marketing services for businesses of all sizes." />
      </Head>
      
      <PageTemplate>
        <Box component="section" sx={{ py: { xs: 6, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h1" gutterBottom>
                  Transform Your Brand with LitSpark Solutions
                </Typography>
                <Typography variant="body1" paragraph>
                  We help businesses create compelling brand identities and marketing strategies that drive growth and engagement.
                </Typography>
                <Button variant="contained" color="primary" size="large">
                  Get Started
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                  {/* Placeholder for hero image */}
                  <Box
                    sx={{
                      width: '100%',
                      height: 400,
                      bgcolor: 'grey.200',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body1">Hero Image</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        <Box component="section" sx={{ py: 8, bgcolor: 'grey.100' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom>
              Our Services
            </Typography>
            <Typography variant="body1" align="center" paragraph sx={{ mb: 6 }}>
              Comprehensive branding and marketing solutions tailored to your needs
            </Typography>
            
            <ServicesList services={services} />
            
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button variant="outlined" color="primary" size="large">
                View All Services
              </Button>
            </Box>
          </Container>
        </Box>
        
        <Box component="section" sx={{ py: 8 }}>
          <Container maxWidth="md">
            <Card
              title="Ready to elevate your brand?"
              content="Schedule a free consultation with our branding experts today."
              action={
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              }
              sx={{ p: 4, textAlign: 'center' }}
            />
          </Container>
        </Box>
      </PageTemplate>
    </>
  );
}
