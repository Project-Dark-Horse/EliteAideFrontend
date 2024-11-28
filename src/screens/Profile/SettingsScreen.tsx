import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Corrected import
import { RootStackParamList } from '../../types/navigation';
import CommonHeader from '../../components/CommonHeader';

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

  const handleOptionPress = (option: any) => {
    if (option.screen) {
      navigation.navigate(option.screen);
    } else if (option.title === 'Invite a friend') {
      Alert.alert('Invite a Friend', 'This feature is coming soon!');
    } else if (option.title === 'Update App') {
      Alert.alert('Update App', 'Your app is up to date!');
    } else if (option.title === 'About Elite Aide') {
      Alert.alert('About Elite Aide', 'Version 1.0.0');
    } else {
      console.log(`Unhandled option: ${option.title}`);
    }
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
        <Ionicons name="search-outline" size={24} color="#FFFFFF" />
      </LinearGradient>

      {/* Settings Options */}
      <ScrollView contentContainerStyle={tw`px-4 py-6`}>
        <View style={tw`bg-[#1D1E23] rounded-lg p-4`}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              style={[
                tw`flex-row items-center justify-between py-4`,
                index < settingsOptions.length - 1 && tw`border-b border-[#555555]`,
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

export default React.memo(SettingsScreen);