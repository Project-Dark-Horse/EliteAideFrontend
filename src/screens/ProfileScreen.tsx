import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ActivityIndicator } from 'react-native';
import UserInfo from '../components/Profile/UserInfo';
import TaskCard from '../components/Profile/TaskCard';
import ProfileMenu from '../components/Profile/ProfileMenu';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { BASE_URL } from '@env';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

interface UserInfoType {
  name: string;
  email: string;
  avatar?: string;
}

interface TaskData {
  total: number;
  pending: number;
  done: number;
}

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
      case 'Settings':
        navigation.navigate('SettingsScreen');
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
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${BASE_URL}/v1/users/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

  return (
    <View style={tw`flex-1 bg-[#111111] p-4`}>
      <View style={tw`items-center mt-6`}>
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
        <ProfileMenu title="Settings" iconName="settings" onPress={() => handleCardPress('Settings')} />
        <ProfileMenu title="About Elite Aide" iconName="information-circle-outline" onPress={() => handleCardPress('About Elite Aide')} />
        <ProfileMenu title="Logout" iconName="log-out" onPress={() => handleCardPress('Logout')} />
      </View>
    </View>
  );
};

export default ProfileScreen;