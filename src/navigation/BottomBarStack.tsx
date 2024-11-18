import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/HomeScreen';
import Calendar from '../screens/Calendar/Calendar';
import ChatScreen from '../screens/Ai/AIScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ManualTaskCreate from '../screens/Ai/ManualTaskCreate';
import { RootStackParamList } from '../types/navigation';
import NotificationScreen from '../screens/Notification/Notification';
import MyTaskScreen from '../screens/Tasks/MyTaskScreen';

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
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: true }} />
      <Stack.Screen name="ManualTaskCreate" component={ManualTaskCreate} options={{ headerShown: true }} />
      <Stack.Screen name="MyTaskScreen" component={MyTaskScreen} />
    </Stack.Navigator>
  );
};

export default BottomBarStack;