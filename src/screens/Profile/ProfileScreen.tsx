import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '@env';
import CommonHeader from '../../components/CommonHeader';
import axios from 'axios';

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

  useEffect(() => {
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
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
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

    fetchTaskStats();
  }, []);

  const handleEditProfilePic = () => {
    const options = {
      mediaType: 'photo' as const,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1.0 as const,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log(uri);
      }
    });
  };

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const accessToken = await AsyncStorage.getItem('access_token');
  
      if (!refreshToken || !accessToken) {
        console.error('No refresh or access token found');
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
        }
      } else {
        console.error('Unexpected error:', error);
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
              // Implement the logout-all functionality when the endpoint is ready
              console.log('Logout from all devices in progress');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/user.jpg')}
                style={styles.avatar}
              />
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
            <Text style={styles.menuText}>About Elite Aid</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Logout</Text>
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
});

export default ProfileScreen;
