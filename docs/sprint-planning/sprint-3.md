# Sprint 3: Public Website Development

## Overview

**Duration**: 3 weeks (May 11 - May 31, 2025)

Sprint 3 focuses on developing all public-facing pages of the website, implementing content management functionality, creating the portfolio showcase, and developing contact and quote forms.

## Goals

1. Develop all public-facing pages
2. Implement content management functionality
3. Create portfolio showcase
4. Develop contact and quote forms

## Tasks

### Task 1: Homepage & Service Pages

**Description**: Implement the homepage and service pages with key sections based on the wireframes and design system.

**Subtasks**:
- Implement homepage with key sections
- Create service category pages
- Develop individual service detail pages
- Implement service pricing and package display

**Acceptance Criteria**:
- Responsive homepage with hero section, services overview, testimonials, and call-to-action
- Service category pages with filtering and sorting
- Individual service detail pages with comprehensive information
- Service pricing and package display with comparison features

**Accessibility Considerations**:
- Ensure all content has proper heading hierarchy
- Implement proper alt text for all images
- Ensure color contrast meets WCAG 2.1 AA standards with the gold (#F2BF0F) and gray color scheme
- Implement keyboard navigation for interactive elements

### Task 2: Portfolio System

**Description**: Create a portfolio showcase with filtering, gallery features, and detailed project pages.

**Subtasks**:
- Create portfolio gallery with filtering
- Implement portfolio detail pages
- Develop image optimization and gallery features
- Create portfolio tagging system

**Acceptance Criteria**:
- Portfolio gallery with category filtering
- Detailed portfolio project pages with image galleries
- Optimized images for performance
- Tagging system for portfolio categorization

**Accessibility Considerations**:
- Implement accessible gallery navigation
- Ensure all portfolio images have descriptive alt text
- Create keyboard-accessible filtering controls
- Implement proper focus management for modal galleries

### Task 3: Blog & Resources

**Description**: Implement the blog and resources section with listing pages, article templates, and download functionality.

**Subtasks**:
- Implement blog listing page
- Create blog article template
- Develop resource download system
- Implement search functionality

**Acceptance Criteria**:
- Blog listing page with pagination and filtering
- Blog article template with rich content support
- Resource download system with tracking
- Search functionality across blog and resources

**Accessibility Considerations**:
- Ensure blog content has proper semantic structure
- Implement accessible pagination controls
- Create accessible download links with clear purpose
- Ensure search functionality works with screen readers

### Task 4: Contact & Quote System

**Description**: Create contact forms, quote request system, and consultation scheduling with validation and email notifications.

**Subtasks**:
- Create contact form with validation
- Implement quote request system
- Develop consultation scheduling
- Create email notification workflows

**Acceptance Criteria**:
- Contact form with validation and spam protection
- Quote request system with service selection
- Consultation scheduling with availability calendar
- Email notification workflows for form submissions

**Accessibility Considerations**:
- Implement accessible form validation with clear error messages
- Ensure form fields have proper labels and instructions
- Create keyboard-accessible date picker for scheduling
- Implement focus management during form submission

## Deliverables

1. Complete public-facing website
2. Functional portfolio showcase
3. Blog and resource system
4. Contact and quote request functionality

## Technical Implementation Details

### Homepage Implementation

```jsx
// HomePage.js
import React from 'react';
import { Container, Grid } from '@mui/material';
import Hero from '../components/organisms/Hero';
import ServicesList from '../components/organisms/ServicesList';
import Testimonials from '../components/organisms/Testimonials';
import CtaSection from '../components/organisms/CtaSection';
import FeaturedPortfolio from '../components/organisms/FeaturedPortfolio';
import MainLayout from '../components/templates/MainLayout';

const featuredServices = [
  {
    id: '1',
    title: 'Brand Strategy',
    description: 'Develop a comprehensive brand strategy with color psychology implementation.',
    image: '/images/services/brand-strategy.jpg',
    imageAlt: 'Strategic brand planning session with color swatches and mood boards',
    path: '/services/brand-strategy',
  },
  // More services...
];

const HomePage = () => {
  return (
    <MainLayout>
      <Hero
        title="Transform Your Brand with Strategic Color Theory"
        subtitle="We create powerful brand identities using color psychology to connect with your audience and drive business results."
        ctaText="Get Started"
        ctaLink="/contact"
        secondaryCtaText="View Our Work"
        secondaryCtaLink="/portfolio"
        backgroundImage="/images/hero-background.jpg"
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <ServicesList 
              title="Our Services" 
              services={featuredServices} 
              showViewAll={true} 
            />
          </Grid>
          
          <Grid item xs={12}>
            <FeaturedPortfolio 
              title="Featured Work" 
              showViewAll={true} 
            />
          </Grid>
          
          <Grid item xs={12}>
            <Testimonials 
              title="Client Success Stories" 
            />
          </Grid>
        </Grid>
      </Container>
      
      <CtaSection
        title="Ready to Transform Your Brand?"
        description="Schedule a free consultation to discuss how we can help your business stand out with strategic color implementation."
        ctaText="Schedule Consultation"
        ctaLink="/contact"
      />
    </MainLayout>
  );
};

export default HomePage;
```

### Portfolio Gallery Implementation

```jsx
// PortfolioGallery.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import Typography from '../components/atoms/Typography';
import PortfolioFilter from '../components/molecules/PortfolioFilter';
import PortfolioCard from '../components/molecules/PortfolioCard';
import LoadingIndicator from '../components/atoms/LoadingIndicator';

const PortfolioGallery = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract unique categories from projects
    const uniqueCategories = [...new Set(projects.flatMap(project => project.categories))];
    setCategories(['all', ...uniqueCategories]);
  }, [projects]);

  useEffect(() => {
    setLoading(true);
    
    // Filter projects based on selected category
    const filtered = selectedCategory === 'all'
      ? projects
      : projects.filter(project => project.categories.includes(selectedCategory));
    
    // Simulate loading for better UX
    setTimeout(() => {
      setFilteredProjects(filtered);
      setLoading(false);
    }, 300);
  }, [selectedCategory, projects]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container maxWidth="lg">
      <Box mb={6}>
        <Typography variant="h1" gutterBottom>
          Our Portfolio
        </Typography>
        <Typography variant="body1">
          Explore our work showcasing strategic color implementation across various industries.
        </Typography>
      </Box>
      
      <PortfolioFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
        aria-label="Filter portfolio by category"
      />
      
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Grid container spacing={4} mt={4}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <PortfolioCard
                title={project.title}
                image={project.image}
                imageAlt={project.imageAlt}
                categories={project.categories}
                href={`/portfolio/${project.slug}`}
              />
            </Grid>
          ))}
        </Grid>
      )}
      
      {filteredProjects.length === 0 && !loading && (
        <Box textAlign="center" my={8}>
          <Typography variant="h3">No projects found</Typography>
          <Typography variant="body1">
            Try selecting a different category or check back later for new additions.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default PortfolioGallery;
```

### Contact Form Implementation

```jsx
// ContactForm.js
import React, { useState } from 'react';
import { Box, Grid, Button, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../molecules/FormField';
import Typography from '../atoms/Typography';
import Alert from '../molecules/Alert';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(
    /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    'Invalid phone number'
  ),
  company: Yup.string(),
  message: Yup.string().required('Message is required').min(10, 'Message is too short'),
  service: Yup.string(),
});

const ContactForm = ({ services = [] }) => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // API call to submit form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setSubmitStatus('success');
      resetForm();
      
      // Set focus to success message for screen readers
      setTimeout(() => {
        const successAlert = document.getElementById('contact-form-success');
        if (successAlert) {
          successAlert.focus();
        }
      }, 100);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Get in Touch
      </Typography>
      
      <Typography variant="body1" paragraph>
        Fill out the form below and we'll get back to you within 24 hours.
      </Typography>
      
      {submitStatus === 'success' && (
        <Alert 
          id="contact-form-success"
          severity="success" 
          tabIndex={-1}
          aria-live="polite"
        >
          Thank you for your message! We'll be in touch shortly.
        </Alert>
      )}
      
      {submitStatus === 'error' && (
        <Alert 
          severity="error"
          aria-live="assertive"
        >
          There was an error submitting your message. Please try again or contact us directly.
        </Alert>
      )}
      
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormField
                  id="name"
                  name="name"
                  label="Full Name"
                  required
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormField
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormField
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormField
                  id="company"
                  name="company"
                  label="Company"
                  error={touched.company && Boolean(errors.company)}
                  helperText={touched.company && errors.company}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormField
                  id="service"
                  name="service"
                  label="Service of Interest"
                  select
                  SelectProps={{
                    native: true,
                  }}
                  error={touched.service && Boolean(errors.service)}
                  helperText={touched.service && errors.service}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </FormField>
              </Grid>
              
              <Grid item xs={12}>
                <FormField
                  id="message"
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  required
                  error={touched.message && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isSubmitting ? 'Submitting...' : 'Send Message'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
```

## Accessibility Implementation

### Accessible Portfolio Filter

```jsx
// PortfolioFilter.js
import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

const PortfolioFilter = ({ categories, selectedCategory, onChange, ...props }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  // Format category names for display
  const formatCategoryName = (category) => {
    if (category === 'all') return 'All Projects';
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Box role="region" aria-label="Portfolio filters" {...props}>
      <StyledTabs
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Portfolio categories"
      >
        {categories.map((category) => (
          <StyledTab
            key={category}
            label={formatCategoryName(category)}
            value={category}
            id={`portfolio-tab-${category}`}
            aria-controls={`portfolio-tabpanel-${category}`}
          />
        ))}
      </StyledTabs>
    </Box>
  );
};

export default PortfolioFilter;
```

### Accessible Image Gallery

```jsx
// ImageGallery.js
import React, { useState } from 'react';
import { Box, Grid, Modal, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

const GalleryImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 0,
  paddingTop: '66.67%', // 3:2 Aspect ratio
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    '& .MuiBox-root': {
      opacity: 1,
    },
  },
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
    '& .MuiBox-root': {
      opacity: 1,
    },
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  color: theme.palette.common.white,
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '1000px',
  maxHeight: '90vh',
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2),
  outline: 'none',
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

const ImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      handleNext(e);
    } else if (e.key === 'ArrowLeft') {
      handlePrev(e);
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <GalleryImage
              tabIndex={0}
              onClick={() => handleOpen(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpen(index);
                }
              }}
              aria-label={`Open ${image.alt} in gallery viewer`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
              <ImageOverlay>
                <Typography variant="body2">View Larger</Typography>
              </ImageOverlay>
            </GalleryImage>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-gallery-title"
        aria-describedby="image-gallery-description"
      >
        <ModalContent
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
        >
          <Box textAlign="right" mb={1}>
            <IconButton
              onClick={handleClose}
              aria-label="Close gallery"
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box
            position="relative"
            height="70vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              layout="fill"
              objectFit="contain"
            />
            
            <NavigationButton
              onClick={handlePrev}
              aria-label="Previous image"
              sx={{ left: 16 }}
            >
              <ArrowBackIcon />
            </NavigationButton>
            
            <NavigationButton
              onClick={handleNext}
              aria-label="Next image"
              sx={{ right: 16 }}
            >
              <ArrowForwardIcon />
            </NavigationButton>
          </Box>
          
          <Box mt={2}>
            <Typography id="image-gallery-title" variant="h6">
              {images[currentIndex].title || 'Image Gallery'}
            </Typography>
            <Typography id="image-gallery-description" variant="body2">
              {images[currentIndex].description || `Image ${currentIndex + 1} of ${images.length}`}
            </Typography>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageGallery;
```

## Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Content management complexity | Medium | Medium | Implement intuitive admin interface and documentation |
| Performance issues with image-heavy portfolio | High | Medium | Implement image optimization and lazy loading |
| Form submission security vulnerabilities | High | Medium | Implement server-side validation and CSRF protection |
| Accessibility issues with complex UI components | High | Medium | Conduct regular accessibility audits and testing |

## Definition of Done

- All public-facing pages are implemented according to wireframes
- Portfolio system is fully functional with filtering and gallery features
- Blog and resources section is implemented with content management
- Contact and quote forms are functional with validation and notifications
- All components meet WCAG 2.1 AA accessibility standards
- Performance optimization is implemented for images and content
- All code follows established coding standards
- Unit and integration tests are implemented
