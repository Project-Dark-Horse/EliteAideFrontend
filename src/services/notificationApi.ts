import { BASE_URL } from '@env';
import { authStorage } from '../utils/authStorage';
import { Platform } from 'react-native';

interface NotificationPayload {
  task?: number;
  notification_type: 'task' | 'warning' | 'success' | 'info' | 'due_date';
  notification_status: 'pending' | 'read' | 'deleted';
  notification_message: string;
}

interface DeviceRegistrationPayload {
  device_token: string;
  device_type: 'android' | 'ios';
}

class NotificationApi {
  private async getHeaders() {
    const { accessToken } = await authStorage.getTokens();
    return {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  async createNotification(payload: NotificationPayload) {
    try {
      const response = await fetch(`${BASE_URL}notifications/`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create notification');
      return await response.json();
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async updateNotificationStatus(notificationId: string | number, status: 'read' | 'deleted') {
    try {
      const response = await fetch(`${BASE_URL}notifications/${notificationId}/`, {
        method: 'PATCH',
        headers: await this.getHeaders(),
        body: JSON.stringify({ notification_status: status }),
      });

      if (!response.ok) throw new Error('Failed to update notification');
      return await response.json();
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  }

  async registerDevice(token: string) {
    try {
      const payload: DeviceRegistrationPayload = {
        device_token: token,
        device_type: Platform.OS,
      };

      const response = await fetch(`${BASE_URL}user-device/`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to register device');
      return await response.json();
    } catch (error) {
      console.error('Error registering device:', error);
      throw error;
    }
  }

  async updateDeviceToken(deviceId: string, newToken: string) {
    try {
      const response = await fetch(`${BASE_URL}user-devices/${deviceId}/`, {
        method: 'PATCH',
        headers: await this.getHeaders(),
        body: JSON.stringify({ device_token: newToken }),
      });

      if (!response.ok) throw new Error('Failed to update device token');
      return await response.json();
    } catch (error) {
      console.error('Error updating device token:', error);
      throw error;
    }
  }
}

export const notificationApi = new NotificationApi(); 