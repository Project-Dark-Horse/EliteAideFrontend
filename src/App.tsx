import React, { Suspense, lazy } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy load screens
const BottomTabNavigator = lazy(() => import('./navigation/BottomTabNavigator'));
const SignUpScreen = lazy(() => import('./screens/Auth/SignUpScreen'));
const LoginScreen = lazy(() => import('./screens/Auth/LoginScreen'));
const OtpScreen = lazy(() => import('./screens/Auth/OtpScreen'));
const EnterEmailScreen = lazy(() => import('./screens/Auth/EnterEmailScreen'));
const WelcomeScreen = lazy(() => import('./screens/WelcomeScreen'));
const ProfileScreen = lazy(() => import('./screens/Profile/ProfileScreen'));
const NotificationScreen = lazy(() => import('./screens/Notification/NotificationScreen'));
const FPEnterEmail = lazy(() => import('./screens/Auth/FPEnterEmail'));

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Suspense fallback={<LoadingScreen />}>
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
          </Stack.Navigator>
        </Suspense>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;