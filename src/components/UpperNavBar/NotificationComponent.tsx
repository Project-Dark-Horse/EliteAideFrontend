import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import bottomTabNavigator from '../../navigators/bottomTabNavigator';
import tw from 'twrnc';

const NotificationsComponent: React.FC = () => {
  const navigation = useNavigation();  // Use navigation hook

  return (
    <View style={tw`flex-row justify-end items-center`}>
      <View style={tw`w-6 h-6 justify-center items-center mx-0`}>
        <Icon name="search" size={24} color="#646464" />
      </View>
      <TouchableOpacity
        style={tw`w-6 h-6 justify-center items-center mx-5`}
        onPress={() => navigation.navigate('NotificationScreen')}  // Navigate on press
      >
        <Icon name="notifications" size={24} color="#646464" />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsComponent;