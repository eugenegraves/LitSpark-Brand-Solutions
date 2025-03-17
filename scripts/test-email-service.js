/**
 * Email Service Test Script
 * 
 * This script tests the email service by sending test emails using the
 * verification, password reset, and welcome email templates.
 * 
 * Usage:
 * node scripts/test-email-service.js
 */

// Load environment variables
require('dotenv').config();

// Import the email service
const emailService = require('../src/server/utils/emailService');

// Define test recipient
const TEST_RECIPIENT = process.env.TEST_EMAIL || 'test@example.com';

// Test function to send all email types
async function testEmailService() {
  console.log('Starting email service test...');
  console.log(`Sending test emails to: ${TEST_RECIPIENT}`);
  
  try {
    // Test verification email
    console.log('\nSending verification email...');
    await emailService.sendVerificationEmail({
      email: TEST_RECIPIENT,
      firstName: 'Test User',
      verificationUrl: 'https://example.com/verify/test-token',
      company: 'LitSpark Brand Solutions'
    });
    console.log('✅ Verification email sent successfully');
    
    // Test password reset email
    console.log('\nSending password reset email...');
    await emailService.sendPasswordResetEmail({
      email: TEST_RECIPIENT,
      firstName: 'Test User',
      resetUrl: 'https://example.com/reset-password/test-token',
      company: 'LitSpark Brand Solutions'
    });
    console.log('✅ Password reset email sent successfully');
    
    // Test welcome email
    console.log('\nSending welcome email...');
    await emailService.sendWelcomeEmail({
      email: TEST_RECIPIENT,
      firstName: 'Test User',
      dashboardUrl: 'https://example.com/dashboard',
      company: 'LitSpark Brand Solutions',
      socialLinks: {
        twitter: 'https://twitter.com/litspark',
        facebook: 'https://facebook.com/litspark',
        linkedin: 'https://linkedin.com/company/litspark'
      }
    });
    console.log('✅ Welcome email sent successfully');
    
    // Test custom email
    console.log('\nSending custom email...');
    await emailService.sendEmail({
      to: TEST_RECIPIENT,
      subject: 'Custom Test Email',
      body: `
        <h2>This is a custom test email</h2>
        <p>This email is sent using the default template with custom content.</p>
        <p>It includes:</p>
        <ul>
          <li>A heading</li>
          <li>Paragraphs</li>
          <li>A list</li>
          <li>A button</li>
        </ul>
        <a href="https://example.com" class="button">Test Button</a>
      `
    });
    console.log('✅ Custom email sent successfully');
    
    console.log('\n✅ All test emails sent successfully!');
    console.log(`Check ${TEST_RECIPIENT} inbox to verify the emails and their accessibility features.`);
    
  } catch (error) {
    console.error('\n❌ Error sending test emails:', error);
    process.exit(1);
  }
}

// Run the test
testEmailService();
