# Sprint 5: Admin System & Integration

## Overview

**Duration**: 3 weeks (June 22 - July 12, 2025)

Sprint 5 focuses on developing the administrative dashboard, implementing content management system, creating reporting and analytics, and integrating third-party services.

## Goals

1. Develop administrative dashboard
2. Implement content management system
3. Create reporting and analytics
4. Integrate third-party services

## Tasks

### Task 1: Admin Dashboard

**Description**: Create an administrative dashboard interface with user management, settings, and activity monitoring.

**Subtasks**:
- Create admin dashboard interface
- Implement user management
- Develop settings and configuration
- Create activity monitoring

**Acceptance Criteria**:
- Admin dashboard with key metrics and overview
- User management with role assignment
- System settings and configuration
- Activity monitoring and audit logs

**Accessibility Considerations**:
- Ensure dashboard components are keyboard navigable
- Implement proper heading hierarchy for screen readers
- Use ARIA live regions for dynamic content updates
- Ensure color contrast meets WCAG 2.1 AA standards with the gold (#F2BF0F) and gray color scheme

### Task 2: Content Management

**Description**: Implement a content management system for portfolio, blog, services, and testimonials.

**Subtasks**:
- Implement portfolio management
- Create blog and resource management
- Develop service and pricing management
- Implement testimonial management

**Acceptance Criteria**:
- Portfolio management with image upload and metadata
- Blog and resource content editor with preview
- Service and pricing management with version control
- Testimonial management with approval workflow

**Accessibility Considerations**:
- Ensure content editor supports accessibility features
- Implement accessible image upload with alt text requirements
- Create keyboard-accessible content management interface
- Provide clear instructions for creating accessible content

### Task 3: Reporting & Analytics

**Description**: Create business analytics dashboard, inquiry tracking, financial reporting, and custom report generation.

**Subtasks**:
- Create business analytics dashboard
- Implement inquiry and conversion tracking
- Develop financial reporting
- Create custom report generation

**Acceptance Criteria**:
- Business analytics dashboard with key metrics
- Inquiry and conversion tracking with visualizations
- Financial reporting with revenue and expense analysis
- Custom report generation with export options

**Accessibility Considerations**:
- Ensure data visualizations have text alternatives
- Implement keyboard-accessible interactive charts
- Provide screen reader support for data tables
- Create accessible PDF export for reports

### Task 4: Third-Party Integrations

**Description**: Implement integrations with payment gateways, email marketing, social media, and analytics services.

**Subtasks**:
- Implement payment gateway integration
- Create email marketing integration
- Develop social media connections
- Implement analytics tracking

**Acceptance Criteria**:
- Secure payment gateway integration with major providers
- Email marketing integration with list management
- Social media connection for content sharing
- Analytics tracking with custom events

**Accessibility Considerations**:
- Ensure third-party integrations maintain accessibility
- Implement accessible payment forms
- Create accessible email templates
- Ensure analytics tracking respects user privacy settings

## Deliverables

1. Complete administrative system
2. Content management functionality
3. Reporting and analytics dashboard
4. Third-party service integrations

## Technical Implementation Details

### Admin Dashboard Layout

```jsx
// AdminDashboard.js
import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import AdminLayout from '../components/templates/AdminLayout';
import MetricsOverview from '../components/organisms/MetricsOverview';
import RecentActivity from '../components/organisms/RecentActivity';
import PendingApprovals from '../components/organisms/PendingApprovals';
import QuickActions from '../components/molecules/QuickActions';

const AdminDashboard = ({ metrics, activities, approvals }) => {
  return (
    <AdminLayout title="Admin Dashboard">
      <Container maxWidth="xl">
        <Box mb={4}>
          <QuickActions />
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MetricsOverview metrics={metrics} />
          </Grid>
          
          <Grid item xs={12} md={7}>
            <RecentActivity activities={activities} />
          </Grid>
          
          <Grid item xs={12} md={5}>
            <PendingApprovals approvals={approvals} />
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
```

### Content Management System

```jsx
// ContentEditor.js
import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImageUpload from '../molecules/ImageUpload';
import AccessibilityChecklist from '../molecules/AccessibilityChecklist';

const ContentEditor = ({ initialContent = '', onSave, contentType }) => {
  const [title, setTitle] = useState(initialContent.title || '');
  const [category, setCategory] = useState(initialContent.category || '');
  const [featuredImage, setFeaturedImage] = useState(initialContent.featuredImage || null);
  const [imageAlt, setImageAlt] = useState(initialContent.imageAlt || '');
  const [editorState, setEditorState] = useState(() => {
    if (initialContent.content) {
      const contentBlock = htmlToDraft(initialContent.content);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });
  const [accessibilityChecks, setAccessibilityChecks] = useState({
    headingStructure: false,
    imageAlt: false,
    colorContrast: false,
    semanticMarkup: false,
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleImageChange = (image) => {
    setFeaturedImage(image);
  };

  const handleImageAltChange = (e) => {
    setImageAlt(e.target.value);
  };

  const handleAccessibilityCheck = (check, value) => {
    setAccessibilityChecks(prev => ({
      ...prev,
      [check]: value
    }));
  };

  const handleSave = () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    
    onSave({
      title,
      category,
      content,
      featuredImage,
      imageAlt,
      accessibilityChecks,
    });
  };

  const categories = {
    blog: ['Brand Strategy', 'Color Theory', 'Design Trends', 'Marketing'],
    portfolio: ['Logo Design', 'Brand Identity', 'Website Design', 'Print Materials'],
    service: ['Strategy', 'Design', 'Development', 'Marketing'],
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={4}>
        <Typography variant="h2" gutterBottom>
          {initialContent.id ? 'Edit' : 'Create'} {contentType}
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            required
            inputProps={{
              'aria-required': 'true',
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories[contentType]?.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Featured Image
            </Typography>
            <ImageUpload
              initialImage={featuredImage}
              onChange={handleImageChange}
              aria-label="Upload featured image"
            />
          </Box>
          
          <TextField
            label="Image Alt Text"
            variant="outlined"
            fullWidth
            value={imageAlt}
            onChange={handleImageAltChange}
            required
            helperText="Provide descriptive alt text for accessibility"
            inputProps={{
              'aria-required': 'true',
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Content
          </Typography>
          <Box
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="editor-wrapper"
              editorClassName="editor"
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'image', 'history'],
                inline: {
                  options: ['bold', 'italic', 'underline'],
                },
                blockType: {
                  options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6'],
                },
              }}
              ariaLabel="Content editor"
            />
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <AccessibilityChecklist
            checks={accessibilityChecks}
            onChange={handleAccessibilityCheck}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined">Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!title || !imageAlt}
            >
              Save {contentType}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContentEditor;
```

### Analytics Dashboard

```jsx
// AnalyticsDashboard.js
import React, { useState } from 'react';
import { Container, Grid, Paper, Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminLayout from '../components/templates/AdminLayout';
import MetricsCard from '../components/molecules/MetricsCard';
import LineChart from '../components/molecules/LineChart';
import PieChart from '../components/molecules/PieChart';
import DataTable from '../components/molecules/DataTable';
import DateRangePicker from '../components/molecules/DateRangePicker';

const TabPanel = ({ children, value, index, ...props }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...props}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const AnalyticsDashboard = ({ data }) => {
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  return (
    <AdminLayout title="Analytics Dashboard">
      <Container maxWidth="xl">
        <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h2">Analytics Dashboard</Typography>
          <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
          />
        </Box>
        
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} sm={6} lg={3}>
            <MetricsCard
              title="Website Visitors"
              value={data.visitors.total}
              change={data.visitors.change}
              icon="visitors"
              description="Total website visitors in selected period"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MetricsCard
              title="Inquiries"
              value={data.inquiries.total}
              change={data.inquiries.change}
              icon="inquiries"
              description="Total inquiries received in selected period"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MetricsCard
              title="Conversion Rate"
              value={`${data.conversionRate.value}%`}
              change={data.conversionRate.change}
              icon="conversion"
              description="Visitor to inquiry conversion rate"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MetricsCard
              title="Revenue"
              value={`$${data.revenue.total.toLocaleString()}`}
              change={data.revenue.change}
              icon="revenue"
              description="Total revenue in selected period"
            />
          </Grid>
        </Grid>
        
        <Paper>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Analytics tabs"
          >
            <Tab label="Overview" id="analytics-tab-0" aria-controls="analytics-tabpanel-0" />
            <Tab label="Traffic" id="analytics-tab-1" aria-controls="analytics-tabpanel-1" />
            <Tab label="Conversions" id="analytics-tab-2" aria-controls="analytics-tabpanel-2" />
            <Tab label="Revenue" id="analytics-tab-3" aria-controls="analytics-tabpanel-3" />
          </StyledTabs>
          
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={8}>
                <LineChart
                  data={data.visitorsTrend}
                  title="Website Traffic"
                  xAxisLabel="Date"
                  yAxisLabel="Visitors"
                  ariaLabel="Line chart showing website traffic over time"
                />
              </Grid>
              
              <Grid item xs={12} lg={4}>
                <PieChart
                  data={data.trafficSources}
                  title="Traffic Sources"
                  ariaLabel="Pie chart showing traffic sources breakdown"
                />
              </Grid>
              
              <Grid item xs={12}>
                <DataTable
                  title="Top Pages"
                  data={data.topPages}
                  columns={[
                    { id: 'page', label: 'Page' },
                    { id: 'views', label: 'Views' },
                    { id: 'avgTime', label: 'Avg. Time' },
                    { id: 'bounceRate', label: 'Bounce Rate' },
                  ]}
                  ariaLabel="Table showing top performing pages"
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Additional tab panels would be implemented similarly */}
        </Paper>
      </Container>
    </AdminLayout>
  );
};

export default AnalyticsDashboard;
```

### Third-Party Integration

```javascript
// paymentService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');
const EmailService = require('./emailService');

const createPaymentIntent = async (invoiceId) => {
  try {
    const invoice = await Invoice.findById(invoiceId).populate('client');
    
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    
    const amount = Math.round(invoice.totalAmount * 100); // Convert to cents
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        invoiceId: invoice._id.toString(),
        clientId: invoice.client._id.toString(),
      },
    });
    
    return {
      clientSecret: paymentIntent.client_secret,
      amount: invoice.totalAmount,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

const handlePaymentSuccess = async (paymentIntent) => {
  try {
    const { invoiceId, clientId } = paymentIntent.metadata;
    
    // Update invoice status
    const invoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { status: 'paid', paidDate: new Date() },
      { new: true }
    );
    
    // Create payment record
    const payment = await Payment.create({
      invoice: invoiceId,
      client: clientId,
      amount: paymentIntent.amount / 100, // Convert from cents
      paymentMethod: 'credit_card',
      transactionId: paymentIntent.id,
      status: 'completed',
      date: new Date(),
    });
    
    // Send receipt email
    await EmailService.sendPaymentReceipt(invoice, payment);
    
    return payment;
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
};

module.exports = {
  createPaymentIntent,
  handlePaymentSuccess,
};
```

## Accessibility Implementation

### Accessible Data Visualization

```jsx
// AccessibleChart.js
import React, { useRef, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  height: 300,
}));

const ScreenReaderText = styled('div')({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
});

const AccessibleChart = ({
  type,
  data,
  options,
  title,
  description,
  tableData,
  tableColumns,
  ariaLabel,
}) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;
  const tableId = `table-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      
      // Destroy previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      
      // Create new chart
      chartRef.current = new Chart(ctx, {
        type,
        data,
        options: {
          ...options,
          plugins: {
            ...(options?.plugins || {}),
            htmlLegend: {
              containerID: `legend-${chartId}`,
            },
          },
        },
      });
    }
    
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, options, chartId]);

  return (
    <Box>
      <Typography variant="h3" gutterBottom id={`${chartId}-title`}>
        {title}
      </Typography>
      
      {description && (
        <Typography variant="body2" color="text.secondary" paragraph id={`${chartId}-desc`}>
          {description}
        </Typography>
      )}
      
      <ChartContainer>
        <canvas
          ref={canvasRef}
          aria-labelledby={`${chartId}-title ${chartId}-desc`}
          role="img"
        />
        
        <div id={`legend-${chartId}`} aria-hidden="true" />
      </ChartContainer>
      
      <ScreenReaderText>
        <Typography variant="srOnly">
          {ariaLabel || `${type} chart showing ${title}`}
        </Typography>
        <Link href={`#${tableId}`}>
          Skip to data table for this chart
        </Link>
      </ScreenReaderText>
      
      <Box mt={2} id={tableId} tabIndex="0">
        <Typography variant="h4" gutterBottom>
          Data Table for {title}
        </Typography>
        
        <Box sx={{ overflowX: 'auto' }}>
          <table aria-label={`Data table for ${title}`}>
            <thead>
              <tr>
                {tableColumns.map((column) => (
                  <th key={column.id} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {tableColumns.map((column) => (
                    <td key={column.id}>
                      {row[column.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default AccessibleChart;
```

## Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Complex admin interface leading to user errors | Medium | Medium | User testing and intuitive design with clear instructions |
| Third-party API changes breaking integrations | High | Medium | Implement adapter pattern and monitoring for API changes |
| Data security concerns with analytics | High | Low | Implement data anonymization and proper security measures |
| Accessibility issues with data visualizations | Medium | High | Provide alternative data representations and screen reader support |

## Definition of Done

- Administrative dashboard is fully functional
- Content management system is implemented for all content types
- Reporting and analytics dashboard provides actionable insights
- Third-party integrations are secure and functional
- All components meet WCAG 2.1 AA accessibility standards
- All code follows established coding standards
- Unit and integration tests are implemented
