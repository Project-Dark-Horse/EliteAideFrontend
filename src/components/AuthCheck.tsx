import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authStorage } from '../utils/authStorage';
import LoadingScreen from './Loading/LoadingScreen';

const AuthCheck: React.FC = () => {
  const [isChecking, setIsChecking] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { accessToken } = await authStorage.getTokens();
      
      if (accessToken) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigator' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeScreen' }],
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return <LoadingScreen loading={true} />;
  }

  return null;
};

export default AuthCheck; 