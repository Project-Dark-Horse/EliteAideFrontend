import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomMessageComponent: React.FC = () => {
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found');
          return;
        }

        const url = 'https://api.eliteaide.tech/v1/users/profile/';
        console.log('Fetching user profile from:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFirstName(data.message.user_data.first_name);
        } else {
          console.error('Failed to fetch user profile:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={tw`flex-row items-center mt-5 px-5`}>
      <View style={tw`flex-col`}>
        <Text style={tw`text-gray-500 text-base `}>
          Hey <Text style={tw`text-white`}>{firstName || 'User'},</Text>
        </Text>
        <Text style={tw`text-gray-400 text-base`}>Hope you have an awesome day!</Text>
      </View>
    </View>
  );
};

export default CustomMessageComponent;
