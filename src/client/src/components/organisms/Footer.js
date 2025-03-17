/**
 * Footer Component
 * 
 * A responsive footer component that follows WCAG 2.1 accessibility standards.
 * Features proper semantic structure, keyboard navigation, and responsive design.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';
import { breakpoints } from '../../theme/breakpoints';

const FooterContainer = styled.footer`
  background-color: #212529;
  color: #F8F9FA;
  padding: 3rem 0 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media ${breakpoints.down('md')} {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 2rem;
  
  @media ${breakpoints.down('md')} {
    margin-bottom: 1.5rem;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 1.5rem;
  
  img {
    max-width: 180px;
    height: auto;
  }
`;

const FooterDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #ADB5BD;
`;

const FooterHeading = styled.h3`
  color: #F8F9FA;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #F2BF0F;
  }
`;

const FooterNav = styled.nav`
  margin-bottom: 1.5rem;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: #ADB5BD;
  text-decoration: none;
  transition: color 0.2s;
  display: inline-block;
  
  &:hover {
    color: #F2BF0F;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
    color: #F2BF0F;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #343A40;
  color: #F8F9FA;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: #F2BF0F;
    color: #212529;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: #ADB5BD;
`;

const ContactIcon = styled.div`
  margin-right: 0.75rem;
  color: #F2BF0F;
  margin-top: 0.25rem;
`;

const ContactText = styled.div`
  line-height: 1.5;
`;

const ContactLink = styled.a`
  color: #ADB5BD;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #F2BF0F;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
    color: #F2BF0F;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid #343A40;
  padding-top: 1.5rem;
  margin-top: 1rem;
  text-align: center;
  color: #6C757D;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Copyright = styled.p`
  margin-bottom: 0.5rem;
`;

const BottomLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 0.75rem;
  
  @media ${breakpoints.down('sm')} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const BottomLink = styled(Link)`
  color: #6C757D;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #F2BF0F;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
    color: #F2BF0F;
  }
`;

/**
 * Footer Component
 * 
 * @param {Object} props - Component props
 * @param {node} props.logo - Logo component or element
 * @param {string} props.description - Company description
 * @param {Array} props.navLinks - Array of navigation links organized by section
 * @param {Object} props.contact - Contact information
 * @param {Array} props.socialLinks - Array of social media links
 * @param {string} props.copyright - Copyright text
 * @param {Array} props.bottomLinks - Array of links for the bottom bar
 */
const Footer = ({
  logo,
  description,
  navLinks,
  contact,
  socialLinks,
  copyright,
  bottomLinks,
  ...rest
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer {...rest}>
      <FooterContent>
        {/* Company Information */}
        <FooterSection>
          <FooterLogo>
            {logo}
          </FooterLogo>
          <FooterDescription>
            {description}
          </FooterDescription>
          <SocialLinks>
            {socialLinks.map((link, index) => (
              <SocialLink 
                key={`social-${index}`} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <Icon name={link.icon} size="small" aria-hidden="true" />
              </SocialLink>
            ))}
          </SocialLinks>
        </FooterSection>
        
        {/* Navigation Links */}
        {navLinks.map((section, sectionIndex) => (
          <FooterSection key={`nav-section-${sectionIndex}`}>
            <FooterHeading>{section.heading}</FooterHeading>
            <FooterNav aria-label={`${section.heading} Navigation`}>
              <FooterList>
                {section.links.map((link, linkIndex) => (
                  <FooterItem key={`nav-link-${sectionIndex}-${linkIndex}`}>
                    <FooterLink to={link.path}>
                      {link.label}
                    </FooterLink>
                  </FooterItem>
                ))}
              </FooterList>
            </FooterNav>
          </FooterSection>
        ))}
        
        {/* Contact Information */}
        <FooterSection>
          <FooterHeading>Contact Us</FooterHeading>
          <ContactInfo>
            {contact.address && (
              <ContactItem>
                <ContactIcon>
                  <Icon name="fas fa-map-marker-alt" size="small" aria-hidden="true" />
                </ContactIcon>
                <ContactText>{contact.address}</ContactText>
              </ContactItem>
            )}
            
            {contact.phone && (
              <ContactItem>
                <ContactIcon>
                  <Icon name="fas fa-phone-alt" size="small" aria-hidden="true" />
                </ContactIcon>
                <ContactText>
                  <ContactLink href={`tel:${contact.phone.replace(/\D/g, '')}`}>
                    {contact.phone}
                  </ContactLink>
                </ContactText>
              </ContactItem>
            )}
            
            {contact.email && (
              <ContactItem>
                <ContactIcon>
                  <Icon name="fas fa-envelope" size="small" aria-hidden="true" />
                </ContactIcon>
                <ContactText>
                  <ContactLink href={`mailto:${contact.email}`}>
                    {contact.email}
                  </ContactLink>
                </ContactText>
              </ContactItem>
            )}
            
            {contact.hours && (
              <ContactItem>
                <ContactIcon>
                  <Icon name="fas fa-clock" size="small" aria-hidden="true" />
                </ContactIcon>
                <ContactText>{contact.hours}</ContactText>
              </ContactItem>
            )}
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      {/* Bottom Bar */}
      <BottomBar>
        <Copyright>
          {copyright.replace('{year}', currentYear)}
        </Copyright>
        <BottomLinks>
          {bottomLinks.map((link, index) => (
            <BottomLink key={`bottom-link-${index}`} to={link.path}>
              {link.label}
            </BottomLink>
          ))}
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
};

Footer.propTypes = {
  logo: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  contact: PropTypes.shape({
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    hours: PropTypes.string,
  }).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  copyright: PropTypes.string.isRequired,
  bottomLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Footer;
