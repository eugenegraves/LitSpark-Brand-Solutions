/**
 * Navigation Component
 * 
 * A responsive navigation component that follows WCAG 2.1 accessibility standards.
 * Features proper keyboard navigation, ARIA attributes, and mobile menu support.
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import { breakpoints } from '../../theme/breakpoints';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media ${breakpoints.down('md')} {
    position: fixed;
    top: 0;
    right: ${props => (props.$isOpen ? '0' : '-100%')};
    width: 280px;
    height: 100vh;
    background-color: #FFFFFF;
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;
  
  @media ${breakpoints.down('md')} {
    margin: 0.75rem 0;
    width: 100%;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #343A40;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    color: #F2BF0F;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
  
  &.active {
    color: #F2BF0F;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #F2BF0F;
      
      @media ${breakpoints.down('md')} {
        bottom: 0;
        left: -8px;
        width: 4px;
        height: 100%;
      }
    }
  }
  
  @media ${breakpoints.down('md')} {
    display: block;
    padding: 0.75rem 0;
    width: 100%;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  color: #343A40;
  background: none;
  border: none;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: inherit;
  
  &:hover {
    color: #F2BF0F;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
  
  @media ${breakpoints.down('md')} {
    width: 100%;
    justify-content: space-between;
    padding: 0.75rem 0;
  }
`;

const DropdownIcon = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.2s;
  
  ${props => props.$isOpen && `
    transform: rotate(180deg);
  `}
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  min-width: 200px;
  padding: 0.5rem 0;
  margin: 0.5rem 0 0;
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  
  @media ${breakpoints.down('md')} {
    position: static;
    box-shadow: none;
    border-left: 2px solid #DEE2E6;
    margin: 0.5rem 0 0.5rem 1rem;
    padding: 0 0 0 1rem;
  }
`;

const DropdownItem = styled.li`
  margin: 0;
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: #343A40;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #F8F9FA;
    color: #F2BF0F;
  }
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: -2px;
  }
  
  @media ${breakpoints.down('md')} {
    padding: 0.75rem 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #343A40;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  z-index: 1001;
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
  
  @media ${breakpoints.down('md')} {
    display: block;
  }
`;

const Overlay = styled.div`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #343A40;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: none;
  
  &:focus {
    outline: 2px solid #F2BF0F;
    outline-offset: 2px;
  }
  
  @media ${breakpoints.down('md')} {
    display: block;
  }
`;

const ActionButton = styled.div`
  margin-left: 1.5rem;
  
  @media ${breakpoints.down('md')} {
    margin: 1.5rem 0 0;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

/**
 * Navigation Component
 * 
 * @param {Object} props - Component props
 * @param {node} props.logo - Logo component or element
 * @param {Array} props.links - Array of navigation links
 * @param {node} props.actionButton - Optional action button (e.g., Contact Us)
 */
const Navigation = ({
  logo,
  links,
  actionButton,
  ...rest
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navRef = useRef(null);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);
  
  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Toggle dropdown menu
  const toggleDropdown = (index) => {
    setOpenDropdowns({
      ...openDropdowns,
      [index]: !openDropdowns[index],
    });
  };
  
  // Close dropdown when clicking outside
  const handleDropdownBlur = (index, event) => {
    // Check if the related target is inside the dropdown
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    
    // Close the dropdown
    setOpenDropdowns({
      ...openDropdowns,
      [index]: false,
    });
  };
  
  // Handle keyboard navigation for dropdown
  const handleDropdownKeyDown = (index, event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown(index);
    } else if (event.key === 'Escape' && openDropdowns[index]) {
      setOpenDropdowns({
        ...openDropdowns,
        [index]: false,
      });
      // Focus back on the dropdown button
      event.currentTarget.focus();
    }
  };
  
  return (
    <NavContainer ref={navRef} role="navigation" aria-label="Main Navigation" {...rest}>
      <LogoContainer>
        {logo}
      </LogoContainer>
      
      <MobileMenuButton
        onClick={toggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-controls="navigation-links"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <Icon name="fas fa-bars" aria-hidden="true" />
      </MobileMenuButton>
      
      <Overlay $isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      
      <NavLinks id="navigation-links" $isOpen={mobileMenuOpen}>
        <CloseButton
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <Icon name="fas fa-times" aria-hidden="true" />
        </CloseButton>
        
        {links.map((link, index) => (
          <NavItem key={`nav-item-${index}`}>
            {link.dropdown ? (
              <DropdownContainer onBlur={(e) => handleDropdownBlur(index, e)}>
                <DropdownButton
                  onClick={() => toggleDropdown(index)}
                  aria-expanded={openDropdowns[index] || false}
                  aria-haspopup="true"
                  aria-controls={`dropdown-menu-${index}`}
                  onKeyDown={(e) => handleDropdownKeyDown(index, e)}
                >
                  {link.label}
                  <DropdownIcon $isOpen={openDropdowns[index]}>
                    <Icon name="fas fa-chevron-down" size="small" aria-hidden="true" />
                  </DropdownIcon>
                </DropdownButton>
                
                <DropdownMenu
                  id={`dropdown-menu-${index}`}
                  $isOpen={openDropdowns[index] || false}
                  role="menu"
                >
                  {link.dropdown.map((item, itemIndex) => (
                    <DropdownItem key={`dropdown-item-${itemIndex}`} role="none">
                      <DropdownLink
                        to={item.path}
                        role="menuitem"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </DropdownLink>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </DropdownContainer>
            ) : (
              <StyledNavLink
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {link.label}
              </StyledNavLink>
            )}
          </NavItem>
        ))}
        
        {actionButton && (
          <NavItem>
            <ActionButton>
              {actionButton}
            </ActionButton>
          </NavItem>
        )}
      </NavLinks>
    </NavContainer>
  );
};

Navigation.propTypes = {
  logo: PropTypes.node.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      dropdown: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  actionButton: PropTypes.node,
};

export default Navigation;
