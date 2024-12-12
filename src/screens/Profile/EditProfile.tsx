import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

// Define a type for profile data
type ProfileData = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  mobile_number: string;
};

const EditProfile = () => {
  console.log('EditProfile component re-rendered');
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    mobile_number: '',
  });
  const [profileImage, setProfileImage] = useState<any>({ uri: null });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) throw new Error('No access token found');

        const response = await fetch('https://api.eliteaide.tech/v1/users/profile/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProfileData(data.message.user_data);
          // Set profile image if available
          if (data.message.user_data.profile_picture_url) {
            console.log('Profile picture URL:', data.message.user_data.profile_picture_url);
            setProfileImage({ uri: data.message.user_data.profile_picture_url });
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
      });

      if (!result.didCancel && result.assets?.[0]?.uri) {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) throw new Error('No access token found');

        const formData = new FormData();
        formData.append('profile_picture', {
          uri: result.assets[0].uri,
          type: result.assets[0].type || 'image/jpeg',
          name: result.assets[0].fileName || 'profile.jpg',
        } as any);

        const response = await fetch('https://api.eliteaide.tech/v1/users/profile/picture/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload image');

        const data = await response.json();
        setProfileImage({ uri: data.message.profile_picture_url });
        Alert.alert('Success', 'Profile picture updated successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }

      const updatedFields: Partial<ProfileData> = {};
      Object.keys(profileData).forEach(key => {
        if (profileData[key as keyof ProfileData]) {
          updatedFields[key as keyof ProfileData] = profileData[key as keyof ProfileData];
        }
      });

      console.log('Updated Fields:', updatedFields);

      const response = await fetch('https://api.eliteaide.tech/v1/users/profile/update/', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorResponseText = await response.text();
        console.log('Error Response Text:', errorResponseText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Profile Update Response:', data);

      // Update the state with the new profile data
      setProfileData(data.message.data);
      console.log('Updated Profile Data:', data.message.data);

      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
        <View style={styles.avatarWrapper}>
          <Image 
            source={
              profileImage?.uri 
                ? { uri: profileImage.uri } 
                : require('../../assets/user.jpg')
            }
            style={styles.avatar}
            defaultSource={require('../../assets/user.jpg')} // Fallback image while loading
          />
          <TouchableOpacity 
            style={styles.editIconContainer}
            onPress={handleImagePick}
          >
            <View style={styles.editIconWrapper}>
              <Icon name="pencil" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.avatarText}>Edit picture or avatar</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput 
            style={styles.input}
            value={profileData.first_name}
            onChangeText={(value) => handleInputChange('first_name', value)}
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput 
            style={styles.input}
            value={profileData.last_name}
            onChangeText={(value) => handleInputChange('last_name', value)}
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input}
            value={profileData.username}
            onChangeText={(value) => handleInputChange('username', value)}
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            value={profileData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput 
            style={styles.input}
            value={profileData.mobile_number}
            onChangeText={(value) => handleInputChange('mobile_number', value)}
            keyboardType="phone-pad"
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const additionalStyles = {
  saveButton: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600' as '600',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#3B82F6', // Blue color
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#111111',
  },
  avatarText: {
    color: '#6B7280',
    fontSize: 16,
  },
  formContainer: {
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    fontSize: 14,
  },
  editIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ...additionalStyles,
});

export default React.memo(EditProfile);
