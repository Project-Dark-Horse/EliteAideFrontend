import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, TextInput, RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '@env';
import CommonHeader from '../../components/CommonHeader';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import LoadingScreen from '../../components/Loading/LoadingScreen';

interface TaskStatistics {
  total: number;
  pending: number;
  completed: number;
}

interface Task {
  status: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [taskStats, setTaskStats] = useState<TaskStatistics>({
    total: 0,
    pending: 0,
    completed: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [logoutFailed, setLogoutFailed] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('https://api.eliteaide.tech/v1/users/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData({
          username: data.message.user_data.username,
          email: data.message.user_data.email,
        });
        if (data.message.user_data.profile_picture_url) {
          // Remove query parameters from the URL
          const cleanUrl = data.message.user_data.profile_picture_url.split('?')[0];
          console.log('Setting clean profile picture URL:', cleanUrl);
          setProfilePicture(cleanUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const fetchTaskStats = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('https://api.eliteaide.tech/v1/tasks/user-tasks?page=1&items_per_page=200', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message?.task_details?.data) {
          const tasks = data.message.task_details.data;
          const stats = {
            total: tasks.length,
            pending: tasks.filter((task: Task) => task.status === 'Pending').length,
            completed: tasks.filter((task: Task) => task.status === 'Completed').length,
          };
          setTaskStats(stats);
        }
      }
    } catch (error) {
      console.error('Error fetching task statistics:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchTaskStats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfileData();
    await fetchTaskStats();
    setRefreshing(false);
  };

  const handleEditProfilePic = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 1,
        includeBase64: false,
      });

      if (!result.didCancel && result.assets?.[0]?.uri) {
        let token = await AsyncStorage.getItem('access_token');
        if (!token) throw new Error('No access token found');

        const formData = new FormData();
        const imageFile = {
          uri: Platform.OS === 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri,
          type: result.assets[0].type || 'image/jpeg',
          name: result.assets[0].fileName || 'photo.jpg',
        };

        formData.append('profile_picture', imageFile as any);

        const response = await fetch('https://api.eliteaide.tech/v1/users/profile/picture/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const data = await response.json();
        console.log('Upload response:', data);

        if (response.ok && data.data?.profile_picture_url) {
          const newProfilePicUrl = data.data.profile_picture_url.split('?')[0];
          console.log('Setting new profile picture URL:', newProfilePicUrl);
          setProfilePicture(newProfilePicUrl);
          Alert.alert('Success', 'Profile picture updated successfully');
        } else if (data.error === 'Token is blacklisted') {
          console.warn('Token is blacklisted. Attempting to refresh token.');
          const newToken = await refreshAccessToken();
          if (newToken) {
            await handleEditProfilePic();
          } else {
            throw new Error('Failed to refresh token. Please log in again.');
          }
        } else {
          throw new Error(data.message || 'Failed to update profile picture');
        }
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert(
        'Error',
        'Failed to update profile picture. Please try again with a different image.'
      );
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token found');

      const response = await axios.post(
        `${BASE_URL}v1/users/refresh-token/`,
        { refresh_token: refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const newAccessToken = response.data.access_token;
        await AsyncStorage.setItem('access_token', newAccessToken);
        return newAccessToken;
      } else {
        console.error('Failed to refresh token:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const accessToken = await AsyncStorage.getItem('access_token');

      if (!refreshToken || !accessToken) {
        console.error('No refresh or access token found');
        Alert.alert('Error', 'No valid session found. Please log in again.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
        return;
      }

      const response = await axios.post(
        `${BASE_URL}v1/users/logout/`,
        { refresh_token: refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
      } else {
        console.error('Logout failed:', response.data);
        setLogoutFailed(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error === 'Token is blacklisted') {
          console.warn('Token is blacklisted. Clearing local tokens.');
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
          });
        } else {
          console.error('Logout error:', error.response?.data || error.message);
          setLogoutFailed(true);
        }
      } else {
        const errorMessage = (error as Error).message;
        console.error('Network error:', errorMessage);
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      }
    }
  };

  const handleLogoutAll = async () => {
    Alert.alert(
      'Logout from all devices',
      'Are you sure you want to logout from all devices?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              console.log('Logout from all devices in progress');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleNotifications = () => {
    navigation.navigate('NotificationScreen' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleSearchBar}>
              <Ionicons name="search" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleNotifications}>
              <Ionicons name="notifications" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {isSearchVisible && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <FastImage
                source={
                  profilePicture 
                    ? { 
                        uri: profilePicture,
                        priority: FastImage.priority.normal,
                      }
                    : require('../../assets/user.jpg')
                }
                style={styles.avatar}
                defaultSource={require('../../assets/user.jpg')}
                onLoadStart={() => {
                  console.log('Loading image:', profilePicture);
                  setImageLoading(true);
                }}
                onLoadEnd={() => {
                  console.log('Image loaded:', profilePicture);
                  setImageLoading(false);
                }}
                onError={() => {
                  console.error('Error loading image:', profilePicture);
                  setImageLoading(false);
                  setProfilePicture(null);
                }}
              />
              {imageLoading && (
                <View style={styles.imageLoadingOverlay}>
                  <ActivityIndicator color="#3B82F6" />
                </View>
              )}
              <TouchableOpacity style={styles.editButton} onPress={handleEditProfilePic}>
                <Ionicons name="pencil" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.username || 'Username'}</Text>
              <Text style={styles.userEmail}>{userData.email || 'Email'}</Text>
              <Text style={styles.userRole}>Software Developer</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.taskCard}>
          <Text style={styles.taskTitle}>Your tasks</Text>
          <View style={styles.taskStats}>
            <View style={styles.statItem}>
              <Ionicons name="flash" size={20} color="#3B82F6" />
              <Text style={styles.statNumber}>{taskStats.total}</Text>
              <Text style={styles.statLabel}>total</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time" size={20} color="#3B82F6" />
              <Text style={styles.statNumber}>{taskStats.pending}</Text>
              <Text style={styles.statLabel}>pending</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              <Text style={styles.statNumber}>{taskStats.completed}</Text>
              <Text style={styles.statLabel}>done</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('SettingsScreen' as never)}
          >
            <Ionicons name="settings" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('AboutEA' as never)}
          >
            <Ionicons name="information-circle" size={20} color="#6B7280" />
            <Text style={styles.menuText}>About Elite Aide</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color="#6B7280" />
            <Text style={styles.menuText}>
              {logoutFailed ? 'Click again to Logout' : 'Logout'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogoutAll}
          >
            <Ionicons name="log-out" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Logout from all devices</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingScreen loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#1D1E23',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#fff',
  },
  profileCard: {
    backgroundColor: '#1D1E23',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1D1E23',
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 4,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  userRole: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  taskCard: {
    backgroundColor: '#1D1E23',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  taskStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  menuContainer: {
    padding: 16,
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1D1E23',
    padding: 16,
    borderRadius: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  imageLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ProfileScreen);