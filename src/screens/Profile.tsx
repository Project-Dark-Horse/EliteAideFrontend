import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import UserInfo from '../components/Profile/UserInfo';
import TaskCard from '../components/Profile/TaskBar';
import ProfileMenu from '../components/Profile/ProfileMenu';
import tw from 'twrnc';

const Profile = () => {
  
  const [userInfo, setUserInfo] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);

  
  useEffect(() => {
    fetchUserInfo();
    fetchTaskData();
  }, []);

  
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('https://api.eliteaide.tech/');
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Example function to fetch task data from API
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

  
  const handleCardPress = (menuTitle: string) => {
    switch(menuTitle) {
      case 'My Activity':
       
        Alert.alert('Navigating to My Activity');
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
      {/* {userInfo ? (
            <UserInfo userInfo={userInfo} />
        ) : (
          <Text style={tw`text-white`}>Loading user info...</Text>
        )} */}
        
        <TaskCard total={totalTasks} pending={pendingTasks} done={doneTasks} />
        
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

export default Profile;
