import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './components/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login'; // Make sure to adjust imports
import EnterEmail from './screens/EnterEmail';
import SignUp from './screens/SignUp';
import EmailScreen from './screens/EmailScreen';
import Otp from './screens/Otp';
import Notification from './screens/Notification';
import WelcomeScreen from './screens/WelcomeScreen';
import Welcome from './screens/WelcomeScreen';

type LoginProps = {
  someProp: string; // Example prop type
};

type RootStackParamList = {
  Login: LoginProps; // Match the component's props
  EnterEmail: undefined;
  SignUp: undefined;
  Otp: undefined;
  Email: undefined;
  BottomTabNavigator: undefined;
  Notifications: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="EnterEmail" component={EnterEmail} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
          <Stack.Screen name="Email" component={EmailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" component={Notification} options={{
            headerStyle: {
              backgroundColor: '#111111',
            },
            headerTintColor: '#fff',
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
