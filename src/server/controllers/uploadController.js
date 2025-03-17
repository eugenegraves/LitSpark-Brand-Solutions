/**
 * Upload Controller
 * 
 * This controller handles file upload operations.
 * It provides endpoints for uploading, retrieving, and deleting files.
 * All operations follow accessibility guidelines and security best practices.
 */

const path = require('path');
const fs = require('fs');
const { ApiError } = require('../middleware/errorHandler');
const fileUploadService = require('../utils/fileUploadService');

/**
 * Upload a file
 * @route POST /api/uploads
 * @access Authenticated users
 */
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file uploaded');
    }
    
    // Get file information
    const file = {
      originalName: req.file.originalFilename || req.file.originalname,
      filename: req.file.storedFilename || req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      isPrivate: req.route.path.includes('/private'),
      uploadedBy: req.user.id,
      uploadedAt: new Date(),
      altText: req.body.altText || fileUploadService.generateAltText(req.file.originalname, req.body.description)
    };
    
    // Return file information with accessibility metadata
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file,
      accessibility: {
        altTextProvided: !!req.body.altText,
        descriptionProvided: !!req.body.description,
        generatedAltText: !req.body.altText && !req.body.description
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload multiple files
 * @route POST /api/uploads/multiple
 * @access Authenticated users
 */
const uploadMultipleFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new ApiError(400, 'No files uploaded');
    }
    
    // Get descriptions from request body if provided
    const descriptions = req.body.descriptions ? 
      (typeof req.body.descriptions === 'string' ? 
        JSON.parse(req.body.descriptions) : 
        req.body.descriptions) : 
      {};
    
    // Get alt texts from request body if provided
    const altTexts = req.body.altTexts ? 
      (typeof req.body.altTexts === 'string' ? 
        JSON.parse(req.body.altTexts) : 
        req.body.altTexts) : 
      {};
    
    // Get files information
    const files = req.files.map((file, index) => {
      const description = descriptions[index] || descriptions[file.originalname] || '';
      const altText = altTexts[index] || altTexts[file.originalname] || '';
      
      return {
        originalName: file.originalFilename || file.originalname,
        filename: file.storedFilename || file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
        isPrivate: req.route.path.includes('/private'),
        uploadedBy: req.user.id,
        uploadedAt: new Date(),
        altText: altText || fileUploadService.generateAltText(file.originalname, description)
      };
    });
    
    // Return files information with accessibility metadata
    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      files,
      count: files.length,
      accessibility: {
        altTextsProvided: Object.keys(altTexts).length > 0,
        descriptionsProvided: Object.keys(descriptions).length > 0,
        missingAltTexts: files.filter(file => !file.altText).length
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a file
 * @route DELETE /api/uploads/:filename
 * @access Authenticated users
 */
const deleteFile = async (req, res, next, isPrivate = false) => {
  try {
    const { filename } = req.params;
    
    // Delete file using the file upload service
    await fileUploadService.deleteFile(filename, isPrivate);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
      filename
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get file information
 * @route GET /api/uploads/:filename/info
 * @access Authenticated users
 */
const getFileInfo = async (req, res, next, isPrivate = false) => {
  try {
    const { filename } = req.params;
    
    // Get file information using the file upload service
    const fileInfo = await fileUploadService.getFileInfo(filename, isPrivate);
    
    // Return file information
    res.status(200).json({
      success: true,
      file: fileInfo
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  getFileInfo
};
