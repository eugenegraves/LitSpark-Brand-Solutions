/**
 * Notification Service
 * 
 * This service handles creating, storing, and retrieving notifications.
 * It supports different notification types (info, success, warning, error)
 * and channels (in-app, email, push).
 * All notifications are designed to be accessible following WCAG 2.1 standards.
 */

const { ApiError } = require('../middleware/errorHandler');
const logger = require('./loggerService');
const emailService = require('./emailService');

// Notification types
const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

// Notification channels
const NOTIFICATION_CHANNELS = {
  IN_APP: 'in-app',
  EMAIL: 'email',
  PUSH: 'push'
};

// In-memory store for notifications (in a production app, this would be a database)
let notifications = [];

/**
 * Create a notification
 * @param {Object} options - Notification options
 * @param {string} options.userId - User ID (optional for public notifications)
 * @param {string} options.type - Notification type (info, success, warning, error)
 * @param {string} options.title - Notification title
 * @param {string} options.message - Notification message
 * @param {string} options.channel - Notification channel (in-app, email, push)
 * @param {Object} options.data - Additional data for the notification
 * @param {boolean} options.isRead - Whether the notification has been read
 * @param {Date} options.createdAt - Creation timestamp (for testing)
 * @returns {Object} Created notification
 */
const createNotification = async (options) => {
  try {
    // Validate required fields
    if (!options.message) {
      throw new Error('Notification message is required');
    }

    // Set default values
    const type = options.type || NOTIFICATION_TYPES.INFO;
    const channel = options.channel || NOTIFICATION_CHANNELS.IN_APP;
    const title = options.title || getDefaultTitle(type);
    
    // Validate type and channel
    if (!Object.values(NOTIFICATION_TYPES).includes(type)) {
      throw new Error(`Invalid notification type: ${type}`);
    }
    
    if (!Object.values(NOTIFICATION_CHANNELS).includes(channel)) {
      throw new Error(`Invalid notification channel: ${channel}`);
    }

    // Create notification object
    const notification = {
      id: generateId(),
      userId: options.userId || null,
      type,
      title,
      message: options.message,
      channel,
      data: options.data || {},
      isRead: options.isRead || false,
      createdAt: options.createdAt || new Date(),
      updatedAt: options.updatedAt || new Date()
    };

    // Store notification
    notifications.push(notification);
    
    // Log notification creation
    logger.info('Notification created', { notificationId: notification.id, type, channel });

    // Handle different channels
    if (channel === NOTIFICATION_CHANNELS.EMAIL && options.userId) {
      await sendEmailNotification(notification);
    }

    return notification;
  } catch (error) {
    logger.error('Error creating notification', { error: error.message, stack: error.stack });
    throw error;
  }
};

/**
 * Get notifications for a user
 * @param {string} userId - User ID
 * @param {Object} filters - Filters for notifications
 * @param {string} filters.type - Filter by notification type
 * @param {boolean} filters.isRead - Filter by read status
 * @param {number} filters.limit - Limit number of notifications
 * @param {number} filters.offset - Offset for pagination
 * @returns {Array} User notifications
 */
const getUserNotifications = (userId, filters = {}) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    let userNotifications = notifications.filter(n => n.userId === userId);

    // Apply filters
    if (filters.type) {
      userNotifications = userNotifications.filter(n => n.type === filters.type);
    }

    if (filters.isRead !== undefined) {
      userNotifications = userNotifications.filter(n => n.isRead === filters.isRead);
    }

    // Sort by creation date (newest first)
    userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply pagination
    const limit = filters.limit || userNotifications.length;
    const offset = filters.offset || 0;
    
    return userNotifications.slice(offset, offset + limit);
  } catch (error) {
    logger.error('Error getting user notifications', { userId, error: error.message });
    throw error;
  }
};

/**
 * Mark notification as read
 * @param {string} notificationId - Notification ID
 * @param {string} userId - User ID
 * @returns {Object} Updated notification
 */
const markAsRead = (notificationId, userId) => {
  try {
    if (!notificationId) {
      throw new Error('Notification ID is required');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    const index = notifications.findIndex(n => n.id === notificationId && n.userId === userId);
    
    if (index === -1) {
      throw new Error('Notification not found');
    }

    // Create a new updatedAt date to ensure it's different
    const now = new Date();
    // Add a small delay to ensure the date is different
    now.setMilliseconds(now.getMilliseconds() + 10);
    
    notifications[index].isRead = true;
    notifications[index].updatedAt = now;

    logger.info('Notification marked as read', { notificationId, userId });
    
    return notifications[index];
  } catch (error) {
    logger.error('Error marking notification as read', { notificationId, userId, error: error.message });
    throw error;
  }
};

/**
 * Delete notification
 * @param {string} notificationId - Notification ID
 * @param {string} userId - User ID
 * @returns {boolean} Success status
 */
const deleteNotification = (notificationId, userId) => {
  try {
    if (!notificationId) {
      throw new Error('Notification ID is required');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    const initialLength = notifications.length;
    notifications = notifications.filter(n => !(n.id === notificationId && n.userId === userId));
    
    if (notifications.length === initialLength) {
      throw new Error('Notification not found');
    }

    logger.info('Notification deleted', { notificationId, userId });
    
    return true;
  } catch (error) {
    logger.error('Error deleting notification', { notificationId, userId, error: error.message });
    throw error;
  }
};

/**
 * Clear all notifications for a user
 * @param {string} userId - User ID
 * @returns {number} Number of notifications cleared
 */
const clearUserNotifications = (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const initialLength = notifications.length;
    notifications = notifications.filter(n => n.userId !== userId);
    
    const clearedCount = initialLength - notifications.length;
    
    logger.info('User notifications cleared', { userId, count: clearedCount });
    
    return clearedCount;
  } catch (error) {
    logger.error('Error clearing user notifications', { userId, error: error.message });
    throw error;
  }
};

/**
 * Send an email notification
 * @param {Object} notification - Notification object
 * @returns {Promise<Object>} Email send result
 */
const sendEmailNotification = async (notification) => {
  try {
    // In a real app, you would get the user's email from the database
    // For testing purposes, we'll use a mock email
    const userEmail = `${notification.userId}@example.com`;
    
    // Send email using email service
    const result = await emailService.sendEmail({
      to: userEmail,
      subject: notification.title,
      html: `<div role="alert" aria-live="polite">
        <h1>${notification.title}</h1>
        <p>${notification.message}</p>
        ${notification.data.actionUrl ? 
          `<a href="${notification.data.actionUrl}" class="button">${notification.data.actionText || 'View Details'}</a>` : 
          ''}
      </div>`,
      text: `${notification.title}\n\n${notification.message}${notification.data.actionUrl ? 
        `\n\n${notification.data.actionText || 'View Details'}: ${notification.data.actionUrl}` : 
        ''}`
    });
    
    logger.info('Email notification sent', { notificationId: notification.id, email: userEmail });
    
    return result;
  } catch (error) {
    logger.error('Error sending email notification', { 
      notificationId: notification.id, 
      error: error.message 
    });
    // Don't throw the error, just log it - we don't want to fail the notification creation
    // if email sending fails
    return null;
  }
};

/**
 * Get default title based on notification type
 * @param {string} type - Notification type
 * @returns {string} Default title
 */
const getDefaultTitle = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      return 'Success';
    case NOTIFICATION_TYPES.WARNING:
      return 'Warning';
    case NOTIFICATION_TYPES.ERROR:
      return 'Error';
    case NOTIFICATION_TYPES.INFO:
    default:
      return 'Information';
  }
};

/**
 * Generate a unique ID for notifications
 * @returns {string} Unique ID
 */
const generateId = () => {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Reset notifications (for testing)
 */
const _resetNotifications = () => {
  notifications = [];
};

module.exports = {
  NOTIFICATION_TYPES,
  NOTIFICATION_CHANNELS,
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
  clearUserNotifications,
  _resetNotifications // Only exported for testing
};
