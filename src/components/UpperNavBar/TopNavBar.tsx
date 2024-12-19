import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface TopNavBarProps {
  navigation: any;
}

// Create a separate NotificationsComponent
const NotificationsComponent: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <TouchableOpacity>
      <Ionicons name="notifications-outline" size={20} color="#65779E" />
    </TouchableOpacity>
  );
};

const TopNavBar: React.FC<TopNavBarProps> = ({ navigation }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfileData = async () => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        console.log('No access token found');
        return;
      }

      const response = await fetch('https://api.eliteaide.tech/v1/users/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok && data.message?.user_data?.profile_picture_url) {
        // Remove query parameters from the URL
        const cleanUrl = data.message.user_data.profile_picture_url.split('?')[0];
        console.log('Setting clean profile picture URL:', cleanUrl);
        setProfilePicture(cleanUrl);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use useFocusEffect to refresh profile data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchProfileData();
    }, [])
  );

  return (
    <View style={tw`w-full h-8 flex-row justify-between items-center bg-[#111111] px-2`}>
      {/* Left: Profile Photo */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <FastImage
          source={
            profilePicture 
              ? { 
                  uri: profilePicture,
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }
              : require('../../assets/user.jpg')
          }
          style={tw`w-8 h-8 rounded-full`}
          defaultSource={require('../../assets/user.jpg')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>

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
            onBlur={() => setIsSearchVisible(false)}
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

export default React.memo(TopNavBar);