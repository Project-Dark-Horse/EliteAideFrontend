// src/components/UpperNavBar/TopNavBar.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhotoComponent from './PhotoComponent';
import NotificationsComponent from '../UpperNavBar/NotificationComponent';

interface TopNavBarProps {
  navigation: any;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ navigation }) => {
  return (
    <View style={tw`w-full h-10 flex-row justify-between items-center bg-[#111111] px-2.5 mt-7`}>
      {/* Profile Photo */}
      <PhotoComponent />

      {/* Right Side Icons */}
      <View style={tw`flex-row items-center`}>
        {/* Search Icon */}
        <TouchableOpacity onPress={() => console.log('Search clicked')} style={tw`mr-3`}>
          <Ionicons name="search-outline" size={24} color="#65779E" />
        </TouchableOpacity>

        {/* Notifications Icon with navigation prop */}
        <NotificationsComponent navigation={navigation} />
      </View>
    </View>
  );
};

export default TopNavBar;