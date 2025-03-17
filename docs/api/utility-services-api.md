# Utility Services API Documentation

This document provides detailed information about the utility services API endpoints, including the logger service, notification service, and monitoring service.

## Table of Contents

1. [Logger Service](#logger-service)
2. [Notification Service](#notification-service)
3. [Monitoring Service](#monitoring-service)
4. [File Upload Service](#file-upload-service)

---

## Logger Service

The Logger Service provides centralized logging functionality for the application.

### Methods

#### `debug(message, meta)`

Logs a debug-level message.

- **Parameters**:
  - `message` (String): The message to log
  - `meta` (Object, optional): Additional metadata to include with the log

#### `info(message, meta)`

Logs an info-level message.

- **Parameters**:
  - `message` (String): The message to log
  - `meta` (Object, optional): Additional metadata to include with the log

#### `warn(message, meta)`

Logs a warning-level message.

- **Parameters**:
  - `message` (String): The message to log
  - `meta` (Object, optional): Additional metadata to include with the log

#### `error(message, meta)`

Logs an error-level message.

- **Parameters**:
  - `message` (String): The message to log
  - `meta` (Object, optional): Additional metadata to include with the log

#### `http(message, meta)`

Logs an HTTP request.

- **Parameters**:
  - `message` (String): The message to log
  - `meta` (Object, optional): Additional metadata to include with the log

### Middleware

#### `addRequestContext(req, res, next)`

Middleware that adds request context to the logger.

- **Usage**:
  ```javascript
  app.use(logger.addRequestContext);
  ```

- **Functionality**:
  - Generates a unique request ID if not provided in headers
  - Adds the request ID to response headers
  - Creates a child logger with request context
  - Logs HTTP requests

---

## Notification Service

The Notification Service handles creating, storing, retrieving, and managing user notifications.

### Methods

#### `createNotification(options)`

Creates a new notification.

- **Parameters**:
  - `options` (Object): Notification options
    - `userId` (String): ID of the user to notify
    - `message` (String, required): Notification message
    - `type` (String, optional): Notification type (default: 'info')
    - `channel` (String, optional): Notification channel (default: 'app')
    - `link` (String, optional): Related link
    - `metadata` (Object, optional): Additional metadata

- **Returns**: Promise that resolves to the created notification object

- **Throws**:
  - Error if message is missing
  - Error if notification type is invalid
  - Error if notification channel is invalid

#### `getUserNotifications(userId, filters)`

Retrieves notifications for a specific user.

- **Parameters**:
  - `userId` (String, required): ID of the user
  - `filters` (Object, optional): Filtering options
    - `type` (String, optional): Filter by notification type
    - `read` (Boolean, optional): Filter by read status
    - `limit` (Number, optional): Maximum number of notifications to return
    - `offset` (Number, optional): Number of notifications to skip

- **Returns**: Array of notification objects

- **Throws**:
  - Error if userId is missing

#### `markAsRead(notificationId, userId)`

Marks a notification as read.

- **Parameters**:
  - `notificationId` (String, required): ID of the notification
  - `userId` (String, required): ID of the user

- **Returns**: Updated notification object

- **Throws**:
  - Error if notificationId is missing
  - Error if userId is missing
  - Error if notification doesn't exist or doesn't belong to the user

#### `deleteNotification(notificationId, userId)`

Deletes a notification.

- **Parameters**:
  - `notificationId` (String, required): ID of the notification
  - `userId` (String, required): ID of the user

- **Returns**: Boolean indicating success

- **Throws**:
  - Error if notificationId is missing
  - Error if userId is missing
  - Error if notification doesn't exist or doesn't belong to the user

#### `clearUserNotifications(userId)`

Clears all notifications for a user.

- **Parameters**:
  - `userId` (String, required): ID of the user

- **Returns**: Number of notifications cleared

- **Throws**:
  - Error if userId is missing

---

## Monitoring Service

The Monitoring Service provides application monitoring capabilities including performance metrics tracking, health checks, and system resource usage monitoring.

### Methods

#### `initializeMonitoring(app)`

Initializes the monitoring service.

- **Parameters**:
  - `app` (Object): Express app

- **Usage**:
  ```javascript
  monitoringService.initializeMonitoring(app);
  ```

#### `requestMonitoringMiddleware(req, res, next)`

Middleware to monitor requests and responses.

- **Usage**:
  ```javascript
  app.use(monitoringService.requestMonitoringMiddleware);
  ```

- **Functionality**:
  - Tracks request counts
  - Measures response times
  - Categorizes requests by endpoint
  - Tracks success/error rates

#### `getHealthStatus()`

Gets the current health status of the application.

- **Returns**: Object containing health status information
  - `status`: 'UP' or 'DOWN'
  - `timestamp`: Current timestamp
  - `uptime`: Application uptime in seconds
  - `memory`: Memory usage information
  - `system`: System information (load average, free memory, total memory)

#### `getMetrics()`

Gets application metrics.

- **Returns**: Object containing application metrics
  - `timestamp`: Current timestamp
  - `requests`: Request statistics (total, success, error, success rate)
  - `response`: Response time statistics (average)
  - `endpoints`: Per-endpoint statistics
  - `system`: System metrics (memory usage, CPU load, uptime)

---

## File Upload Service

The File Upload Service handles file uploads, validation, and storage.

### Methods

#### `validateFile(file, options)`

Validates a file against specified constraints.

- **Parameters**:
  - `file` (Object): File object
  - `options` (Object, optional): Validation options
    - `maxSize` (Number, optional): Maximum file size in bytes
    - `allowedTypes` (Array, optional): Allowed MIME types

- **Returns**: Boolean indicating if the file is valid

- **Throws**:
  - Error if file exceeds maximum size
  - Error if file type is not allowed

#### `storeFile(file, options)`

Stores a file in the specified location.

- **Parameters**:
  - `file` (Object): File object
  - `options` (Object, optional): Storage options
    - `directory` (String, optional): Target directory
    - `filename` (String, optional): Custom filename
    - `isPublic` (Boolean, optional): Whether the file is publicly accessible

- **Returns**: String containing the stored file path

- **Throws**:
  - Error if file storage fails

#### `deleteFile(filepath)`

Deletes a file.

- **Parameters**:
  - `filepath` (String): Path to the file

- **Returns**: Boolean indicating success

- **Throws**:
  - Error if file deletion fails

#### `getFileUrl(filepath, options)`

Gets the URL for accessing a file.

- **Parameters**:
  - `filepath` (String): Path to the file
  - `options` (Object, optional): URL options
    - `isPublic` (Boolean, optional): Whether the file is publicly accessible
    - `expiresIn` (Number, optional): Expiration time in seconds for private URLs

- **Returns**: String containing the file URL

- **Throws**:
  - Error if file doesn't exist
