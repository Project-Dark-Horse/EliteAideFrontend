// src/components/CommonHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';

interface HeaderProps {
  title?: string;
  showTitle?: boolean;
  showNotificationIcon?: boolean;
  onSearchToggle?: () => void;
  onSearchQueryChange?: (query: string) => void;
  isSearchVisible?: boolean;
  searchQuery?: string;
}

const CommonHeader: React.FC<HeaderProps> = ({
  title = "Profile",
  showTitle = true,
  showNotificationIcon = true,
  onSearchToggle,
  onSearchQueryChange,
  isSearchVisible = false,
  searchQuery = '',
}) => {
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
        <TouchableOpacity style={styles.iconButton} onPress={onSearchToggle}>
          <Icon name="search-outline" size={24} color="#65779E" />
        </TouchableOpacity>

        {/* Notifications Icon with navigation to NotificationScreen */}
        {showNotificationIcon && (
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')} style={styles.iconButton}>
            <Icon name="notifications" size={24} color="#65779E" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Bar */}
      {isSearchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={onSearchQueryChange}
        />
      )}
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
  searchInput: {
    backgroundColor: '#1D1E23',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#fff',
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
  },
});

export default CommonHeader;