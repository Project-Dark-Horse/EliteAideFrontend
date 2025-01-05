import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadialGradient } from 'react-native-gradients';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const ChatSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>, label: string) => {
    setter((prev) => !prev);
    Alert.alert(`${label} has been ${!setter ? 'enabled' : 'disabled'}`);
  };

  return (
    <ScrollView style={tw`flex-1 bg-[#111111]`}>
      {/* Background Gradient */}
      <View style={tw`absolute inset-0`}>
        <RadialGradient
          colorList={[
            { offset: '0%', color: '#4956C7', opacity: '1' },
            { offset: '70%', color: '#111111', opacity: '1' },
            { offset: '100%', color: '#111111', opacity: '1' },
          ]}
          x="50%"
          y="50%"
          rx="50%"
          ry="50%"
        />
      </View>
      <View style={tw`absolute inset-1 bg-[#000000] opacity-70`} />

      {/* Header */}
      <View style={tw`flex-row items-center mt-10 px-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={tw`text-white text-2xl font-semibold`}>Chat Settings</Text>
      </View>

      {/* Settings Card */}
      <View style={tw`mt-8 mx-6 p-4 bg-[#1D1E23] rounded-2xl shadow-lg`}>
        {/* Notifications */}
        <View style={tw`flex-row justify-between items-center py-3 border-b border-[#333]`}>
          <Text style={tw`text-white text-base`}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => toggleSwitch(setNotificationsEnabled, 'Notifications')}
            thumbColor={notificationsEnabled ? "#4956C7" : "#555"}
            trackColor={{ false: "#333", true: "#4956C7" }}
          />
        </View>

        {/* Chat Backup */}
        <View style={tw`flex-row justify-between items-center py-3 border-b border-[#333]`}>
          <Text style={tw`text-white text-base`}>Enable Chat Backup</Text>
          <Switch
            value={backupEnabled}
            onValueChange={() => toggleSwitch(setBackupEnabled, 'Chat Backup')}
            thumbColor={backupEnabled ? "#4956C7" : "#555"}
            trackColor={{ false: "#333", true: "#4956C7" }}
          />
        </View>

        {/* Dark Theme */}
        <View style={tw`flex-row justify-between items-center py-3`}>
          <Text style={tw`text-white text-base`}>Dark Theme</Text>
          <Switch
            value={darkTheme}
            onValueChange={() => toggleSwitch(setDarkTheme, 'Dark Theme')}
            thumbColor={darkTheme ? "#4956C7" : "#555"}
            trackColor={{ false: "#333", true: "#4956C7" }}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={tw`mx-6 mt-8`}>
        <TouchableOpacity
          style={tw`bg-[#4956C7] rounded-2xl py-4 items-center mb-4`}
          onPress={() => Alert.alert("Chat Backup", "Your chat backup has started!")}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Backup Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`bg-[#D9534F] rounded-2xl py-4 items-center`}
          onPress={() => Alert.alert("Clear Chat History", "All chat history will be cleared.")}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Clear Chat History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default React.memo(ChatSettingsScreen);