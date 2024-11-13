// src/components/CommonHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import NotificationsComponent from '../components/UpperNavBar/NotificationComponent';
import { HomeScreenNavigationProp } from '../types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title?: string;
  showTitle?: boolean;
  showNotificationIcon?: boolean;
}

const CommonHeader: React.FC<HeaderProps> = ({ title = "Profile", showTitle = true, showNotificationIcon = true }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
        <FontAwesome name="chevron-circle-left" size={29} color="#65779E" />
      </TouchableOpacity>

      {/* Title */}
      {showTitle && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {/* Right Icons (Search and Notifications) */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search-outline" size={24} color="#65779E" />
        </TouchableOpacity>

        {/* Conditionally show Notifications Icon */}
        {showNotificationIcon && <NotificationsComponent navigation={navigation} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    backgroundColor: '#111111',
    paddingHorizontal: 10,
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }], // Center title better based on dynamic width
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 5,
  },
});

export default CommonHeader;