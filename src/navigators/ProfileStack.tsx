// navigators/ProfileStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationScreen from '../screens/Notification';
import MyActivityScreen from '../screens/MyActivity';
import ManualTaskCreate from '../screens/ManualTaskCreate';


const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <ProfileStack.Screen name="Notifications" component={NotificationScreen} options={{ title: 'Notifications' }} />
      <ProfileStack.Screen name="ManualTaskCreate" component={ManualTaskCreate} options={{ title: 'Create New Task' }} />
      <ProfileStack.Screen name="MyActivity" component={MyActivityScreen} options={{ title: 'My Activity' }} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;