import React from 'react';
import { Text, View } from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import UserInfo from '../components/Profile/UserInfo';
import TaskCard from '../components/Profile/TaskBar';
import ProfileMenu from '../components/Profile/ProfileMenu';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook

import tw from 'twrnc';

const Profile = () => {
  const navigation = useNavigation();  // Initialize navigation

  const totalTasks = 125;
  const pendingTasks = 25;
  const doneTasks = 100;

  const handleCardPress = () => {
    console.log('Card pressed!');
  };

  const handleMyActivityPress = () => {
    navigation.navigate('MyActivityScreen');  // Navigate to MyActivityScreen
  };

  return (
    <View style={tw`flex-1 bg-[#111111]`}>
      <View style={tw`items-center mt-6`}>
        <UserInfo />
        <TaskCard total={totalTasks} pending={pendingTasks} done={doneTasks} />
        <ProfileMenu 
          title="My Activity" 
          iconName="stats-chart"
          onPress={handleMyActivityPress}
        />
        <ProfileMenu 
          title="Settings" 
          iconName="settings" 
          onPress={handleCardPress}
        />
        <ProfileMenu 
          title="About Elite Aide" 
          iconName="information-circle-outline" 
          onPress={handleCardPress}
        />
        <ProfileMenu 
          title="Logout" 
          iconName="log-out" 
          onPress={handleCardPress}
        />
      </View>
    </View>
  );
};

export default Profile;
