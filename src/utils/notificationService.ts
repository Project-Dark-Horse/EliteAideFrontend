import PushNotification, { Importance } from 'react-native-push-notification';
import { Platform } from 'react-native';
import { notificationApi } from '../services/notificationApi';

interface NotificationData {
  [key: string]: any;
}

interface NotificationConfig {
  title: string;
  message: string;
  channelId?: string;
  playSound?: boolean;
  soundName?: string;
  data?: NotificationData;
}

interface ScheduledNotificationConfig extends NotificationConfig {
  date: Date;
}

class NotificationService {
  constructor() {
    this.configurePushNotifications();
    this.createDefaultChannels();
  }

  configurePushNotifications() {
    PushNotification.configure({
      onRegister: async (token) => {
        console.log('TOKEN:', token);
        try {
          await notificationApi.registerDevice(token.token);
        } catch (error) {
          console.error('Failed to register device:', error);
        }
      },
      onNotification: async (notification) => {
        console.log('NOTIFICATION:', notification);
        if (notification.id) {
          try {
            await notificationApi.updateNotificationStatus(notification.id, 'read');
          } catch (error) {
            console.error('Failed to mark notification as read:', error);
          }
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }

  public createDefaultChannels() {
    try {
      this.createChannel({
        channelId: 'default-channel',
        channelName: 'Default Channel',
        channelDescription: 'Default notification channel',
        importance: Importance.HIGH,
      });

      this.createChannel({
        channelId: 'task-reminders',
        channelName: 'Task Reminders',
        channelDescription: 'Notifications for task reminders',
        importance: Importance.HIGH,
      });

      this.createChannel({
        channelId: 'updates',
        channelName: 'App Updates',
        channelDescription: 'Notifications for app updates and news',
        importance: Importance.DEFAULT,
      });
    } catch (error) {
      console.error('Error creating notification channels:', error);
    }
  }

  private createChannel(channelConfig: {
    channelId: string;
    channelName: string;
    channelDescription: string;
    importance: Importance;
  }) {
    PushNotification.createChannel(
      {
        ...channelConfig,
        playSound: true,
        soundName: 'default',
        vibrate: true,
      },
      (created: boolean) => console.log(`Channel ${channelConfig.channelId} created:`, created)
    );
  }

  showNotification({
    title,
    message,
    channelId = 'default-channel',
    playSound = true,
    soundName = 'default',
    data = {},
  }: NotificationConfig) {
    try {
      PushNotification.localNotification({
        channelId,
        title,
        message,
        playSound,
        soundName,
        ...data,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        category: 'reminder',
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  scheduleNotification({
    title,
    message,
    date,
    channelId = 'default-channel',
    playSound = true,
    soundName = 'default',
    data = {},
  }: ScheduledNotificationConfig) {
    try {
      PushNotification.localNotificationSchedule({
        channelId,
        title,
        message,
        date,
        playSound,
        soundName,
        ...data,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        category: 'reminder',
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  cancelAllNotifications() {
    try {
      PushNotification.cancelAllLocalNotifications();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  }

  cancelNotification(id: string) {
    try {
      PushNotification.cancelLocalNotification(id);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  showTaskNotification(title: string, message: string) {
    this.showNotification({
      channelId: 'task-reminders',
      title,
      message,
      data: {
        type: 'task',
      },
    });
  }

  showUpdateNotification(title: string, message: string) {
    this.showNotification({
      channelId: 'updates',
      title,
      message,
      data: {
        type: 'update',
      },
    });
  }

  async createTaskNotification(taskId: number, message: string) {
    try {
      const notification = await notificationApi.createNotification({
        task: taskId,
        notification_type: 'task',
        notification_status: 'pending',
        notification_message: message,
      });

      this.showNotification({
        title: 'Task Notification',
        message: notification.notification_message,
        data: { notificationId: notification.id },
      });
    } catch (error) {
      console.error('Failed to create task notification:', error);
    }
  }

  async createDueDateNotification(taskId: number, message: string) {
    try {
      const notification = await notificationApi.createNotification({
        task: taskId,
        notification_type: 'due_date',
        notification_status: 'pending',
        notification_message: message,
      });

      this.showNotification({
        title: 'Due Date Reminder',
        message: notification.notification_message,
        data: { notificationId: notification.id },
      });
    } catch (error) {
      console.error('Failed to create due date notification:', error);
    }
  }
}

const notificationService = new NotificationService();

export default notificationService; 