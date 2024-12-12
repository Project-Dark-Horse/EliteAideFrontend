import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhotoComponent from './PhotoComponent';
import NotificationsComponent from '../UpperNavBar/NotificationComponent';

interface TopNavBarProps {
  navigation: any;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ navigation }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={tw`w-full h-8 flex-row justify-between items-center bg-[#111111] px-2`}>
      {/* Left: Profile Photo */}
      <PhotoComponent />

      {/* Right Side: Search Bar or Icons */}
      <View style={tw`flex-row items-center`}>
        {/* Conditionally Render Search Bar or Search Icon */}
        {isSearchVisible ? (
          <TextInput
            style={tw`bg-[#1E1E1E] text-white px-2 py-0.5 rounded-md text-sm`}
            placeholder="Search"
            placeholderTextColor="#65779E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            onBlur={() => setIsSearchVisible(false)} // Close search bar on blur
          />
        ) : (
          <TouchableOpacity
            onPress={() => setIsSearchVisible(true)}
            style={tw`mr-2`}
          >
            <Ionicons name="search-outline" size={20} color="#65779E" />
          </TouchableOpacity>
        )}

        {/* Notifications Icon */}
        <NotificationsComponent navigation={navigation} />
      </View>
    </View>
  );
};

export default TopNavBar;