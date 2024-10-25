import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import UserInfo from '../components/Profile/UserInfo';
import TaskCard from '../components/Profile/TaskBar';
import ProfileMenu from '../components/Profile/ProfileMenu';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // State variables for user info and task data
  const [userInfo, setUserInfo] = useState(null);
  const [totalTasks, setTotalTasks] = useState(125);  // Initial values
  const [pendingTasks, setPendingTasks] = useState(25);
  const [doneTasks, setDoneTasks] = useState(100);

  useEffect(() => {
    fetchUserInfo();
    fetchTaskData();
  }, []);

  // Fetch user info from API
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('https://api.eliteaide.tech/');
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Fetch task data from API
  const fetchTaskData = async () => {
    try {
      const response = await fetch('https://api.eliteaide.tech/');
      const data = await response.json();
      setTotalTasks(data.total);
      setPendingTasks(data.pending);
      setDoneTasks(data.done);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  // Handle card press events for the profile menu
  const handleCardPress = (menuTitle: string) => {
    switch (menuTitle) {
      case 'My Activity':
        Alert.alert('Navigating to My Activity');
        navigation.navigate('MyActivityScreen');
        break;
      case 'Settings':
        Alert.alert('Navigating to Settings');
        break;
      case 'About Elite Aide':
        Alert.alert('About Elite Aide', 'Version 1.0.0');
        break;
      case 'Logout':
        handleLogout();
        break;
      default:
        console.log('Unknown menu item');
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch('https://api.eliteaide.tech/logout', {
        method: 'POST',
      });
      if (response.ok) {
        Alert.alert('Logged out successfully');
      } else {
        Alert.alert('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout failed', 'Unable to connect to the server');
    }
  };

  return (
    <View style={tw`flex-1 bg-[#111111]`}>
      <View style={tw`items-center mt-6`}>
        {/* Display user info if available, otherwise show loading */}
        {userInfo ? (
          <UserInfo userInfo={userInfo} />
        ) : (
          <Text style={tw`text-white`}>Loading user info...</Text>
        )}

        {/* Display task card */}
        <TaskCard total={totalTasks} pending={pendingTasks} done={doneTasks} />

        {/* Profile menu options */}
        <ProfileMenu 
          title="My Activity" 
          iconName="stats-chart" 
          onPress={() => handleCardPress('My Activity')}
        />
        <ProfileMenu 
          title="Settings" 
          iconName="settings" 
          onPress={() => handleCardPress('Settings')}
        />
        <ProfileMenu 
          title="About Elite Aide" 
          iconName="information-circle-outline" 
          onPress={() => handleCardPress('About Elite Aide')}
        />
        <ProfileMenu 
          title="Logout" 
          iconName="log-out" 
          onPress={() => handleCardPress('Logout')}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;