/**
 * Upload Routes
 * 
 * This file defines API routes for file upload management.
 * All routes include proper validation and accessibility features.
 */

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middleware/auth');
const fileUploadService = require('../utils/fileUploadService');
const { validate } = require('../middleware/validation');
const { uploadValidation } = require('../middleware/validationSchemas');

/**
 * Error handler middleware for file upload errors
 * This middleware is applied after the routes to catch any multer errors
 */
router.use(fileUploadService.handleMulterError);

// POST /api/uploads - Upload a single file
router.post('/', 
  authMiddleware.isAuthenticated, 
  validate(uploadValidation.uploadFile),
  fileUploadService.publicUpload.single('file'), 
  uploadController.uploadFile
);

// POST /api/uploads/multiple - Upload multiple files
router.post('/multiple', 
  authMiddleware.isAuthenticated, 
  validate(uploadValidation.uploadMultipleFiles),
  fileUploadService.publicUpload.array('files', 10), 
  uploadController.uploadMultipleFiles
);

// POST /api/uploads/images - Upload images
router.post('/images', 
  authMiddleware.isAuthenticated, 
  validate(uploadValidation.uploadImages),
  fileUploadService.imageUpload.array('images', 10), 
  uploadController.uploadMultipleFiles
);

// POST /api/uploads/documents - Upload documents
router.post('/documents', 
  authMiddleware.isAuthenticated, 
  validate(uploadValidation.uploadDocuments),
  fileUploadService.documentUpload.array('documents', 5), 
  uploadController.uploadMultipleFiles
);

// POST /api/uploads/private - Upload private files
router.post('/private', 
  authMiddleware.isAuthenticated, 
  authMiddleware.hasRole(['admin', 'manager']),
  validate(uploadValidation.uploadFile),
  fileUploadService.privateUpload.single('file'), 
  uploadController.uploadFile
);

// DELETE /api/uploads/:filename - Delete a file
router.delete('/:filename', 
  authMiddleware.isAuthenticated, 
  validate(uploadValidation.deleteFile),
  uploadController.deleteFile
);

// DELETE /api/uploads/private/:filename - Delete a private file
router.delete('/private/:filename', 
  authMiddleware.isAuthenticated, 
  authMiddleware.hasRole(['admin', 'manager']),
  validate(uploadValidation.deleteFile),
  (req, res, next) => uploadController.deleteFile(req, res, next, true)
);

// GET /api/uploads/:filename/info - Get file information
router.get('/:filename/info', 
  authMiddleware.isAuthenticated, 
  validate(uploadValidation.getFileInfo),
  uploadController.getFileInfo
);

// GET /api/uploads/private/:filename/info - Get private file information
router.get('/private/:filename/info', 
  authMiddleware.isAuthenticated, 
  authMiddleware.hasRole(['admin', 'manager']),
  validate(uploadValidation.getFileInfo),
  (req, res, next) => uploadController.getFileInfo(req, res, next, true)
);

module.exports = router;
