/**
 * Notification Service Tests
 * 
 * This file contains tests for the notification service functionality including
 * creating, retrieving, updating, and deleting notifications.
 */

// Mock dependencies
jest.mock('../../../src/server/utils/loggerService');
jest.mock('../../../src/server/utils/emailService');

// Import dependencies
const notificationService = require('../../../src/server/utils/notificationService');
const emailService = require('../../../src/server/utils/emailService');
const logger = require('../../../src/server/utils/loggerService');

describe('Notification Service', () => {
  // Reset notifications before each test
  beforeEach(() => {
    notificationService._resetNotifications();
    jest.clearAllMocks();
  });

  describe('Creating Notifications', () => {
    test('should create a notification with required fields', async () => {
      // Arrange
      const options = {
        userId: 'user123',
        message: 'Test notification message'
      };

      // Act
      const notification = await notificationService.createNotification(options);

      // Assert
      expect(notification).toEqual(expect.objectContaining({
        userId: 'user123',
        type: notificationService.NOTIFICATION_TYPES.INFO,
        title: 'Information',
        message: 'Test notification message',
        channel: notificationService.NOTIFICATION_CHANNELS.IN_APP,
        isRead: false
      }));
      expect(notification.id).toBeDefined();
      expect(notification.createdAt).toBeInstanceOf(Date);
      expect(notification.updatedAt).toBeInstanceOf(Date);
      expect(logger.info).toHaveBeenCalledWith('Notification created', expect.any(Object));
    });

    test('should create a notification with all fields', async () => {
      // Arrange
      const options = {
        userId: 'user123',
        type: notificationService.NOTIFICATION_TYPES.SUCCESS,
        title: 'Custom Title',
        message: 'Test notification message',
        channel: notificationService.NOTIFICATION_CHANNELS.EMAIL,
        data: { key: 'value' },
        isRead: true
      };

      // Act
      const notification = await notificationService.createNotification(options);

      // Assert
      expect(notification).toEqual(expect.objectContaining({
        userId: 'user123',
        type: notificationService.NOTIFICATION_TYPES.SUCCESS,
        title: 'Custom Title',
        message: 'Test notification message',
        channel: notificationService.NOTIFICATION_CHANNELS.EMAIL,
        data: { key: 'value' },
        isRead: true
      }));
    });

    test('should throw an error if message is missing', async () => {
      // Arrange
      const options = {
        userId: 'user123'
        // Missing message
      };

      // Act & Assert
      await expect(notificationService.createNotification(options))
        .rejects.toThrow('Notification message is required');
    });

    test('should throw an error for invalid notification type', async () => {
      // Arrange
      const options = {
        userId: 'user123',
        message: 'Test notification message',
        type: 'invalid-type'
      };

      // Act & Assert
      await expect(notificationService.createNotification(options))
        .rejects.toThrow('Invalid notification type: invalid-type');
    });

    test('should throw an error for invalid notification channel', async () => {
      // Arrange
      const options = {
        userId: 'user123',
        message: 'Test notification message',
        channel: 'invalid-channel'
      };

      // Act & Assert
      await expect(notificationService.createNotification(options))
        .rejects.toThrow('Invalid notification channel: invalid-channel');
    });

    test('should send an email for email channel notifications', async () => {
      // Arrange
      const options = {
        userId: 'user123',
        message: 'Test notification message',
        channel: notificationService.NOTIFICATION_CHANNELS.EMAIL
      };

      // Mock email service
      emailService.sendEmail.mockResolvedValue({ messageId: 'test-id' });

      // Act
      await notificationService.createNotification(options);

      // Assert
      expect(emailService.sendEmail).toHaveBeenCalledWith(expect.objectContaining({
        to: 'user123@example.com',
        subject: 'Information',
        html: expect.stringContaining('Test notification message'),
        text: expect.stringContaining('Test notification message')
      }));
    });
  });

  describe('Retrieving Notifications', () => {
    test('should get all notifications for a user', async () => {
      // Arrange
      // Create notifications in reverse order to ensure sorting works
      await notificationService.createNotification({
        userId: 'user123',
        message: 'Notification 1',
        createdAt: new Date('2025-03-17T10:00:00Z')
      });
      await notificationService.createNotification({
        userId: 'user123',
        message: 'Notification 2',
        createdAt: new Date('2025-03-17T11:00:00Z')
      });
      await notificationService.createNotification({
        userId: 'user456',
        message: 'Notification for another user'
      });

      // Act
      const notifications = notificationService.getUserNotifications('user123');

      // Assert
      expect(notifications).toHaveLength(2);
      expect(notifications[0].message).toBe('Notification 2'); // Newest first
      expect(notifications[1].message).toBe('Notification 1');
    });

    test('should filter notifications by type', async () => {
      // Arrange
      await notificationService.createNotification({
        userId: 'user123',
        type: notificationService.NOTIFICATION_TYPES.INFO,
        message: 'Info notification'
      });
      await notificationService.createNotification({
        userId: 'user123',
        type: notificationService.NOTIFICATION_TYPES.SUCCESS,
        message: 'Success notification'
      });

      // Act
      const notifications = notificationService.getUserNotifications('user123', {
        type: notificationService.NOTIFICATION_TYPES.SUCCESS
      });

      // Assert
      expect(notifications).toHaveLength(1);
      expect(notifications[0].message).toBe('Success notification');
    });

    test('should filter notifications by read status', async () => {
      // Arrange
      await notificationService.createNotification({
        userId: 'user123',
        message: 'Unread notification'
      });
      await notificationService.createNotification({
        userId: 'user123',
        message: 'Read notification',
        isRead: true
      });

      // Act
      const unreadNotifications = notificationService.getUserNotifications('user123', {
        isRead: false
      });
      const readNotifications = notificationService.getUserNotifications('user123', {
        isRead: true
      });

      // Assert
      expect(unreadNotifications).toHaveLength(1);
      expect(unreadNotifications[0].message).toBe('Unread notification');
      expect(readNotifications).toHaveLength(1);
      expect(readNotifications[0].message).toBe('Read notification');
    });

    test('should apply pagination', async () => {
      // Arrange
      // Create notifications with explicit timestamps to ensure consistent sorting
      for (let i = 1; i <= 5; i++) {
        await notificationService.createNotification({
          userId: 'user123',
          message: `Notification ${i}`,
          createdAt: new Date(`2025-03-17T${10 + i}:00:00Z`)
        });
      }

      // Act
      const page1 = notificationService.getUserNotifications('user123', {
        limit: 2,
        offset: 0
      });
      const page2 = notificationService.getUserNotifications('user123', {
        limit: 2,
        offset: 2
      });

      // Assert
      expect(page1).toHaveLength(2);
      expect(page1[0].message).toBe('Notification 5'); // Newest first
      expect(page1[1].message).toBe('Notification 4');
      expect(page2).toHaveLength(2);
      expect(page2[0].message).toBe('Notification 3');
      expect(page2[1].message).toBe('Notification 2');
    });

    test('should throw an error if user ID is missing', () => {
      // Act & Assert
      expect(() => notificationService.getUserNotifications())
        .toThrow('User ID is required');
    });
  });

  describe('Updating Notifications', () => {
    test('should mark a notification as read', async () => {
      // Arrange
      const notification = await notificationService.createNotification({
        userId: 'user123',
        message: 'Test notification'
      });
      
      // Store the original updatedAt
      const originalUpdatedAt = notification.updatedAt;
      
      // Wait a small amount of time to ensure timestamps are different
      await new Promise(resolve => setTimeout(resolve, 10));

      // Act
      const updatedNotification = notificationService.markAsRead(notification.id, 'user123');

      // Assert
      expect(updatedNotification.isRead).toBe(true);
      expect(updatedNotification.updatedAt).not.toEqual(originalUpdatedAt);
      expect(logger.info).toHaveBeenCalledWith('Notification marked as read', expect.any(Object));
    });

    test('should throw an error when marking non-existent notification as read', () => {
      // Act & Assert
      expect(() => notificationService.markAsRead('non-existent-id', 'user123'))
        .toThrow('Notification not found');
    });

    test('should throw an error when notification ID is missing', () => {
      // Act & Assert
      expect(() => notificationService.markAsRead(null, 'user123'))
        .toThrow('Notification ID is required');
    });

    test('should throw an error when user ID is missing', () => {
      // Act & Assert
      expect(() => notificationService.markAsRead('notification-id', null))
        .toThrow('User ID is required');
    });
  });

  describe('Deleting Notifications', () => {
    test('should delete a notification', async () => {
      // Arrange
      const notification = await notificationService.createNotification({
        userId: 'user123',
        message: 'Test notification'
      });

      // Act
      const result = notificationService.deleteNotification(notification.id, 'user123');
      const notifications = notificationService.getUserNotifications('user123');

      // Assert
      expect(result).toBe(true);
      expect(notifications).toHaveLength(0);
      expect(logger.info).toHaveBeenCalledWith('Notification deleted', expect.any(Object));
    });

    test('should throw an error when deleting non-existent notification', () => {
      // Act & Assert
      expect(() => notificationService.deleteNotification('non-existent-id', 'user123'))
        .toThrow('Notification not found');
    });

    test('should throw an error when notification ID is missing', () => {
      // Act & Assert
      expect(() => notificationService.deleteNotification(null, 'user123'))
        .toThrow('Notification ID is required');
    });

    test('should throw an error when user ID is missing', () => {
      // Act & Assert
      expect(() => notificationService.deleteNotification('notification-id', null))
        .toThrow('User ID is required');
    });
  });

  describe('Clearing Notifications', () => {
    test('should clear all notifications for a user', async () => {
      // Arrange
      await notificationService.createNotification({
        userId: 'user123',
        message: 'Notification 1'
      });
      await notificationService.createNotification({
        userId: 'user123',
        message: 'Notification 2'
      });
      await notificationService.createNotification({
        userId: 'user456',
        message: 'Notification for another user'
      });

      // Act
      const clearedCount = notificationService.clearUserNotifications('user123');
      const userNotifications = notificationService.getUserNotifications('user123');
      const otherUserNotifications = notificationService.getUserNotifications('user456');

      // Assert
      expect(clearedCount).toBe(2);
      expect(userNotifications).toHaveLength(0);
      expect(otherUserNotifications).toHaveLength(1);
      expect(logger.info).toHaveBeenCalledWith('User notifications cleared', expect.any(Object));
    });

    test('should throw an error when user ID is missing', () => {
      // Act & Assert
      expect(() => notificationService.clearUserNotifications())
        .toThrow('User ID is required');
    });
  });

  describe('Accessibility', () => {
    test('should include proper ARIA attributes in email notifications', async () => {
      // Arrange
      const options = {
        userId: 'user123',
        message: 'Test notification message',
        channel: notificationService.NOTIFICATION_CHANNELS.EMAIL
      };

      // Mock email service
      emailService.sendEmail.mockResolvedValue({ messageId: 'test-id' });

      // Act
      await notificationService.createNotification(options);

      // Assert
      expect(emailService.sendEmail).toHaveBeenCalledWith(expect.objectContaining({
        html: expect.stringContaining('role="alert" aria-live="polite"')
      }));
    });
  });
});
