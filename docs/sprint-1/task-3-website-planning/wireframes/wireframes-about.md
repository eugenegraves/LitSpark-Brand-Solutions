# Website Wireframes - About Pages

## Overview

This document presents low-fidelity wireframes for the LitSpark Brand Solutions About section, including the main About page and team page. These wireframes use a concise notation while maintaining clarity on key layout elements and accessibility features.

## About Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Headline: About LitSpark Brand Solutions                  │
│ - Subheadline: Our mission statement                        │
│ - [Breadcrumbs: Home > About]                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Company Story - 2 Column Layout]                          │
│ - Left: Image                                              │
│ - Right: Company history and mission                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Core Values - 3 Column Layout]                            │
│ - Value 1: Icon + Heading + Description                    │
│ - Value 2: Icon + Heading + Description                    │
│ - Value 3: Icon + Heading + Description                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Accessibility Commitment - Full Width]                     │
│ - Heading: Our Commitment to Accessibility                  │
│ - Description of approach and standards                     │
│ - Key accessibility features                                │
│ - [CTA: Learn More About Our Accessibility Services]        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Team Overview - 2 Column Layout]                          │
│ - Left: Text about our team                                │
│ - Right: Team collage image                                │
│ - [CTA: Meet Our Team]                                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Clients & Partners - Carousel]                            │
│ - Heading: Clients & Partners                              │
│ - Logo grid with client/partner logos                      │
│ - Navigation arrows                                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Testimonial - Full Width]                                 │
│ - Featured client quote                                     │
│ - Client name and company                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [CTA Section - Full Width]                                 │
│ - Heading: Ready to Work With Us?                          │
│ - Description                                              │
│ - [Button: Contact Us] [Button: View Our Services]          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Footer: Standard site footer]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tablet View (768px-1199px)

Key adaptations:
- Core values shift to 2-column layout
- Team overview becomes stacked (text above image)
- Reduced padding throughout
- Client logos in 3-column grid

### Mobile View (320px-767px)

Key adaptations:
- All sections stack vertically
- Core values in single column
- Hamburger menu navigation
- Full-width buttons
- Client logos in 2-column grid

## Team Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Headline: Our Team                                        │
│ - Subheadline: Meet the experts behind LitSpark             │
│ - [Breadcrumbs: Home > About > Team]                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Team Introduction - Full Width]                           │
│ - Brief description of our team and expertise               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Leadership Team - 3 Column Grid]                          │
│ - Heading: Leadership Team                                  │
│ - Team Member Cards (3 across):                            │
│   * Photo                                                  │
│   * Name                                                   │
│   * Position                                               │
│   * Brief bio                                              │
│   * Social media links                                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Design Team - 3 Column Grid]                              │
│ - Heading: Design Team                                      │
│ - Team Member Cards (3 across)                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Strategy Team - 3 Column Grid]                            │
│ - Heading: Strategy Team                                    │
│ - Team Member Cards (3 across)                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Development Team - 3 Column Grid]                         │
│ - Heading: Development Team                                 │
│ - Team Member Cards (3 across)                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Company Culture - 2 Column Layout]                        │
│ - Left: Images of team events/workspace                    │
│ - Right: Description of company culture and values          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Join Our Team - Full Width]                               │
│ - Heading: Join Our Team                                    │
│ - Description of career opportunities                       │
│ - [CTA: View Open Positions]                               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Footer: Standard site footer]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tablet and Mobile Views

The tablet and mobile views follow similar content structure with these adaptations:
- Team member cards shift to 2-column (tablet) and 1-column (mobile)
- Company culture section stacks vertically on mobile
- Reduced padding and margins
- Full-width buttons on mobile

## Accessibility Features

- Skip navigation link at the top of each page
- Proper heading hierarchy (H1, H2, H3)
- High contrast text with sufficient font sizes
- Focus indicators for interactive elements
- Alt text for all images
- ARIA landmarks for major sections
- Keyboard navigable components
- Color independence (information not conveyed by color alone)

## Interactive Elements

- Team member cards with hover/focus states
- Social media links with descriptive text
- CTA buttons with clear focus states
- Navigation with visible focus indicators
- Carousel with keyboard controls and pause button
