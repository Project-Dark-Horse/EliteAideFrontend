// src/components/CommonHeader.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';

interface CommonHeaderProps {
  title: string;
  showTitle?: boolean;
  showNotificationIcon?: boolean;
  showSearchIcon?: boolean;
  onSearchPress?: () => void;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title,
  showTitle = true,
  showNotificationIcon = true,
  showSearchIcon = false,
  onSearchPress,
}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.iconButton}
      >
        <Icon name="chevron-back" size={24} color="#65779E" />
      </TouchableOpacity>

      {/* Title */}
      {showTitle && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {/* Right Icons */}
      <View style={styles.iconContainer}>
        {showSearchIcon && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onSearchPress}
          >
            <Icon name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {showNotificationIcon && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('NotificationScreen')} 
            style={styles.iconButton}
          >
            <Icon name="notifications" size={24} color="#65779E" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    backgroundColor: '#111111',
    paddingHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 5,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonHeader;