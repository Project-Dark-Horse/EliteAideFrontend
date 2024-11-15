import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
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
import MyActivityScreen from './MyActivity';

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

const defaultUserInfo = {
  message: {
    user_data: {
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      mobile_number: '',
    }
  }
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [taskData, setTaskData] = useState<TaskData>({ total: 0, pending: 0, done: 0 });
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [loadingTaskData, setLoadingTaskData] = useState(true);
  const [profileData, setProfileData] = useState<any | null>(null);

  useEffect(() => {
    fetchProfileData();
    fetchTaskData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoadingUserInfo(true);
      const accessToken = await AsyncStorage.getItem('access_token');
      
      if (!accessToken) {
        throw new Error('No access token found');
      }

      console.log('Fetching profile from:', `${BASE_URL}/users/profile/`);
      
      const response = await fetch(`${BASE_URL}/users/profile/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          
        },
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Profile Response:', data);

      if (response.ok) {
        setProfileData(data);
        setUserInfo(data);
      } else {
        throw new Error(data.error || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      Alert.alert('Error', 'Unable to load profile data');
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
        navigation.navigate('MyActivity');
        break;
      case 'SettingsScreen':
        navigation.navigate('SettingsScreen');
        break;
      case 'About Elite Aide':
        Alert.alert('About Elite Aide', 'Version 1.0.0');
        break;
      case 'Logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: handleLogout }
          ]
        );
        break;
      case 'Logout from All Devices':
        Alert.alert(
          'Logout from All Devices',
          'Are you sure you want to logout from all devices?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: handleLogoutAllDevices }
          ]
        );
        break;
      case 'Delete Account':
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account? This action cannot be undone.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Delete', 
              onPress: handleDeleteAccount,
              style: 'destructive'
            }
          ]
        );
        break;
      default:
        console.log('Unknown menu item');
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const accessToken = await AsyncStorage.getItem('access_token');
      
      console.log('Refresh Token:', refreshToken); // Debug log
      
      if (!refreshToken || !accessToken) {
        // Clear any remaining tokens and navigate to login
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }

      const response = await fetch(`${BASE_URL}/users/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        }),
      });

      console.log('Logout Response:', response.status); // Debug log

      // Even if the logout API fails, we should clear tokens and redirect to login
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

    } catch (error) {
      console.error('Logout error:', error);
      // Even on error, clear tokens and redirect to login
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(`${BASE_URL}v1/user/logout-all/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        throw new Error('Logout from all devices failed');
      }
    } catch (error) {
      console.error('Logout all devices error:', error);
      Alert.alert('Error', 'Failed to logout from all devices. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(`${BASE_URL}/users/profile/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
  };

  const Header = () => (
    <View style={tw`flex-row items-center justify-between px-4 py-4 bg-[#111111]`}>
      <TouchableOpacity 
        style={tw`bg-[#1D1E23] w-10 h-10 rounded-full items-center justify-center`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#384766" />
      </TouchableOpacity>
      <Text style={tw`text-white text-lg font-medium`}>Profile</Text>
      <View style={tw`flex-row gap-4`}>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#384766" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#384766" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-[#111111]`}>
      <Header />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {loadingUserInfo || loadingTaskData ? (
          <ActivityIndicator size="small" color="#384766" style={tw`mt-4`} />
        ) : (
          <View style={tw`items-center`}>
            <UserInfo 
              userInfo={userInfo || defaultUserInfo} 
              isLoading={loadingUserInfo} 
            />
            <TaskCard total={taskData.total} pending={taskData.pending} done={taskData.done} />
            <ProfileMenu title="My Activity" iconName="time-outline" onPress={() => handleCardPress('My Activity')} />
            <ProfileMenu title="Settings" iconName="settings-outline" onPress={() => handleCardPress('SettingsScreen')} />
            <ProfileMenu title="About Elite Aid" iconName="information-circle-outline" onPress={() => handleCardPress('About Elite Aide')} />
            <ProfileMenu title="Logout" iconName="log-out-outline" onPress={() => handleCardPress('Logout')} />
            <ProfileMenu title="Logout from all devices" iconName="log-out-outline" onPress={() => handleCardPress('Logout from All Devices')} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default ProfileScreen;