// src/navigators/AuthStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import EnterEmailScreen from '../screens/Auth/EnterEmailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';

// Add type definition for stack params
type AuthStackParamList = {
  WelcomeScreen: undefined;
  Login: undefined;
  SignUp: undefined;
  Otp: { email: string };
  ForgotPassword: undefined;
  EnterEmail: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;