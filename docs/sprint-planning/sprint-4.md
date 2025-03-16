# Sprint 4: Client Portal Development

## Overview

**Duration**: 3 weeks (June 1 - June 21, 2025)

Sprint 4 focuses on developing the client portal interface, implementing project management features, creating a deliverable approval system, and developing invoice and payment functionality.

## Goals

1. Develop client portal interface
2. Implement project management features
3. Create deliverable approval system
4. Develop invoice and payment functionality

## Tasks

### Task 1: Client Dashboard

**Description**: Create a client portal dashboard with project overview, notification center, and client profile management.

**Subtasks**:
- Create client portal dashboard
- Implement project overview
- Develop notification center
- Create client profile management

**Acceptance Criteria**:
- Dashboard with summary of active projects
- Project status visualization
- Notification center for updates and messages
- Client profile management with settings

**Accessibility Considerations**:
- Ensure dashboard components are keyboard navigable
- Implement proper heading hierarchy for screen readers
- Use ARIA live regions for notifications
- Ensure color contrast meets WCAG 2.1 AA standards

### Task 2: Project Management

**Description**: Implement project management features including project listing, timeline visualization, deliverable management, and communication system.

**Subtasks**:
- Implement project listing and details
- Create project timeline visualization
- Develop deliverable management
- Implement communication system

**Acceptance Criteria**:
- Project listing with filtering and sorting
- Interactive project timeline visualization
- Deliverable management with status tracking
- Communication system for project-specific messages

**Accessibility Considerations**:
- Ensure timeline visualization is accessible to screen readers
- Implement keyboard navigation for interactive elements
- Use semantic HTML for project listings
- Provide text alternatives for visual status indicators

### Task 3: Deliverable Approval

**Description**: Create a deliverable submission system with approval workflow, feedback mechanism, and revision tracking.

**Subtasks**:
- Create deliverable submission system
- Implement approval workflow
- Develop feedback mechanism
- Create revision tracking

**Acceptance Criteria**:
- Deliverable submission with file upload
- Multi-step approval workflow
- Feedback system with annotations
- Revision history and tracking

**Accessibility Considerations**:
- Ensure file upload is accessible
- Provide clear status updates for screen readers
- Implement keyboard-accessible feedback interface
- Ensure all interactive elements have proper focus management

### Task 4: Billing & Payments

**Description**: Implement invoice generation, payment processing integration, payment history, and receipt generation.

**Subtasks**:
- Implement invoice generation
- Create payment processing integration
- Develop payment history
- Implement receipt generation

**Acceptance Criteria**:
- Automated invoice generation based on project milestones
- Secure payment processing integration
- Payment history with filtering and search
- PDF receipt generation

**Accessibility Considerations**:
- Ensure invoice PDFs are accessible
- Implement keyboard-accessible payment forms
- Provide clear error messages for payment issues
- Ensure payment history is navigable by screen readers

## Deliverables

1. Fully functional client portal
2. Project management system
3. Deliverable approval workflow
4. Invoice and payment system

## Technical Implementation Details

### Client Dashboard Layout

```jsx
// ClientDashboard.js
import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import DashboardLayout from '../components/templates/DashboardLayout';
import ProjectSummary from '../components/organisms/ProjectSummary';
import NotificationCenter from '../components/organisms/NotificationCenter';
import UpcomingDeliverables from '../components/organisms/UpcomingDeliverables';
import RecentActivity from '../components/organisms/RecentActivity';
import QuickActions from '../components/molecules/QuickActions';

const ClientDashboard = ({ user, projects, notifications, deliverables, activities }) => {
  return (
    <DashboardLayout title="Dashboard" user={user}>
      <Container maxWidth="xl">
        <Box mb={4}>
          <QuickActions />
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <ProjectSummary projects={projects} />
              </Grid>
              
              <Grid item xs={12}>
                <UpcomingDeliverables deliverables={deliverables} />
              </Grid>
              
              <Grid item xs={12}>
                <RecentActivity activities={activities} />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <NotificationCenter notifications={notifications} />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default ClientDashboard;
```

### Project Timeline Component

```jsx
// ProjectTimeline.js
import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import TimelineItem from '../molecules/TimelineItem';

const TimelineContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const TimelineLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 4,
  backgroundColor: theme.palette.divider,
  height: '100%',
  zIndex: 0,
}));

const ProjectTimeline = ({ project }) => {
  const { milestones } = project;
  
  return (
    <TimelineContainer>
      <Typography variant="h3" gutterBottom>
        Project Timeline
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box position="relative" px={2} py={4}>
        <TimelineLine aria-hidden="true" />
        
        {milestones.map((milestone, index) => (
          <TimelineItem
            key={milestone.id}
            title={milestone.title}
            date={milestone.date}
            description={milestone.description}
            status={milestone.status}
            position={index % 2 === 0 ? 'left' : 'right'}
            isFirst={index === 0}
            isLast={index === milestones.length - 1}
          />
        ))}
      </Box>
    </TimelineContainer>
  );
};

export default ProjectTimeline;
```

### Deliverable Approval Workflow

```jsx
// DeliverableApproval.js
import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';
import DeliverableDetails from '../molecules/DeliverableDetails';
import FeedbackForm from '../molecules/FeedbackForm';
import ApprovalConfirmation from '../molecules/ApprovalConfirmation';

const steps = ['Review Deliverable', 'Provide Feedback', 'Approve or Request Revisions'];

const DeliverableApproval = ({ deliverable, onApprove, onRequestRevision }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [decision, setDecision] = useState(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFeedbackChange = (value) => {
    setFeedback(value);
  };

  const handleDecision = (value) => {
    setDecision(value);
    handleNext();
  };

  const handleSubmit = () => {
    if (decision === 'approve') {
      onApprove(deliverable.id, feedback);
    } else {
      onRequestRevision(deliverable.id, feedback);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DeliverableDetails deliverable={deliverable} />;
      case 1:
        return <FeedbackForm onChange={handleFeedbackChange} value={feedback} />;
      case 2:
        return (
          <ApprovalConfirmation
            deliverable={deliverable}
            feedback={feedback}
            onDecision={handleDecision}
          />
        );
      case 3:
        return (
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              {decision === 'approve' ? 'Deliverable Approved' : 'Revision Requested'}
            </Typography>
            <Typography variant="body1" paragraph>
              {decision === 'approve'
                ? 'The deliverable has been approved. The team will be notified.'
                : 'A revision has been requested. The team will be notified and will address your feedback.'}
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box my={4}>
        {getStepContent(activeStep)}
      </Box>
      
      <Box display="flex" justifyContent="space-between">
        <Button
          disabled={activeStep === 0 || activeStep === 3}
          onClick={handleBack}
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === 2}
          >
            Next
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default DeliverableApproval;
```

### Invoice Generation

```javascript
// invoiceService.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const generateInvoice = async (invoice, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      
      // Create write stream
      const writeStream = fs.createWriteStream(outputPath);
      doc.pipe(writeStream);
      
      // Add metadata for accessibility
      doc.info['Title'] = `Invoice #${invoice.invoiceNumber}`;
      doc.info['Author'] = 'LitSpark Brand Solutions';
      doc.info['Subject'] = `Invoice for ${invoice.client.name}`;
      doc.info['Keywords'] = 'invoice, payment, branding';
      
      // Header
      doc.fontSize(20).text('LitSpark Brand Solutions', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text(`Invoice #${invoice.invoiceNumber}`, { align: 'center' });
      doc.moveDown();
      
      // Client and Invoice Info
      doc.fontSize(12);
      doc.text('Bill To:', { continued: true }).text(invoice.client.name, { align: 'right' });
      doc.text('Date:', { continued: true }).text(format(invoice.date, 'MMMM dd, yyyy'), { align: 'right' });
      doc.text('Due Date:', { continued: true }).text(format(invoice.dueDate, 'MMMM dd, yyyy'), { align: 'right' });
      doc.moveDown(2);
      
      // Invoice Items
      const tableTop = doc.y;
      const itemX = 50;
      const descriptionX = 150;
      const quantityX = 350;
      const priceX = 400;
      const amountX = 450;
      
      doc.font('Helvetica-Bold');
      doc.text('Item', itemX, tableTop);
      doc.text('Description', descriptionX, tableTop);
      doc.text('Qty', quantityX, tableTop);
      doc.text('Price', priceX, tableTop);
      doc.text('Amount', amountX, tableTop);
      doc.moveDown();
      
      // Draw line
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();
      
      // Items
      doc.font('Helvetica');
      let totalAmount = 0;
      
      invoice.items.forEach(item => {
        const y = doc.y;
        doc.text(item.name, itemX, y);
        doc.text(item.description, descriptionX, y);
        doc.text(item.quantity.toString(), quantityX, y);
        doc.text(`$${item.price.toFixed(2)}`, priceX, y);
        doc.text(`$${(item.quantity * item.price).toFixed(2)}`, amountX, y);
        doc.moveDown();
        
        totalAmount += item.quantity * item.price;
      });
      
      // Draw line
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();
      
      // Total
      doc.font('Helvetica-Bold');
      doc.text('Total:', 350, doc.y);
      doc.text(`$${totalAmount.toFixed(2)}`, amountX, doc.y);
      
      // Footer
      const pageHeight = doc.page.height;
      doc.font('Helvetica');
      doc.fontSize(10).text(
        'Thank you for your business. Payment is due within 30 days.',
        50,
        pageHeight - 100,
        { align: 'center' }
      );
      
      // Finalize PDF
      doc.end();
      
      writeStream.on('finish', () => {
        resolve(outputPath);
      });
      
      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateInvoice };
```

## Accessibility Implementation

### Accessible Notification Center

```jsx
// NotificationCenter.js
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { format } from 'date-fns';

const NotificationContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
}));

const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const NotificationItem = styled(ListItem)(({ theme, unread }) => ({
  backgroundColor: unread ? theme.palette.action.hover : 'transparent',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

const NotificationCenter = ({ notifications = [] }) => {
  const [notificationItems, setNotificationItems] = useState(notifications);
  const [newNotifications, setNewNotifications] = useState([]);
  
  useEffect(() => {
    setNotificationItems(notifications);
    
    // Filter unread notifications for screen reader announcement
    const unreadNotifications = notifications.filter(notification => notification.unread);
    setNewNotifications(unreadNotifications);
  }, [notifications]);
  
  const unreadCount = notificationItems.filter(notification => notification.unread).length;
  
  const handleMarkAllRead = () => {
    setNotificationItems(prevItems =>
      prevItems.map(item => ({ ...item, unread: false }))
    );
  };
  
  const handleNotificationClick = (id) => {
    setNotificationItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };
  
  return (
    <NotificationContainer>
      <NotificationHeader>
        <Typography variant="h3" component="h2">
          Notifications
          {unreadCount > 0 && (
            <Typography
              component="span"
              variant="body2"
              sx={{ ml: 1, fontWeight: 'bold', color: 'primary.main' }}
            >
              ({unreadCount} new)
            </Typography>
          )}
        </Typography>
        
        {unreadCount > 0 && (
          <Button
            startIcon={<MarkEmailReadIcon />}
            onClick={handleMarkAllRead}
            aria-label="Mark all notifications as read"
          >
            Mark all read
          </Button>
        )}
      </NotificationHeader>
      
      <Divider sx={{ mb: 2 }} />
      
      {/* Visually hidden live region for screen readers */}
      {newNotifications.length > 0 && (
        <div
          aria-live="polite"
          className="sr-only"
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}
        >
          You have {newNotifications.length} new notification{newNotifications.length !== 1 ? 's' : ''}.
        </div>
      )}
      
      {notificationItems.length > 0 ? (
        <List aria-label="Notifications list">
          {notificationItems.map((notification) => (
            <NotificationItem
              key={notification.id}
              unread={notification.unread}
              button
              onClick={() => handleNotificationClick(notification.id)}
              aria-pressed={!notification.unread}
            >
              <ListItemIcon>
                <NotificationsIcon color={notification.unread ? 'primary' : 'action'} />
              </ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    {notification.message}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}
                    >
                      {format(new Date(notification.date), 'MMM dd, yyyy • h:mm a')}
                    </Typography>
                  </>
                }
              />
            </NotificationItem>
          ))}
        </List>
      ) : (
        <Box textAlign="center" py={4}>
          <Typography variant="body1">No notifications</Typography>
        </Box>
      )}
      
      {notificationItems.length > 0 && (
        <Box textAlign="center" mt={2}>
          <Button variant="text" color="primary">
            View all notifications
          </Button>
        </Box>
      )}
    </NotificationContainer>
  );
};

export default NotificationCenter;
```

## Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Complex client portal UX causing confusion | High | Medium | User testing and intuitive design with clear instructions |
| Security vulnerabilities in payment processing | High | Medium | Use established payment gateways and security best practices |
| Deliverable approval workflow complexity | Medium | Medium | Clear status indicators and guided workflow |
| Performance issues with large files in deliverables | High | Medium | Implement file size limits and optimization |

## Definition of Done

- Client dashboard is fully functional with project overview
- Project management features are implemented and tested
- Deliverable approval workflow is operational
- Invoice and payment system is secure and functional
- All components meet WCAG 2.1 AA accessibility standards
- All code follows established coding standards
- Unit and integration tests are implemented
