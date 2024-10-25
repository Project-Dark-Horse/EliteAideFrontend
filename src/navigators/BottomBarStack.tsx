import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calender from '../screens/Calender';
import ChatScreen from '../screens/ChatScreen';
import Notification from '../screens/NotificationScreen';
import { ProfileScreen } from "../screens/ProfileScreen"

// Define the navigation param list for all screens in the stack
export type RootStackParamList = {
  Home: undefined;
  Calender: undefined;
  ChatScreen: undefined;
  Notification: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const BottomBarStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',  // Customize header background color
        },
        headerTintColor: '#fff',  // Customize header text color
        headerTitleStyle: {
          fontWeight: 'bold',  // Customize header text style
        },
        gestureEnabled: true,  // Enable gestures
        gestureDirection: 'horizontal',  // Gesture direction
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Calender" component={Calender} options={{ headerShown: false }}  />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}  />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
};

export default BottomBarStack;