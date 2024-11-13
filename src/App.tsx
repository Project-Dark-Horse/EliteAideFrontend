import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from './navigators/BottomTabNavigator';
import AuthStack from './navigators/AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Alert } from 'react-native';
import LoadingScreen from './components/common/LoadingScreen';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log("Token in AsyncStorage:", token); // Log token value for debugging
      setIsAuthenticated(!!token); // Convert truthy or falsy value to boolean
    } catch (error) {
      console.error("Failed to fetch token from AsyncStorage", error);
      Alert.alert("Error", "Failed to retrieve authentication status.");
    } finally {
      setIsLoading(false); // Set loading to false regardless of the outcome
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Show loading screen while checking authentication status
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Navigation container that switches between auth stack and bottom tab navigator based on authentication status
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <BottomTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;