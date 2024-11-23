// src/components/UpperNavBar/NotificationsComponent.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreenNavigationProp } from '../../types/navigation';

interface NotificationsComponentProps {
  navigation: HomeScreenNavigationProp;
}

const NotificationsComponent: React.FC<NotificationsComponentProps> = ({ navigation }) => {
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