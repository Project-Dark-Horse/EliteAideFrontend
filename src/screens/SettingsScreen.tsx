import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsScreen'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleOptionPress = (option: string) => {
    Alert.alert(option, `${option} pressed`);
  };

  return (
    <View style={tw`flex-1 bg-[#111111] p-4`}>
      <View style={tw`mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-2`}>
          <Text style={tw`text-blue-500 text-lg`}>Back</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-2xl font-bold`}>Settings</Text>
      </View>
      
      <ScrollView contentContainerStyle={tw`mt-4`}>
        <TouchableOpacity
          style={tw`bg-[#1e1e1e] p-4 mb-2 rounded-lg`}
          onPress={() => handleOptionPress('Account Settings')}
        >
          <Text style={tw`text-white text-lg`}>Account Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`bg-[#1e1e1e] p-4 mb-2 rounded-lg`}
          onPress={() => handleOptionPress('Privacy Settings')}
        >
          <Text style={tw`text-white text-lg`}>Privacy Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`bg-[#1e1e1e] p-4 mb-2 rounded-lg`}
          onPress={() => handleOptionPress('Notification Settings')}
        >
          <Text style={tw`text-white text-lg`}>Notification Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`bg-[#1e1e1e] p-4 mb-2 rounded-lg`}
          onPress={() => handleOptionPress('Language Settings')}
        >
          <Text style={tw`text-white text-lg`}>Language Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`bg-[#1e1e1e] p-4 mb-2 rounded-lg`}
          onPress={() => handleOptionPress('About Elite Aide')}
        >
          <Text style={tw`text-white text-lg`}>About Elite Aide</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;