/**
 * PageTemplate Component
 * 
 * A reusable page template that follows WCAG 2.1 accessibility standards.
 * Provides consistent layout structure with proper semantic HTML.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from '../../styles/breakpoints';

// Import layout components
// These will be implemented separately
const Header = React.lazy(() => import('../layout/Header'));
const Footer = React.lazy(() => import('../layout/Footer'));
const SkipLink = React.lazy(() => import('../layout/SkipLink'));

const Main = styled.main`
  min-height: calc(100vh - 200px); /* Adjust based on header/footer height */
  width: 100%;
  padding: 2rem 1rem;
  
  ${breakpoints.md} {
    padding: 3rem 2rem;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: ${props => props.fullWidth ? '100%' : '1200px'};
  margin: 0 auto;
`;

const PageTemplate = ({
  children,
  title,
  description,
  fullWidth,
  headerProps,
  footerProps,
  mainId = 'main-content',
}) => {
  // Update document title when component mounts
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | LitSpark Brand Solutions`;
    }
    
    // Add meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.content = description;
    }
  }, [title, description]);
  
  return (
    <PageContainer>
      <React.Suspense fallback={<div>Loading...</div>}>
        {/* Skip link for keyboard navigation */}
        <SkipLink targetId={mainId} />
        
        {/* Header component */}
        <Header {...headerProps} />
        
        {/* Main content area */}
        <Main id={mainId} tabIndex="-1">
          <ContentContainer fullWidth={fullWidth}>
            {children}
          </ContentContainer>
        </Main>
        
        {/* Footer component */}
        <Footer {...footerProps} />
      </React.Suspense>
    </PageContainer>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  fullWidth: PropTypes.bool,
  headerProps: PropTypes.object,
  footerProps: PropTypes.object,
  mainId: PropTypes.string,
};

PageTemplate.defaultProps = {
  fullWidth: false,
  mainId: 'main-content',
};

export default PageTemplate;
