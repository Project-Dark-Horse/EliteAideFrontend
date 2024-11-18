// src/components/UpperNavBar/NotificationsComponent.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const NotificationsComponent: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log('Navigating to Notification');
    navigation.navigate('Notification'); // Make sure 'Notification' exists in the navigation stack
  };

  return (
    <TouchableOpacity onPress={handlePress} style={tw`mr-3`}>
      <Ionicons name="notifications" size={24} color="#65779E" />
    </TouchableOpacity>
  );
};

export default NotificationsComponent;