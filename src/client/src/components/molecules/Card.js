/**
 * Card Component
 * 
 * A reusable card component that follows WCAG 2.1 accessibility standards.
 * Features proper contrast, semantic structure, and responsive design.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Typography from '../atoms/Typography';
import { breakpoints } from '../../styles/breakpoints';

// Card variants
const variants = {
  outlined: css`
    border: 1px solid #DEE2E6;
    background-color: transparent;
  `,
  elevated: css`
    border: none;
    background-color: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,
  filled: css`
    border: none;
    background-color: #F8F9FA;
  `,
};

const StyledCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  transition: all 0.2s ease-in-out;
  
  /* Apply variant styles */
  ${props => variants[props.$variant]}
  
  /* Hover effect for interactive cards */
  ${props => props.$interactive && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &:focus-within {
      outline: 2px solid #F2BF0F;
      outline-offset: 2px;
    }
  `}
  
  /* Responsive adjustments */
  ${breakpoints.md} {
    display: flex;
    flex-direction: ${props => props.$horizontal ? 'row' : 'column'};
  }
`;

const StyledCardMedia = styled.div`
  position: relative;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: ${props => props.height || '200px'};
  
  ${breakpoints.md} {
    ${props => props.$horizontal && css`
      width: 40%;
      height: auto;
    `}
  }
`;

const StyledCardContent = styled.div`
  padding: 1.5rem;
  
  ${breakpoints.md} {
    ${props => props.$horizontal && css`
      width: 60%;
    `}
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const StyledCardHeaderContent = styled.div`
  flex: 1;
`;

const StyledCardActions = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem 1.5rem;
  
  & > * + * {
    margin-left: 0.5rem;
  }
`;

const Card = ({
  children,
  variant = 'elevated',
  interactive = false,
  horizontal = false,
  onClick = () => {},
  className,
  ...rest
}) => {
  // Convert boolean attributes to string values for DOM attributes
  const interactiveAttr = interactive ? 'true' : undefined;
  const horizontalAttr = horizontal ? 'true' : undefined;
  const domProps = { ...rest };
  
  return (
    <StyledCard
      $variant={variant}
      $interactive={interactive}
      $horizontal={horizontal}
      onClick={interactive ? onClick : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      className={className}
      data-interactive={interactiveAttr}
      data-horizontal={horizontalAttr}
      {...domProps}
    >
      {children}
    </StyledCard>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['outlined', 'elevated', 'filled']),
  interactive: PropTypes.bool,
  horizontal: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

// Card subcomponents
const CardMedia = ({ 
  image, 
  alt, 
  height, 
  horizontal = false,
  ...rest 
}) => {
  // Convert boolean attributes to string values for DOM attributes
  const horizontalAttr = horizontal ? 'true' : undefined;
  const domProps = { ...rest };
  
  return (
    <StyledCardMedia 
      image={image} 
      height={height}
      $horizontal={horizontal}
      role="img"
      aria-label={alt}
      data-horizontal={horizontalAttr}
      {...domProps}
    />
  );
};

CardMedia.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
  horizontal: PropTypes.bool,
};

const CardContent = ({ 
  children, 
  horizontal = false,
  ...rest 
}) => {
  // Convert boolean attributes to string values for DOM attributes
  const horizontalAttr = horizontal ? 'true' : undefined;
  const domProps = { ...rest };
  
  return (
    <StyledCardContent 
      $horizontal={horizontal}
      data-horizontal={horizontalAttr}
      {...domProps}
    >
      {children}
    </StyledCardContent>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  horizontal: PropTypes.bool,
};

const CardHeader = ({ title, subheader, avatar, action, ...rest }) => {
  return (
    <StyledCardHeader {...rest}>
      {avatar && avatar}
      <StyledCardHeaderContent>
        {title && (
          <Typography variant="h5" gutterBottom={!!subheader}>
            {title}
          </Typography>
        )}
        {subheader && (
          <Typography variant="body2" color="secondary">
            {subheader}
          </Typography>
        )}
      </StyledCardHeaderContent>
      {action && action}
    </StyledCardHeader>
  );
};

CardHeader.propTypes = {
  title: PropTypes.node,
  subheader: PropTypes.node,
  avatar: PropTypes.node,
  action: PropTypes.node,
};

const CardActions = ({ children, ...rest }) => {
  return (
    <StyledCardActions {...rest}>
      {children}
    </StyledCardActions>
  );
};

CardActions.propTypes = {
  children: PropTypes.node.isRequired,
};

// Attach subcomponents to Card
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Header = CardHeader;
Card.Actions = CardActions;

export default Card;
