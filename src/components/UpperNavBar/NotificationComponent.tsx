// src/components/UpperNavBar/NotificationsComponent.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../types/navigation';

const NotificationsComponent: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNotificationPress = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <TouchableOpacity onPress={handleNotificationPress}>
      <Icon name="notifications" size={24} color="#65779E" />
    </TouchableOpacity>
  );
};

export default NotificationsComponent;