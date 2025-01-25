import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './components/common/LoadingScreen';
import { RootStackParamList } from './types/navigation';
import SignUpScreen from './screens/Auth/SignUpScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import OtpScreen from './screens/Auth/OtpScreen';
import EnterEmailScreen from './screens/Auth/EnterEmailScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import NotificationScreen from './screens/Notification/NotificationScreen';
import FPEnterEmail from './screens/Auth/FPEnterEmail';
import FPEnterOtp from './screens/Auth/FPEnterOtp';
import FPNewPassword from './screens/Auth/FPNewPassword';
import GeolocationService from './services/GeolocationService';
import { TaskProvider } from './context/TaskContext';
import { LoadingProvider } from './context/LoadingContext';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance, FetchResult } from 'react-native-push-notification';
import { Platform } from 'react-native';
import { notificationApi } from './services/notificationApi'; // Ensure this import is added
import NotificationService from './services/NotificationService';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      const token = await AsyncStorage.getItem('accessToken');
      
      // Important: Set these states in the correct order
      setIsFirstLaunch(hasLaunched === null); // Will be true if hasLaunched is null
      setIsAuthenticated(!!token);

      // Don't set hasLaunched here - move it to WelcomeScreen completion
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      // Introduce a delay before setting isLoading to false
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 2000 milliseconds = 2 seconds
    }
  };

  useEffect(() => {
    checkAuthStatus();
    GeolocationService.startMonitoring();

    return () => {
      GeolocationService.stopMonitoring();
    };
  }, []);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('Token:', token);
    };

    const configurePushNotifications = () => {
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
          try {
            await NotificationService.handleNotification(notification);
          } catch (error) {
            console.error('Notification handling failed:', error);
          }
          notification.finish(FetchResult.NoData);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
      });
    };

    const createDefaultChannels = () => {
      PushNotification.createChannel(
        {
          channelId: 'default-channel',
          channelName: 'Default Channel',
          channelDescription: 'Default notification channel',
          importance: Importance.HIGH,
          playSound: true,
          soundName: 'default',
          vibrate: true,
        },
        (created) => console.log(`Channel default-channel created:`, created)
      );

      PushNotification.createChannel(
        {
          channelId: 'task-reminders',
          channelName: 'Task Reminders',
          channelDescription: 'Notifications for task reminders',
          importance: Importance.HIGH,
          playSound: true,
          soundName: 'default',
          vibrate: true,
        },
        (created) => console.log(`Channel task-reminders created:`, created)
      );

      PushNotification.createChannel(
        {
          channelId: 'updates',
          channelName: 'App Updates',
          channelDescription: 'Notifications for app updates and news',
          importance: Importance.DEFAULT,
          playSound: true,
          soundName: 'default',
          vibrate: true,
        },
        (created) => console.log(`Channel updates created:`, created)
      );
    };

    requestUserPermission();
    getToken();
    configurePushNotifications();
    createDefaultChannels();
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <LoadingProvider>
      <TaskProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
              <Stack.Screen name="Otp" component={OtpScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
              <Stack.Screen name="FPEnterEmail" component={FPEnterEmail} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
              <Stack.Screen name="FPEnterOtp" component={FPEnterOtp} />
              <Stack.Screen name="FPNewPassword" component={FPNewPassword} /> 
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </TaskProvider>
    </LoadingProvider>
  );
};

export default App;