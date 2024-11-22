// src/components/UpperNavBar/NotificationsComponent.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for your navigation routes
type RootStackParamList = {
  NotificationScreen: undefined; // Add other routes here if needed
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const NotificationsComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={tw`mr-3`}>
      <Ionicons name="notifications" size={24} color="#65779E" />
    </TouchableOpacity>
  );
};

export default NotificationsComponent;