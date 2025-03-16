# Website Wireframes - Contact Page

## Overview

This document presents low-fidelity wireframes for the LitSpark Brand Solutions Contact page. These wireframes focus on key layout elements and accessibility features using a concise notation, ensuring the contact experience is intuitive and accessible for all users.

## Contact Page

### Desktop View (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│ [Skip Nav] [Header: Logo + Navigation + Search]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Hero Section]                                              │
│ - Headline: Contact Us                                      │
│ - Subheadline: Let's discuss your brand needs               │
│ - [Breadcrumbs: Home > Contact]                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Contact Information & Form - 2 Column Layout]             │
│                                                             │
│ - Left Column (40% width):                                 │
│   * Contact Information:                                    │
│     - Heading: Get in Touch                                │
│     - Address with map link                                │
│     - Phone number                                         │
│     - Email address                                        │
│     - Office hours                                         │
│                                                             │
│   * Social Media:                                          │
│     - Social media icons with labels                       │
│                                                             │
│   * Quick Links:                                           │
│     - [Request a Quote]                                    │
│     - [Schedule a Consultation]                            │
│     - [Support]                                            │
│                                                             │
│ - Right Column (60% width):                                │
│   * Contact Form:                                          │
│     - Heading: Send Us a Message                           │
│     - Name field (required)                                │
│     - Email field (required)                               │
│     - Phone field                                          │
│     - Company field                                        │
│     - Subject dropdown:                                    │
│       > General Inquiry                                    │
│       > Request a Quote                                    │
│       > Project Discussion                                 │
│       > Accessibility Services                             │
│       > Other                                              │
│     - Message textarea (required)                          │
│     - How did you hear about us? dropdown                  │
│     - Preferred contact method radio buttons               │
│     - File upload option                                   │
│     - Privacy policy checkbox (required)                   │
│     - [Submit button]                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Google Map - Full Width]                                  │
│ - Interactive map showing office location                   │
│ - Address overlay                                          │
│ - [Get Directions button]                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Team Contact Cards - 3 Column Grid]                       │
│ - Heading: Key Contacts                                     │
│ - Team Member Cards (3 across):                            │
│   * Photo                                                  │
│   * Name                                                   │
│   * Position                                               │
│   * Email                                                  │
│   * Direct phone                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [FAQ Section - Full Width]                                 │
│ - Heading: Frequently Asked Questions                       │
│ - Accordion-style FAQ items:                               │
│   * Question 1                                             │
│   * Answer 1                                               │
│   * Question 2                                             │
│   * Answer 2                                               │
│   * Question 3                                             │
│   * Answer 3                                               │
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
│ [Footer: Standard site footer]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tablet View (768px-1199px)

Key adaptations:
- Contact information and form remain in 2-column layout but with adjusted proportions
- Team contact cards shift to 2-column grid
- Map height reduced
- Reduced padding throughout

### Mobile View (320px-767px)

Key adaptations:
- Contact information and form stack vertically (info above form)
- Team contact cards shift to 1-column layout
- Map height further reduced
- Full-width form fields and buttons
- Simplified layout with increased spacing between form fields
- Hamburger menu navigation

## Form Submission States

### Success State

```
┌─────────────────────────────────────────────────────────────┐
│ [Success Message - Full Width]                             │
│ - Success icon                                             │
│ - Heading: Thank You for Contacting Us!                     │
│ - Message: We've received your inquiry and will respond     │
│   within 1-2 business days.                                │
│ - Reference number                                         │
│ - [Return to Home button]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Error State

```
┌─────────────────────────────────────────────────────────────┐
│ [Error Message - Full Width]                               │
│ - Error icon                                               │
│ - Heading: There was a problem submitting your form         │
│ - Message: Please review the highlighted fields below       │
│   and try again.                                           │
│                                                             │
│ - [Individual field errors displayed next to fields]        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Accessibility Features

### Form Accessibility

- All form fields have visible labels
- Required fields clearly marked with both asterisk (*) and "required" in the label
- Labels properly associated with input fields
- Error messages are descriptive and appear next to relevant fields
- Success messages are clear and descriptive
- Form validation occurs on submission, not just on blur
- Focus returns to first error field when validation fails
- Clear instructions for complex fields (like file upload)
- Logical tab order through the form
- ARIA attributes for form controls

### Map Accessibility

- Keyboard accessible controls
- Text alternative for map location
- Address and directions available as text
- Skip map option for keyboard users

### General Accessibility

- Skip navigation link at the top of the page
- Proper heading hierarchy (H1, H2, H3)
- High contrast text with sufficient font sizes
- Focus indicators using gold (#F2BF0F) outline with 2px offset
- Alt text for all images
- ARIA landmarks for major sections
- Color independence (information not conveyed by color alone)
- Descriptive button text (not just "Submit")

## Interactive Elements

- Form fields with visible focus and error states
- Submit button with clear hover/focus states
- Accordion FAQ items with keyboard support
- Social media links with descriptive text
- Map controls with keyboard support
- Team contact cards with hover states

## Form Validation Rules

- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Phone: Optional, numeric with proper formatting
- Subject: Required selection
- Message: Required, minimum 10 characters
- Privacy Policy: Required checkbox
- File Upload: Optional, restricted to PDF, DOC, DOCX, JPG, PNG formats, maximum 5MB

## Form Submission Process

1. Client-side validation on submit
2. Display loading indicator during submission
3. Server-side validation
4. Success message with confirmation details
5. Email confirmation sent to user
6. Error handling with clear instructions if submission fails
