import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calendar from '../screens/Calendar/Calendar';
import ChatScreen from '../screens/Ai';
import Notification from '../screens/Notification';
import ProfileScreen from "../screens/ProfileScreen";
import { RootStackParamList } from '../types/navigation';  // Adjust this path accordingly
import ManualTaskCreate from '../screens/ManualTaskCreate';


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
      <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="MyProfile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ManualTaskCreate" component={ManualTaskCreate} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default BottomBarStack;