import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (error) {
      console.error('Logout error:', error);
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
              await AsyncStorage.removeItem('accessToken');
              // Add API call to invalidate all tokens
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }],
              });
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/ManAvatar.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Priyanka Deshmukh</Text>
            <Text style={styles.userEmail}>priyankadeshmukh.h@gmail.com.com</Text>
            <Text style={styles.userRole}>Software Developer</Text>
          </View>
        </View>
      </View>

      {/* Tasks Summary */}
      <TouchableOpacity style={styles.taskCard}>
        <Text style={styles.taskTitle}>Your tasks</Text>
        <View style={styles.taskStats}>
          <View style={styles.statItem}>
            <Ionicons name="flash" size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>125</Text>
            <Text style={styles.statLabel}>total</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>pending</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>done</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('MyActivity' as never)}
        >
          <Ionicons name="time" size={24} color="#6B7280" />
          <Text style={styles.menuText}>My Activity</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('SettingsScreen' as never)}
        >
          <Ionicons name="settings" size={24} color="#6B7280" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('About' as never)}
        >
          <Ionicons name="information-circle" size={24} color="#6B7280" />
          <Text style={styles.menuText}>About Elite Aid</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={24} color="#6B7280" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleLogoutAll}
        >
          <Ionicons name="log-out" size={24} color="#6B7280" />
          <Text style={styles.menuText}>Logout from all devices</Text>
        </TouchableOpacity>
      </View>
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
});

export default ProfileScreen;
