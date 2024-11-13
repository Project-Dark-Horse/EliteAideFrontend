import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserInfo from '../../components/Profile/UserInfo';
import TaskCard from '../../components/Profile/TaskCard';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BASE_URL } from '@env';
import { StyleSheet } from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

interface UserInfoType {
  email: string;
  first_name: string;
  last_name: string;
  position: string;
}

interface TaskData {
  total: number;
  pending: number;
  done: number;
}

const defaultUserInfo: UserInfoType = {
  email: 'sampleuser@example.com',
  first_name: 'Sample',
  last_name: 'User',
  position: 'Marketing Manager',
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [taskData, setTaskData] = useState<TaskData>({ total: 0, pending: 0, done: 0 });
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [loadingTaskData, setLoadingTaskData] = useState(true);

  useEffect(() => {
    fetchUserInfo();
    fetchTaskData();
  }, []);

  const fetchUserInfo = async () => {
    setLoadingUserInfo(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${BASE_URL}/v1/users/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user info');
      const data = await response.json();
      setUserInfo(data.message.user_data);
    } catch (error) {
      Alert.alert('Error', 'Unable to load user info');
      setUserInfo(defaultUserInfo);
    } finally {
      setLoadingUserInfo(false);
    }
  };

  const fetchTaskData = async () => {
    setLoadingTaskData(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${BASE_URL}/v1/tasks/user-tasks/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch task data');
      const data = await response.json();
      setTaskData({ total: data.total, pending: data.pending, done: data.done });
    } catch (error) {
      Alert.alert('Error', 'Unable to load task data');
    } finally {
      setLoadingTaskData(false);
    }
  };

  const handleCardPress = (menuTitle: string) => {
    switch (menuTitle) {
      case 'My Activity':
        navigation.navigate('MyActivityScreen');
        break;
      case 'SettingsScreen':
        navigation.navigate('SettingsScreen');
        break;
      case 'About Elite Aide':
        Alert.alert('About Elite Aide', 'Version 1.0.0');
        break;
      case 'Logout':
        handleLogout();
        break;
      case 'Logout from All Devices':
        Alert.alert('Info', 'Logout from all devices is currently in progress.');
        break;
      default:
        console.log('Unknown menu item');
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('refresh_token');
      const response = await fetch(`${BASE_URL}/v1/users/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token: token }),
      });
      if (response.ok) {
        await AsyncStorage.clear();
        Alert.alert('Logged out successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Logout failed');
      }
    } catch (error) {
      Alert.alert('Logout failed', 'Unable to connect to the server');
    }
  };

  // Custom Header Component
  const Header = () => (
    <View style={tw`flex-row items-center justify-between px-4 py-4 bg-[#000000]`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="chevron-circle-left" size={29} color="#384766" />
      </TouchableOpacity>
      <Text style={tw`text-white text-lg font-semi-bold`}>Profile</Text>
      <View style={tw`flex-row`}>
        <TouchableOpacity style={tw`mr-4`}>
          <FontAwesome name="search" size={24} color="#384766" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="bell" size={24} color="#384766" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-[#000000]`}>
      <Header />
      <View style={tw`p-4`}>
        <View style={tw`items-center`}>
          {loadingUserInfo ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : userInfo ? (
            <UserInfo userInfo={userInfo} />
          ) : (
            <Text style={tw`text-white`}>Error loading user info</Text>
          )}

          {loadingTaskData ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <TaskCard total={taskData.total} pending={taskData.pending} done={taskData.done} />
          )}

          <ProfileMenu title="My Activity" iconName="stats-chart" onPress={() => handleCardPress('My Activity')} />
          <ProfileMenu title="Settings" iconName="settings" onPress={() => handleCardPress('SettingsScreen')} />
          <ProfileMenu title="About Elite Aide" iconName="information-circle-outline" onPress={() => handleCardPress('About Elite Aide')} />
          <ProfileMenu title="Logout" iconName="log-out" onPress={() => handleCardPress('Logout')} />
          <ProfileMenu title="Logout from All Devices" iconName="log-out" onPress={() => handleCardPress('Logout from All Devices')} />
        </View>
        </View>
      </View>
    
  );
  
};
const styles = StyleSheet.create({
  iconName: {
    backgroundColor: '#65779E',
    borderRadius: 20,
    padding: 8,
  },
});

export default ProfileScreen;