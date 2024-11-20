// src/components/UpperNavBar/NotificationsComponent.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { RootStackParamList } from '../../types/navigation';


const NotificationsComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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