import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import PrivacySecurity from '../screens/Profile/PrivacySecurity';
import EditProfile from '../screens/Profile/EditProfile';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import TaskSettingsScreen from '../screens/Profile/TaskSetting';
import StorageScreen from '../screens/Profile/StorageScreen';
import NotificationSetting from '../screens/Profile/NotificationSetting';
import ChatSettingsScreen from '../screens/Profile/ChatSetting';
import Help from '../screens/Profile/Help';
import Feedback from '../screens/Profile/Feedback';
import AboutEA from '../screens/Profile/AboutEA';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: '#111111' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false } } />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile', headerShown: false }} />
      <Stack.Screen name="PrivacySecurity" component={PrivacySecurity} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationSetting" component={NotificationSetting} options={{ headerShown: false }}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutEA" component={AboutEA} options={{ title: 'About Elite Aide', headerShown: false }}/>
      <Stack.Screen name="TaskSettingsScreen" component={TaskSettingsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="StorageScreen" component={StorageScreen}options={{ headerShown: false }} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ChatSettingsScreen" component={ChatSettingsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="HelpScreen" component={Help}options={{ headerShown: false }} />
      <Stack.Screen name="FeedbackScreen" component={Feedback} options={{ headerShown: false }}/>
      
    </Stack.Navigator>
  );
};

export default ProfileStack;