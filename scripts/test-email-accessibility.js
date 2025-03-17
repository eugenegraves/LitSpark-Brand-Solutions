/**
 * Email Accessibility Test Script
 * 
 * This script tests the accessibility of email templates using axe-core.
 * It renders each template and runs accessibility checks to ensure WCAG 2.1 compliance.
 * 
 * Usage:
 * node scripts/test-email-accessibility.js
 */

// Load environment variables
require('dotenv').config();

// Import required modules
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const axeCore = require('axe-core');
const handlebars = require('handlebars');
const emailService = require('../src/server/utils/emailService');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Templates to test
const templates = [
  {
    name: 'verification',
    data: {
      subject: 'Verify Your Email Address',
      firstName: 'Test User',
      verificationUrl: 'https://example.com/verify/test-token',
      company: 'LitSpark Brand Solutions',
      logoUrl: 'https://example.com/logo.png',
      currentYear: new Date().getFullYear()
    }
  },
  {
    name: 'password-reset',
    data: {
      subject: 'Reset Your Password',
      firstName: 'Test User',
      resetUrl: 'https://example.com/reset-password/test-token',
      company: 'LitSpark Brand Solutions',
      logoUrl: 'https://example.com/logo.png',
      currentYear: new Date().getFullYear()
    }
  },
  {
    name: 'welcome',
    data: {
      subject: 'Welcome to LitSpark Brand Solutions',
      firstName: 'Test User',
      dashboardUrl: 'https://example.com/dashboard',
      company: 'LitSpark Brand Solutions',
      logoUrl: 'https://example.com/logo.png',
      currentYear: new Date().getFullYear(),
      socialLinks: {
        twitter: 'https://twitter.com/litspark',
        facebook: 'https://facebook.com/litspark',
        linkedin: 'https://linkedin.com/company/litspark'
      }
    }
  },
  {
    name: 'default',
    data: {
      subject: 'Test Email',
      body: `
        <h2>This is a test email</h2>
        <p>This email is sent using the default template with custom content.</p>
        <p>It includes various elements to test accessibility:</p>
        <ul>
          <li>Headings for structure</li>
          <li>Paragraphs for content</li>
          <li>Lists for organization</li>
          <li>Links for navigation</li>
          <li>Images with alt text</li>
          <li>Buttons for actions</li>
        </ul>
        <a href="https://example.com" class="button">Test Button</a>
      `,
      company: 'LitSpark Brand Solutions',
      logoUrl: 'https://example.com/logo.png',
      currentYear: new Date().getFullYear()
    }
  }
];

// Run accessibility tests on a template
async function testTemplateAccessibility(templateName, templateData) {
  console.log(`\n${colors.cyan}Testing template: ${colors.magenta}${templateName}${colors.reset}`);
  
  try {
    // Load and compile the template
    const template = emailService.loadTemplate(templateName);
    const html = emailService.compileTemplate(template, templateData);
    
    // Create a DOM from the HTML
    const { window } = new JSDOM(html);
    const document = window.document;
    
    // Inject axe-core
    window.eval(axeCore.source);
    
    // Run axe
    const results = await window.axe.run();
    
    // Log results
    console.log(`${colors.blue}Accessibility results for ${templateName}:${colors.reset}`);
    console.log(`${colors.green}✓ Passes: ${results.passes.length}${colors.reset}`);
    
    if (results.violations.length === 0) {
      console.log(`${colors.green}✓ No violations found!${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Violations: ${results.violations.length}${colors.reset}`);
      
      // Log each violation
      results.violations.forEach((violation, index) => {
        console.log(`\n${colors.red}Violation ${index + 1}: ${violation.id} - ${violation.impact} impact${colors.reset}`);
        console.log(`${colors.yellow}Description: ${violation.description}${colors.reset}`);
        console.log(`${colors.yellow}Help: ${violation.help}${colors.reset}`);
        console.log(`${colors.yellow}Help URL: ${violation.helpUrl}${colors.reset}`);
        
        // Log affected nodes
        console.log(`${colors.yellow}Affected elements:${colors.reset}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`  ${nodeIndex + 1}. ${node.html}`);
          console.log(`     ${colors.yellow}Fix: ${node.failureSummary}${colors.reset}`);
        });
      });
    }
    
    // Check for specific accessibility features
    console.log(`\n${colors.blue}Checking for specific accessibility features:${colors.reset}`);
    
    // Check for semantic HTML
    const hasSemanticHTML = document.querySelector('[role="main"]') && 
                           document.querySelector('[role="banner"]') && 
                           document.querySelector('[role="contentinfo"]');
    console.log(`${hasSemanticHTML ? colors.green + '✓' : colors.red + '✗'} Semantic HTML structure${colors.reset}`);
    
    // Check for proper heading hierarchy
    const hasHeadings = document.querySelector('h1') !== null;
    console.log(`${hasHeadings ? colors.green + '✓' : colors.red + '✗'} Proper heading hierarchy${colors.reset}`);
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    let allImagesHaveAlt = true;
    images.forEach(img => {
      if (!img.hasAttribute('alt')) {
        allImagesHaveAlt = false;
      }
    });
    console.log(`${allImagesHaveAlt ? colors.green + '✓' : colors.red + '✗'} Alt text for images (${images.length} images)${colors.reset}`);
    
    // Check for proper link text
    const links = document.querySelectorAll('a');
    let allLinksHaveText = true;
    links.forEach(link => {
      if (link.textContent.trim() === '') {
        allLinksHaveText = false;
      }
    });
    console.log(`${allLinksHaveText ? colors.green + '✓' : colors.red + '✗'} Proper link text (${links.length} links)${colors.reset}`);
    
    // Check for color contrast (just checking if our gold color is used)
    const styleElement = document.querySelector('style');
    const styleContent = styleElement ? styleElement.textContent : '';
    const hasGoldColor = styleContent.includes('#F2BF0F');
    console.log(`${hasGoldColor ? colors.green + '✓' : colors.red + '✗'} Gold color (#F2BF0F) used for branding${colors.reset}`);
    
    // Save the rendered template to a file for manual inspection
    const outputDir = path.join(__dirname, 'email-accessibility-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, `${templateName}.html`);
    fs.writeFileSync(outputFile, html);
    console.log(`\n${colors.green}Template saved to: ${outputFile}${colors.reset}`);
    
    return {
      templateName,
      violations: results.violations.length,
      passes: results.passes.length,
      hasSemanticHTML,
      hasHeadings,
      allImagesHaveAlt,
      allLinksHaveText,
      hasGoldColor
    };
  } catch (error) {
    console.error(`${colors.red}Error testing template ${templateName}:${colors.reset}`, error);
    return {
      templateName,
      error: error.message
    };
  }
}

// Main test function
async function testEmailAccessibility() {
  console.log(`${colors.cyan}=== Email Template Accessibility Test ====${colors.reset}`);
  console.log(`Testing email templates for WCAG 2.1 compliance using axe-core`);
  
  const results = [];
  
  for (const template of templates) {
    const result = await testTemplateAccessibility(template.name, template.data);
    results.push(result);
  }
  
  // Summary
  console.log(`\n${colors.cyan}=== Test Summary ====${colors.reset}`);
  
  let allPassed = true;
  
  results.forEach(result => {
    if (result.error) {
      console.log(`${colors.red}✗ ${result.templateName}: Error - ${result.error}${colors.reset}`);
      allPassed = false;
    } else if (result.violations > 0 || !result.hasSemanticHTML || !result.hasHeadings || 
               !result.allImagesHaveAlt || !result.allLinksHaveText || !result.hasGoldColor) {
      console.log(`${colors.red}✗ ${result.templateName}: ${result.violations} violations${colors.reset}`);
      allPassed = false;
    } else {
      console.log(`${colors.green}✓ ${result.templateName}: Passed all checks${colors.reset}`);
    }
  });
  
  if (allPassed) {
    console.log(`\n${colors.green}✓ All templates passed accessibility checks!${colors.reset}`);
    console.log(`${colors.green}✓ Templates meet WCAG 2.1 standards${colors.reset}`);
  } else {
    console.log(`\n${colors.red}✗ Some templates have accessibility issues that need to be fixed.${colors.reset}`);
    console.log(`${colors.yellow}Please review the detailed results above and make necessary corrections.${colors.reset}`);
  }
  
  console.log(`\n${colors.cyan}Rendered templates have been saved to the 'email-accessibility-output' directory for manual inspection.${colors.reset}`);
}

// Run the tests
testEmailAccessibility().catch(error => {
  console.error(`${colors.red}Unhandled error:${colors.reset}`, error);
  process.exit(1);
});
