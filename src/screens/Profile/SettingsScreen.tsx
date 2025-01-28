import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Corrected import
import { RootStackParamList } from '../../types/navigation';
import CommonHeader from '../../components/CommonHeader';
import { authStorage } from '../../utils/authStorage';
import notificationService from '../../utils/notificationService';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsScreen'>;

const settingsOptions = [
  { title: 'Task Settings', icon: 'settings-outline', screen: 'TaskSettingsScreen' },
  { title: 'Privacy & Security', icon: 'lock-closed-outline', screen: 'PrivacySecurity' },
  { title: 'Edit Profile', icon: 'person-outline', screen: 'EditProfile' },
  { title: 'Invite a friend', icon: 'people-outline' },
  { title: 'Help', icon: 'help-circle-outline', screen: 'HelpScreen' },
  { title: 'Feedback', icon: 'thumbs-up-outline', screen: 'FeedbackScreen' },
  { title: 'Update App', icon: 'refresh-outline', action: 'updateApp' },
];

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleOptionPress = (option: any) => {
    if (option.screen) {
      navigation.navigate(option.screen);
    } else if (option.title === 'Invite a friend') {
      Alert.alert('Invite a Friend', 'This feature is coming soon!');
    } else if (option.title === 'Update App') {
      handleUpdateCheck();
    } else if (option.title === 'About Elite Aide') {
      Alert.alert('About Elite Aide', 'Version 1.0.0');
    } else {
      console.log(`Unhandled option: ${option.title}`);
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const filteredOptions = settingsOptions.filter(option =>
    option.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      // Clear all auth data
      await authStorage.clearTokens();
      
      // Reset navigation to login
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const handleUpdateCheck = () => {
    // Your update check logic
    notificationService.showUpdateNotification(
      'App is up to date',
      'You\'re running the latest version of Elite Aide'
    );
  };

  return (
    <View style={tw`flex-1 bg-[#000000]`}>
      {/* Custom Header */}
      <LinearGradient
        colors={['#000000', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={tw`h-20 w-full flex-row items-center px-4`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-semibold flex-1 text-center`}>Settings</Text>
        <TouchableOpacity onPress={toggleSearchBar}>
          <Ionicons name="search-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {/* Settings Options */}
      <ScrollView contentContainerStyle={tw`px-4 py-6`}>
        <View style={tw`bg-[#1D1E23] rounded-lg p-4`}>
          {filteredOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              style={[
                tw`flex-row items-center justify-between py-4`,
                index < filteredOptions.length - 1 && tw`border-b border-[#555555]`,
              ]}
            >
              <View style={tw`flex-row items-center`}>
                <Ionicons name={option.icon} size={20} color="#65779E" />
                <Text style={tw`text-[#FFFFFF] text-base ml-4`}>{option.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#1D1E23',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#fff',
  },
});

export default React.memo(SettingsScreen);