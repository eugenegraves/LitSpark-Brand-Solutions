# Website Wireframes - Resources Pages

## Overview

This document presents low-fidelity wireframes for the LitSpark Brand Solutions Resources section, including the resources overview page, blog listing, blog detail, and downloadable resources pages. These wireframes focus on key layout elements and accessibility features using a concise notation.

## Resources Overview Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Headline: Resources & Insights                            │
│ - Subheadline: Brand and accessibility knowledge center     │
│ - [Breadcrumbs: Home > Resources]                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Resources Introduction - Full Width]                      │
│ - Brief overview of available resources                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Resource Categories - 3 Column Layout]                    │
│ - Category Cards (3 across):                               │
│   * Blog                                                   │
│     - Icon                                                 │
│     - Description                                          │
│     - [View Blog button]                                   │
│                                                             │
│   * Guides & Whitepapers                                   │
│     - Icon                                                 │
│     - Description                                          │
│     - [View Guides button]                                 │
│                                                             │
│   * Accessibility Resources                                │
│     - Icon                                                 │
│     - Description                                          │
│     - [View Resources button]                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Featured Blog Posts - 3 Column Grid]                      │
│ - Heading: Latest from Our Blog                             │
│ - Blog Post Cards (3 across):                              │
│   * Featured Image                                         │
│   * Category Tag                                           │
│   * Title                                                  │
│   * Publication Date                                       │
│   * Brief Excerpt                                          │
│   * [Read More link]                                       │
│                                                             │
│ - [View All Blog Posts button]                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Featured Downloads - 2 Column Layout]                     │
│ - Heading: Popular Resources                                │
│ - Left: Description of downloadable resources               │
│ - Right: Resource cards (2x2 grid):                        │
│   * Resource Icon                                          │
│   * Resource Title                                         │
│   * Brief Description                                      │
│   * [Download button]                                      │
│                                                             │
│ - [View All Resources button]                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Newsletter Signup - Full Width]                           │
│ - Heading: Stay Updated                                     │
│ - Description                                              │
│ - Form: [Email input field] [Subscribe button]              │
│ - Privacy note                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Upcoming Events - Full Width]                             │
│ - Heading: Upcoming Events & Webinars                       │
│ - Event cards (horizontal layout):                         │
│   * Date                                                   │
│   * Event Title                                            │
│   * Brief Description                                      │
│   * [Register button]                                      │
│                                                             │
│ - [View All Events button]                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [CTA Section - Full Width]                                 │
│ - Heading: Need Personalized Guidance?                      │
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

Key adaptations:
- Resource categories shift to 1-column layout on mobile
- Blog posts shift to 2-column (tablet) and 1-column (mobile)
- Featured downloads stack vertically on mobile
- Reduced padding throughout
- Full-width buttons on mobile

## Blog Listing Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Headline: Blog                                            │
│ - Subheadline: Insights on branding and accessibility       │
│ - [Breadcrumbs: Home > Resources > Blog]                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Filter Controls - Full Width]                             │
│ - Categories: [All] [Brand Strategy] [Brand Identity]       │
│   [Digital Branding] [Accessibility] [Industry Insights]    │
│ - Sort by: [Newest] [Oldest] [Most Popular]                 │
│ - Search: [Search field]                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Blog Grid - 3 Column + Sidebar]                           │
│                                                             │
│ - Main Content (75% width):                                │
│   * Blog Post Cards (3 across):                            │
│     - Featured Image                                       │
│     - Category Tag                                         │
│     - Title                                               │
│     - Publication Date                                     │
│     - Author                                              │
│     - Brief Excerpt                                        │
│     - [Read More link]                                     │
│                                                             │
│   * Multiple rows of blog posts                             │
│   * [Pagination Controls]                                  │
│                                                             │
│ - Sidebar (25% width):                                     │
│   * Categories list                                        │
│   * Popular posts                                          │
│   * Newsletter signup                                      │
│   * Featured download                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [CTA Section - Full Width]                                 │
│ - Heading: Want to Contribute?                              │
│ - Description about guest posting                           │
│ - [Button: Contact Us]                                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Footer: Standard site footer]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tablet and Mobile Views

Key adaptations:
- Blog grid shifts to 2-column (tablet) and 1-column (mobile)
- Sidebar moves below main content on mobile
- Filter controls condense to dropdowns
- Reduced padding throughout

## Blog Detail Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Article Header]                                            │
│ - [Breadcrumbs: Home > Resources > Blog > Article Title]   │
│ - Category Tag                                             │
│ - Headline: Article Title                                   │
│ - Publication Date                                          │
│ - Author with photo and brief bio                           │
│ - Estimated reading time                                    │
│ - Social sharing buttons                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Article Content - 2 Column Layout]                        │
│                                                             │
│ - Main Content (75% width):                                │
│   * Featured Image with caption                            │
│   * Article body with:                                     │
│     - Proper heading hierarchy                             │
│     - Paragraph text                                       │
│     - Bulleted/numbered lists                              │
│     - Block quotes                                         │
│     - Supporting images                                    │
│     - Call-out boxes                                       │
│   * Tags                                                   │
│   * Social sharing buttons                                 │
│                                                             │
│ - Sidebar (25% width):                                     │
│   * Table of contents                                      │
│   * Related articles                                       │
│   * Featured download                                      │
│   * Newsletter signup                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Author Bio - Full Width]                                  │
│ - Author photo                                             │
│ - Name and title                                           │
│ - Detailed bio                                             │
│ - Social media links                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Related Articles - 3 Column Grid]                         │
│ - Heading: You May Also Like                                │
│ - Three related article cards                               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Comments Section - Full Width]                            │
│ - Heading: Comments                                         │
│ - Comment form                                             │
│ - Existing comments                                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [CTA Section - Full Width]                                 │
│ - Heading: Want to Learn More?                              │
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

Key adaptations:
- Sidebar moves below main content on mobile
- Related articles shift to 2-column (tablet) and 1-column (mobile)
- Social sharing buttons become fixed at bottom on mobile
- Table of contents becomes collapsible on mobile

## Downloadable Resources Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Headline: Guides & Resources                              │
│ - Subheadline: Free tools and guides for better branding    │
│ - [Breadcrumbs: Home > Resources > Guides]                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Filter Controls - Full Width]                             │
│ - Categories: [All] [Brand Strategy] [Brand Identity]       │
│   [Digital Branding] [Accessibility] [Templates]            │
│ - Resource Type: [All] [Guides] [Checklists] [Templates]    │
│   [Whitepapers] [Tools]                                     │
│ - Search: [Search field]                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Featured Resource - Full Width]                           │
│ - Heading: Featured Resource                                │
│ - 2-column layout:                                         │
│   * Left: Resource cover image                             │
│   * Right:                                                 │
│     - Resource title                                       │
│     - Description                                          │
│     - Key points                                           │
│     - [Download button]                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Resources Grid - 3 Column]                                │
│ - Resource Cards (3 across):                               │
│   * Resource cover image                                   │
│   * Category tag                                           │
│   * Resource title                                         │
│   * Brief description                                      │
│   * File type and size                                     │
│   * [Download button]                                      │
│                                                             │
│ - Multiple rows of resources                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Pagination Controls - Centered]                           │
│ - [Previous] [1] [2] [3] [Next]                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Email Signup Gate - Full Width]                           │
│ - Heading: Access Premium Resources                         │
│ - Description                                              │
│ - Form: [Name] [Email] [Company] [Subscribe button]         │
│ - Privacy note                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [CTA Section - Full Width]                                 │
│ - Heading: Need Custom Resources?                           │
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

Key adaptations:
- Resources grid shifts to 2-column (tablet) and 1-column (mobile)
- Featured resource stacks vertically on mobile
- Filter controls condense to dropdowns
- Simplified pagination controls on mobile
- Reduced padding throughout

## Accessibility Features

- Skip navigation link at the top of each page
- Proper heading hierarchy (H1, H2, H3)
- High contrast text with sufficient font sizes
- Focus indicators for interactive elements using gold (#F2BF0F) outline with 2px offset
- Alt text for all images
- ARIA landmarks for major sections
- Keyboard navigable components including filter controls and pagination
- Color independence (information not conveyed by color alone)
- Form labels properly associated with inputs
- Error messages for form validation
- Descriptive button text (not just "Click Here")

## Interactive Elements

- Resource cards with hover/focus states
- Filter controls with clear selected state
- Download buttons with clear focus states
- Form fields with visible focus and error states
- Social sharing buttons with descriptive text
- Pagination with keyboard navigation support

## Form Accessibility

- All form fields have visible labels
- Required fields clearly marked
- Error messages are descriptive and appear next to relevant fields
- Success messages are clear and descriptive
- Form validation occurs on submission, not just on blur
- Focus returns to first error field when validation fails
