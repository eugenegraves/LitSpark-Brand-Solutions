/**
 * File Upload Service Test Script
 * 
 * This script tests the file upload service by creating and uploading test files,
 * retrieving them, and then deleting them. It tests both public and private storage.
 * 
 * Usage:
 * node scripts/test-file-upload-service.js
 */

// Load environment variables
require('dotenv').config();

// Import required modules
const fs = require('fs');
const path = require('path');
const fileUploadService = require('../src/server/utils/fileUploadService');

// Create test directory if it doesn't exist
const TEST_DIR = path.join(__dirname, 'test-files');
if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

// Test files to create
const testFiles = [
  {
    name: 'test-image.jpg',
    content: Buffer.from('Test image content'),
    type: 'image/jpeg'
  },
  {
    name: 'test-document.pdf',
    content: Buffer.from('Test PDF document content'),
    type: 'application/pdf'
  },
  {
    name: 'test-text.txt',
    content: Buffer.from('Test text file content'),
    type: 'text/plain'
  }
];

// Create test files
function createTestFiles() {
  console.log('Creating test files...');
  
  testFiles.forEach(file => {
    const filePath = path.join(TEST_DIR, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`✅ Created test file: ${file.name}`);
  });
  
  return testFiles.map(file => ({
    originalname: file.name,
    buffer: file.content,
    mimetype: file.type,
    size: file.content.length,
    path: path.join(TEST_DIR, file.name)
  }));
}

// Test function to upload, retrieve, and delete files
async function testFileUploadService() {
  console.log('Starting file upload service test...');
  
  try {
    // Create test files
    const files = createTestFiles();
    const uploadedFiles = [];
    
    // Test file uploads (public)
    console.log('\nTesting public file uploads...');
    for (const file of files) {
      console.log(`Uploading ${file.originalname} to public storage...`);
      const filename = await fileUploadService.storeFile(file, false);
      uploadedFiles.push({ filename, isPrivate: false });
      console.log(`✅ Uploaded file: ${filename}`);
      
      // Test metadata extraction
      console.log(`Extracting accessibility metadata for ${file.originalname}...`);
      const metadata = fileUploadService.extractAccessibilityMetadata(file);
      console.log('✅ Extracted metadata:', metadata);
    }
    
    // Test file uploads (private)
    console.log('\nTesting private file uploads...');
    for (const file of files) {
      console.log(`Uploading ${file.originalname} to private storage...`);
      const filename = await fileUploadService.storeFile(file, true);
      uploadedFiles.push({ filename, isPrivate: true });
      console.log(`✅ Uploaded file: ${filename}`);
    }
    
    // Test file retrieval
    console.log('\nTesting file retrieval...');
    for (const { filename, isPrivate } of uploadedFiles) {
      console.log(`Retrieving file: ${filename} (${isPrivate ? 'private' : 'public'})...`);
      const fileContent = await fileUploadService.getFile(filename, isPrivate);
      console.log(`✅ Retrieved file: ${filename} (${fileContent.length} bytes)`);
    }
    
    // Test file deletion
    console.log('\nTesting file deletion...');
    for (const { filename, isPrivate } of uploadedFiles) {
      console.log(`Deleting file: ${filename} (${isPrivate ? 'private' : 'public'})...`);
      await fileUploadService.deleteFile(filename, isPrivate);
      console.log(`✅ Deleted file: ${filename}`);
    }
    
    // Clean up test files
    console.log('\nCleaning up test files...');
    testFiles.forEach(file => {
      const filePath = path.join(TEST_DIR, file.name);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`✅ Deleted test file: ${file.name}`);
      }
    });
    
    // Try to remove test directory
    if (fs.existsSync(TEST_DIR)) {
      fs.rmdirSync(TEST_DIR);
      console.log(`✅ Removed test directory: ${TEST_DIR}`);
    }
    
    console.log('\n✅ All file upload tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error during file upload test:', error);
    process.exit(1);
  }
}

// Run the test
testFileUploadService();
