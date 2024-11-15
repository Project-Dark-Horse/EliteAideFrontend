import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions, Alert, ScrollView } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { BlurView } from '@react-native-community/blur';
import tw from 'twrnc';
import profilePic from '../../assets/ManAvatar.png';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ label, value, onChangeText, keyboardType }) => {
  return (
    <View style={{ 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: 343,
      height: 72,
      backgroundColor: '#111111',
      borderColor: '#979797',
      borderWidth: 0.2,
      borderRadius: 16,
      marginBottom: 16,
    }}>
      <Text style={{ color: '#888888', fontSize: 12, marginBottom: 4 }}>{label}</Text>
      <TextInput
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          width: '100%',
          padding: 0,
        }}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#888888"
      />
    </View>
  );
};

const EditProfile: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    mobile_number: '',
    occupation: '',
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}v1/users/profile/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.message.user_data;
        setFormData(userData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}v1/users/profile/update/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_data: formData
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (label: string, value: string, field: keyof typeof formData) => {
    return (
      <View style={tw`mb-6`}>
        <Text style={tw`text-[#666666] text-base mb-2`}>{label}</Text>
        <View style={tw`bg-[#111111] rounded-2xl p-4 border border-[#333333]`}>
          <TextInput
            style={tw`text-white text-lg`}
            value={value}
            onChangeText={(text) => setFormData(prev => ({ ...prev, [field]: text }))}
            keyboardType={field === 'email' ? 'email-address' : field === 'mobile_number' ? 'phone-pad' : 'default'}
            placeholderTextColor="#666666"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 pt-12 pb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon source={{uri: 'chevron-back'}} size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-semibold`}>Edit Profile</Text>
        <View style={tw`w-8`} /> {/* Placeholder for alignment */}
      </View>

      <ScrollView style={tw`flex-1 px-4`}>
        {/* Profile Picture Section */}
        <View style={tw`items-center mt-6 mb-8`}>
          <View style={tw`flex-row space-x-4`}>
            <Image 
              source={require('../../assets/ManAvatar.png')} 
              style={tw`w-16 h-16 rounded-full`}
            />
            <View style={tw`w-16 h-16 rounded-full bg-[#333333]`} />
          </View>
          <TouchableOpacity style={tw`mt-3`}>
            <Text style={tw`text-[#4956C7] text-base`}>Edit picture or avatar</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        {renderInputField('Name', formData.first_name, 'first_name')}
        {renderInputField('Username', formData.username, 'username')}
        {renderInputField('Occupation', formData.occupation || '', 'occupation')}
        {renderInputField('Email id', formData.email, 'email')}
        {renderInputField('Phone Number', formData.mobile_number, 'mobile_number')}
      </ScrollView>

      {/* Save Button - Fixed at bottom */}
      <View style={tw`px-4 pb-8 pt-4`}>
        <TouchableOpacity 
          style={tw`bg-[#4956C7] p-4 rounded-2xl`}
          onPress={handleUpdateProfile}
          disabled={isLoading}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;