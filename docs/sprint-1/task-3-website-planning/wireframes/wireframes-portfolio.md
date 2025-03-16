# Website Wireframes - Portfolio Pages

## Overview

This document presents low-fidelity wireframes for the LitSpark Brand Solutions Portfolio section, including the portfolio overview page and case study detail pages. These wireframes focus on key layout elements and accessibility features using a concise notation.

## Portfolio Overview Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Headline: Our Portfolio                                   │
│ - Subheadline: Accessible brand solutions in action         │
│ - [Breadcrumbs: Home > Portfolio]                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Portfolio Introduction - Full Width]                      │
│ - Brief overview of our work and approach                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Filter Controls - Full Width]                             │
│ - Filter by: [All] [Brand Strategy] [Brand Identity]        │
│   [Digital Branding] [Brand Experience] [Accessibility]     │
│ - Sort by: [Newest] [Oldest] [A-Z]                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Portfolio Grid - 3 Column]                                │
│ - Case Study Cards (3 across):                             │
│   * Featured Image                                         │
│   * Client Name                                            │
│   * Project Type                                           │
│   * Brief Description                                      │
│   * [View Case Study button]                               │
│                                                             │
│ - Multiple rows of case studies                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Pagination Controls - Centered]                           │
│ - [Previous] [1] [2] [3] [Next]                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Client Testimonial - Full Width]                          │
│ - Featured quote from client                                │
│ - Client name and company                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [CTA Section - Full Width]                                 │
│ - Heading: Ready to Create Your Success Story?              │
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
- Portfolio grid shifts to 2-column layout
- Filter controls remain horizontal but with dropdown for categories
- Reduced padding throughout

### Mobile View (320px-767px)

Key adaptations:
- Portfolio grid shifts to 1-column layout
- Filter controls stack vertically
- Hamburger menu navigation
- Full-width buttons
- Simplified pagination controls

## Case Study Detail Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Client Logo                                              │
│ - Headline: Project Title                                   │
│ - Subheadline: Project type/category                        │
│ - [Breadcrumbs: Home > Portfolio > Project Title]          │
│ - Featured Image                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Project Overview - 2 Column Layout]                       │
│ - Left Column:                                             │
│   * Project description                                     │
│   * Client goals                                           │
│   * Challenges                                             │
│                                                             │
│ - Right Column:                                            │
│   * Project Details:                                        │
│     - Client: [Client Name]                                │
│     - Industry: [Industry]                                 │
│     - Services: [List of services]                         │
│     - Timeline: [Duration]                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Process Section - Full Width]                             │
│ - Heading: Our Approach                                     │
│ - Process steps with icons and descriptions:                │
│   * Discovery                                              │
│   * Strategy                                               │
│   * Creation                                               │
│   * Delivery                                               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Solution - 2 Column Layout]                               │
│ - Left: Text describing the solution                        │
│ - Right: Key solution image                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Project Gallery - Full Width]                             │
│ - Heading: Project Gallery                                  │
│ - Image carousel or grid                                    │
│ - Caption for each image                                    │
│ - Navigation controls                                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Accessibility Features - Full Width]                      │
│ - Heading: Accessibility Considerations                     │
│ - Description of accessibility features implemented         │
│ - Key accessibility highlights with icons                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Results - 2 Column Layout]                                │
│ - Left: Text describing outcomes and results                │
│ - Right: Key metrics or testimonial                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Client Testimonial - Full Width]                          │
│ - Quote from client                                         │
│ - Client name and position                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Related Projects - 3 Column Grid]                         │
│ - Heading: Related Projects                                 │
│ - Three related case study cards                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [CTA Section - Full Width]                                 │
│ - Heading: Ready for Similar Results?                       │
│ - Description                                              │
│ - [Button: Contact Us] [Button: View Our Services]          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Footer: Standard site footer]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tablet and Mobile Views

The tablet and mobile views follow similar content structure with these adaptations:
- All 2-column sections stack vertically on mobile
- Related projects shift to 2-column (tablet) and 1-column (mobile)
- Gallery displays fewer images per view
- Process steps stack vertically on mobile
- Reduced padding and margins
- Full-width buttons on mobile

## Accessibility Features

- Skip navigation link at the top of each page
- Proper heading hierarchy (H1, H2, H3)
- High contrast text with sufficient font sizes
- Focus indicators for interactive elements using gold (#F2BF0F) outline with 2px offset
- Alt text for all images
- ARIA landmarks for major sections
- Keyboard navigable components including filter controls and gallery
- Color independence (information not conveyed by color alone)
- Descriptive button text (not just "Click Here")

## Interactive Elements

- Case study cards with hover/focus states
- Filter controls with clear selected state
- Image gallery with keyboard controls and pause button
- Related project links with descriptive text
- CTA buttons with clear focus states
- Navigation with visible focus indicators

## Filtering and Sorting Interaction

The portfolio filtering system will:
- Use proper ARIA attributes for accessibility
- Provide visual feedback when filters are applied
- Allow keyboard navigation through filter options
- Maintain focus position when filters are applied
- Include clear all filters option
- Announce filter changes to screen readers
