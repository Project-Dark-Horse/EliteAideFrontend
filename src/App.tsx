import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthStack from './navigation/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './components/common/LoadingScreen';
import WelcomeStack from './screens/WelcomeScreen';
import { RootStackParamList } from './types/navigation';
import SignUpScreen from './screens/Auth/SignUpScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import OtpScreen from './screens/Auth/OtpScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import EnterEmailScreen from './screens/Auth/EnterEmailScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ManualTaskCreate from './screens/Ai/ManualTaskCreate';
import MyActivityScreen from './screens/Profile/MyActivity';


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
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ManualTaskCreate" component={ManualTaskCreate} />
          <Stack.Screen name="MyActivity" component={MyActivityScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;