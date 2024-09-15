import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import EmailScreen from './screens/EmailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}