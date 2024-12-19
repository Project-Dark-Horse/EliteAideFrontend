import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';

const EditProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    mobileNumber: '',
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('https://api.eliteaide.tech/v1/users/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData({
          firstName: data.message.user_data.first_name || '',
          lastName: data.message.user_data.last_name || '',
          username: data.message.user_data.username || '',
          email: data.message.user_data.email || '',
          mobileNumber: data.message.user_data.mobile_number || '',
        });
        
        if (data.message.user_data.profile_picture_url) {
          const cleanUrl = data.message.user_data.profile_picture_url.split('?')[0];
          setProfilePicture(cleanUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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
        setProfilePicture(data.message.profile_picture_url);
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
      if (!token) throw new Error('No access token found');

      const updatedFields = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.username,
        email: userData.email,
        mobile_number: userData.mobileNumber,
      };

      const response = await fetch('https://api.eliteaide.tech/v1/users/profile/update/', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <FastImage
              source={
                profilePicture 
                  ? { 
                      uri: profilePicture,
                      priority: FastImage.priority.normal,
                    }
                  : require('../../assets/user.jpg')
              }
              style={styles.avatar}
              defaultSource={require('../../assets/user.jpg')}
              onLoadStart={() => {
                console.log('Starting to load image:', profilePicture);
                setImageLoading(true);
              }}
              onLoadEnd={() => {
                console.log('Finished loading image');
                setImageLoading(false);
              }}
              onError={() => {
                console.error('Error loading image');
                setImageLoading(false);
                setProfilePicture(null);
              }}
            />
            {imageLoading && (
              <View style={styles.imageLoadingOverlay}>
                <ActivityIndicator size="small" color="#3B82F6" />
              </View>
            )}
            <TouchableOpacity 
              style={styles.editButton}
              onPress={handleImagePick}
            >
              <Ionicons name="pencil" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={userData.firstName}
              onChangeText={(text) => setUserData(prev => ({ ...prev, firstName: text }))}
              placeholder="First Name"
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input} 
              value={userData.lastName}
              onChangeText={(text) => setUserData(prev => ({ ...prev, lastName: text }))}
              placeholder="Last Name"
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              value={userData.username}
              onChangeText={(text) => setUserData(prev => ({ ...prev, username: text }))}
              placeholder="Username"
              placeholderTextColor="#6B7280"
            />
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => setUserData(prev => ({ ...prev, email: text }))}
              placeholder="Email"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              value={userData.mobileNumber}
              onChangeText={(text) => setUserData(prev => ({ ...prev, mobileNumber: text }))}
              placeholder="Mobile Number"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1D1E23',
  },
  imageLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: '30%',
    bottom: 0,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 8,
  },
  formContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: '#1D1E23',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
