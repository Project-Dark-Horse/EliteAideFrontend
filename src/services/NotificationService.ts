import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { BASE_URL } from '@env';

class NotificationService {
  async init() {
    // Request permission (required for iOS)
    await this.requestUserPermission();
    
    // Get FCM token
    await this.getFCMToken();

    // Handle notifications when app is in background
    messaging().setBackgroundMessageHandler(this.handleBackgroundMessage);
    
    // Handle notifications when app is in foreground
    messaging().onMessage(this.handleForegroundMessage);
    
    // Handle notification open events
    this.handleNotificationOpen();
  }

  async requestUserPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  }

  async getFCMToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Store the token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        // Send this token to your backend
        await this.sendTokenToBackend(fcmToken);
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  }

  async sendTokenToBackend(token: string) {
    try {
      const userToken = await AsyncStorage.getItem('access_token');
      // Implement your API call here to send the FCM token to your backend
      const response = await fetch(`${BASE_URL}v1/notifications/register-device/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fcm_token: token }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register device token');
      }
    } catch (error) {
      console.error('Error sending FCM token to backend:', error);
    }
  }

  async handleBackgroundMessage(message: any) {
    console.log('Background Message:', message);
    await this.displayNotification(message);
  }

  async handleForegroundMessage(message: any) {
    console.log('Foreground Message:', message);
    await this.displayNotification(message);
  }

  async displayNotification(message: any) {
    try {
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Display the notification
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
        data: message.data,
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  }

  handleNotificationOpen() {
    // Handle notification open when app is in background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Background Notification Opened:', remoteMessage);
      this.handleNotificationNavigation(remoteMessage);
    });

    // Handle notification open when app is closed
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Closed App Notification Opened:', remoteMessage);
        this.handleNotificationNavigation(remoteMessage);
      }
    });
  }

  handleNotificationNavigation(remoteMessage: any) {
    // Implement navigation logic based on notification data
    if (remoteMessage.data?.type === 'task') {
      // Navigate to task screen
      // navigation.navigate('Task', { taskId: remoteMessage.data.taskId });
    }
  }
}

export default new NotificationService(); 