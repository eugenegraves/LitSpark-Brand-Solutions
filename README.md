# LitSpark Brand Solutions Website

This repository contains the codebase for the LitSpark Brand Solutions website, a full-stack web application built with React.js and Node.js.

## Project Overview

LitSpark Brand Solutions is a branding business that offers services including brand strategy, visual identity, digital marketing, web development, brand collateral, and brand management. This website serves as both a public-facing marketing site and a client portal for project management.

## Technology Stack

### Frontend
- React.js with React Router for client-side routing
- Material-UI for component library and styling
- Redux Toolkit for state management
- Formik and Yup for form handling and validation
- Axios for API requests

### Backend
- Node.js with Express.js
- PostgreSQL with Sequelize ORM
- JWT for authentication
- Nodemailer for email functionality
- Stripe for payment processing
- AWS S3 for file storage

## Accessibility

This project adheres to WCAG 2.1 Level AA accessibility standards, including:

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation with visible focus states
- ARIA attributes where needed
- Color contrast compliance
- Screen reader compatibility
- Skip links for keyboard users

## Project Structure

```
litspark-brand-solutions/
├── config/               # Configuration files
├── docs/                 # Project documentation
├── public/               # Static assets
│   └── assets/           # Images, fonts, and icons
├── src/
│   ├── client/           # Frontend React application
│   │   ├── public/       # Public assets for React app
│   │   └── src/          # React source code
│   │       ├── components/  # Reusable UI components
│   │       ├── pages/    # Page components
│   │       ├── theme/    # Theme configuration
│   │       └── ...       # Other frontend code
│   ├── server/           # Backend Node.js application
│   │   ├── config/       # Server configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── ...           # Other backend code
│   └── shared/           # Shared code between client and server
└── ...                   # Root configuration files
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-organization/litspark-brand-solutions.git
cd litspark-brand-solutions
```

2. Install dependencies:
```bash
npm install
cd src/client
npm install
cd ../..
```

3. Create a `.env` file based on `.env.example` and configure your environment variables.

4. Start the development server:
```bash
npm run dev
```

This will start both the backend server and the frontend development server concurrently.

## Development Workflow

- The backend server runs on port 5000 by default
- The frontend development server runs on port 3000 by default
- API requests from the frontend are proxied to the backend

## Deployment

The application is configured for deployment on AWS infrastructure:
- Frontend: S3 + CloudFront
- Backend: EC2 or Elastic Beanstalk
- Database: RDS PostgreSQL
- File storage: S3
- CDN: CloudFront

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For any questions or support, please contact:
- Email: info@litspark.com
- Phone: (212) 555-1234
