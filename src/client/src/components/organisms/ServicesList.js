/**
 * ServicesList Component
 * 
 * A responsive and accessible list of services that follows WCAG 2.1 accessibility standards.
 * Features proper semantic structure, keyboard navigation, and responsive layout.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../molecules/Card';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import { breakpoints } from '../../styles/breakpoints';

const ServicesContainer = styled.section`
  width: 100%;
  margin: 2rem 0;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  ${breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${breakpoints.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ServiceCardContent = styled(Card.Content)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ServiceDescription = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
`;

const ServiceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #F2BF0F;
  color: #212529;
  margin-bottom: 1rem;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

// Placeholder for service icons
const IconPlaceholder = ({ name }) => (
  <svg 
    aria-hidden="true" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24"
  >
    <rect width="24" height="24" fill="currentColor" />
    <text 
      x="12" 
      y="16" 
      textAnchor="middle" 
      fill="#212529" 
      fontSize="12"
    >
      {name.charAt(0)}
    </text>
  </svg>
);

IconPlaceholder.propTypes = {
  name: PropTypes.string.isRequired,
};

const ServicesList = ({ 
  services = [], 
  title, 
  description 
}) => {
  return (
    <ServicesContainer aria-labelledby="services-title">
      {title && (
        <Typography variant="h2" id="services-title" align="center">
          {title}
        </Typography>
      )}
      
      {description && (
        <Typography variant="body1" align="center" gutterBottom>
          {description}
        </Typography>
      )}
      
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            variant="elevated"
            interactive
            aria-labelledby={`service-title-${service.id}`}
          >
            <ServiceCardContent>
              <ServiceIcon aria-hidden="true">
                <IconPlaceholder name={service.title} />
              </ServiceIcon>
              
              <Typography 
                variant="h4" 
                id={`service-title-${service.id}`}
                gutterBottom
              >
                {service.title}
              </Typography>
              
              <ServiceDescription>
                <Typography variant="body1">
                  {service.description}
                </Typography>
              </ServiceDescription>
              
              <Button 
                variant="outline" 
                aria-label={`Learn more about ${service.title}`}
                href={service.link}
              >
                Learn More
              </Button>
            </ServiceCardContent>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

ServicesList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ServicesList;
