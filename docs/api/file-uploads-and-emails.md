# File Uploads and Emails API Documentation

This document provides comprehensive documentation for the file upload and email functionality in the LitSpark Brand Solutions API.

## Table of Contents

1. [File Upload Endpoints](#file-upload-endpoints)
   - [Upload Single File](#upload-single-file)
   - [Upload Multiple Files](#upload-multiple-files)
   - [Get File](#get-file)
   - [Delete File](#delete-file)
2. [Email Endpoints](#email-endpoints)
   - [Send Verification Email](#send-verification-email)
   - [Send Password Reset Email](#send-password-reset-email)
   - [Send Welcome Email](#send-welcome-email)
3. [Accessibility Features](#accessibility-features)
4. [Environment Configuration](#environment-configuration)

## File Upload Endpoints

All file upload endpoints include validation for file types, sizes, and proper sanitization of filenames. Files can be stored in either public or private storage based on the requirements.

### Upload Single File

Uploads a single file to the server.

**URL**: `/api/uploads/file`

**Method**: `POST`

**Authentication Required**: Yes

**Permissions Required**: User

**Request Body**: Form data with a file field named `file`

**Query Parameters**:
- `isPrivate` (boolean, optional): Whether to store the file in private storage. Default: `false`

**Success Response**:

- **Code**: 201 Created
- **Content**:
  ```json
  {
    "success": true,
    "file": {
      "originalName": "example.jpg",
      "filename": "1234567890-example.jpg",
      "path": "/uploads/public/1234567890-example.jpg",
      "size": 12345,
      "mimetype": "image/jpeg",
      "accessibilityMetadata": {
        "altText": "Description of the image",
        "title": "Image title",
        "keywords": ["keyword1", "keyword2"],
        "description": "Detailed description"
      }
    }
  }
  ```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: `{ "success": false, "error": "No file uploaded" }`
  - **Content**: `{ "success": false, "error": "Invalid file type" }`
  - **Content**: `{ "success": false, "error": "File too large" }`

- **Code**: 401 Unauthorized
  - **Content**: `{ "success": false, "error": "Authentication required" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "success": false, "error": "Error uploading file" }`

### Upload Multiple Files

Uploads multiple files to the server.

**URL**: `/api/uploads/files`

**Method**: `POST`

**Authentication Required**: Yes

**Permissions Required**: User

**Request Body**: Form data with a file field named `files` (multiple)

**Query Parameters**:
- `isPrivate` (boolean, optional): Whether to store the files in private storage. Default: `false`

**Success Response**:

- **Code**: 201 Created
- **Content**:
  ```json
  {
    "success": true,
    "files": [
      {
        "originalName": "example1.jpg",
        "filename": "1234567890-example1.jpg",
        "path": "/uploads/public/1234567890-example1.jpg",
        "size": 12345,
        "mimetype": "image/jpeg",
        "accessibilityMetadata": {
          "altText": "Description of the image",
          "title": "Image title",
          "keywords": ["keyword1", "keyword2"],
          "description": "Detailed description"
        }
      },
      {
        "originalName": "example2.pdf",
        "filename": "0987654321-example2.pdf",
        "path": "/uploads/public/0987654321-example2.pdf",
        "size": 54321,
        "mimetype": "application/pdf",
        "accessibilityMetadata": {
          "title": "Document title",
          "description": "Document description",
          "keywords": ["keyword1", "keyword2"],
          "author": "Author name"
        }
      }
    ]
  }
  ```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: `{ "success": false, "error": "No files uploaded" }`
  - **Content**: `{ "success": false, "error": "Invalid file type" }`
  - **Content**: `{ "success": false, "error": "File too large" }`

- **Code**: 401 Unauthorized
  - **Content**: `{ "success": false, "error": "Authentication required" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "success": false, "error": "Error uploading files" }`

### Get File

Retrieves a file from the server.

**URL**: `/api/uploads/file/:filename`

**Method**: `GET`

**Authentication Required**: Depends on `isPrivate`

**Permissions Required**: User (for private files)

**URL Parameters**:
- `filename` (string, required): The name of the file to retrieve

**Query Parameters**:
- `isPrivate` (boolean, optional): Whether the file is in private storage. Default: `false`

**Success Response**:

- **Code**: 200 OK
- **Content**: The file content with appropriate Content-Type header

**Error Responses**:

- **Code**: 404 Not Found
  - **Content**: `{ "success": false, "error": "File not found" }`

- **Code**: 401 Unauthorized
  - **Content**: `{ "success": false, "error": "Authentication required" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "success": false, "error": "Error retrieving file" }`

### Delete File

Deletes a file from the server.

**URL**: `/api/uploads/file/:filename`

**Method**: `DELETE`

**Authentication Required**: Yes

**Permissions Required**: User (for own files) or Admin

**URL Parameters**:
- `filename` (string, required): The name of the file to delete

**Query Parameters**:
- `isPrivate` (boolean, optional): Whether the file is in private storage. Default: `false`

**Success Response**:

- **Code**: 200 OK
- **Content**: `{ "success": true, "message": "File deleted successfully" }`

**Error Responses**:

- **Code**: 404 Not Found
  - **Content**: `{ "success": false, "error": "File not found" }`

- **Code**: 401 Unauthorized
  - **Content**: `{ "success": false, "error": "Authentication required" }`

- **Code**: 403 Forbidden
  - **Content**: `{ "success": false, "error": "Permission denied" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "success": false, "error": "Error deleting file" }`

## Email Endpoints

All email templates are designed to be accessible following WCAG 2.1 standards. They include proper semantic HTML, color contrast, and text alternatives for non-text content.

### Send Verification Email

Sends an email with a verification link to the user.

**URL**: `/api/auth/verify-email`

**Method**: `POST`

**Authentication Required**: No

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**: `{ "success": true, "message": "Verification email sent" }`

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: `{ "success": false, "error": "Email is required" }`
  - **Content**: `{ "success": false, "error": "Invalid email format" }`

- **Code**: 404 Not Found
  - **Content**: `{ "success": false, "error": "User not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "success": false, "error": "Error sending verification email" }`

### Send Password Reset Email

Sends an email with a password reset link to the user.

**URL**: `/api/auth/forgot-password`

**Method**: `POST`

**Authentication Required**: No

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**: `{ "success": true, "message": "Password reset email sent" }`

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: `{ "success": false, "error": "Email is required" }`
  - **Content**: `{ "success": false, "error": "Invalid email format" }`

- **Code**: 404 Not Found
  - **Content**: `{ "success": false, "error": "User not found" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "success": false, "error": "Error sending password reset email" }`

### Send Welcome Email

Sends a welcome email to a newly registered user.

**URL**: `/api/auth/welcome`

**Method**: `POST`

**Authentication Required**: Yes (Admin only)

**Request Body**:
```json
{
  "email": "user@example.com",
  "firstName": "John"
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**: `{ "success": true, "message": "Welcome email sent" }`

**Error Responses**:

- **Code**: 400 Bad Request
  - **Content**: `{ "success": false, "error": "Email is required" }`
  - **Content**: `{ "success": false, "error": "Invalid email format" }`

- **Code**: 401 Unauthorized
  - **Content**: `{ "success": false, "error": "Authentication required" }`

- **Code**: 403 Forbidden
  - **Content**: `{ "success": false, "error": "Admin permission required" }`

- **Code**: 500 Internal Server Error
  - **Content**: `{ "success": false, "error": "Error sending welcome email" }`

## Accessibility Features

### File Upload Accessibility

1. **Metadata Extraction**:
   - Automatically extracts accessibility metadata from uploaded files
   - For images: alt text, title, keywords, and description
   - For PDFs: title, description, keywords, and author
   - For other files: generates appropriate metadata based on file type and name

2. **Validation Feedback**:
   - Clear error messages for invalid files
   - Descriptive feedback for file size, type, and format issues
   - ARIA attributes for screen reader compatibility

3. **File Management Interface**:
   - Keyboard navigable file list
   - Screen reader announcements for upload progress and completion
   - High contrast visual indicators

### Email Accessibility

1. **Email Templates**:
   - Semantic HTML structure with proper heading hierarchy
   - ARIA roles and attributes for complex components
   - Responsive design for various screen sizes and devices

2. **Color Contrast**:
   - All text meets WCAG AA standards for color contrast
   - Primary gold (#F2BF0F) used with dark text for buttons and highlights
   - No information conveyed by color alone

3. **Text Alternatives**:
   - Alt text for all images
   - Text alternatives for buttons and interactive elements
   - Plain text versions of all HTML emails

## Environment Configuration

The following environment variables can be configured for file uploads and emails:

### File Upload Configuration

```
# File Upload Directories
PUBLIC_UPLOAD_DIR=/path/to/public/uploads
PRIVATE_UPLOAD_DIR=/path/to/private/uploads

# File Upload Limits
MAX_FILE_SIZE=5242880  # 5MB in bytes
MAX_FILES=10

# Allowed File Types and Extensions
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf,text/plain
ALLOWED_FILE_EXTENSIONS=.jpg,.jpeg,.png,.pdf,.txt
```

### Email Configuration

```
# Email Server Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=user@example.com
EMAIL_PASS=password
EMAIL_FROM=LitSpark Brand Solutions <noreply@litspark.com>

# Email Template Configuration
EMAIL_TEMPLATE_DIR=/path/to/email/templates
DEFAULT_COMPANY_NAME=LitSpark Brand Solutions

# Frontend URLs for Email Links
FRONTEND_URL=http://localhost:3000
PRIVACY_POLICY_URL=http://localhost:3000/privacy-policy
UNSUBSCRIBE_URL=http://localhost:3000/unsubscribe
TERMS_URL=http://localhost:3000/terms
```
