import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadialGradient } from 'react-native-gradients';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const TaskSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [defaultPriority, setDefaultPriority] = useState('Medium');
  const [taskCategory, setTaskCategory] = useState('');

  const toggleSwitch = () => setRemindersEnabled((prev) => !prev);

  const colorList = [
    { offset: '0%', color: '#4956C7', opacity: '1' },
    { offset: '70%', color: '#111111', opacity: '1' },
    { offset: '100%', color: '#111111', opacity: '1' },
  ];

  const handleSaveSettings = () => {
    Alert.alert("Settings saved successfully!");
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`absolute inset-0`}>
        <RadialGradient
          colorList={colorList}
          x="50%"
          y="50%"
          rx="50%"
          ry="50%"
        />
      </View>

      <View style={tw`absolute inset-1 bg-[#000000] opacity-70`} />

      <TouchableOpacity
        style={tw`w-10 h-10 justify-center items-center mt-5 ml-5 bg-[#1D1E23] rounded-2xl`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={tw`text-white text-2xl font-semibold mt-[90px] text-center`}>Task Settings</Text>

      <View style={tw`mt-10 mx-6 p-4 bg-[#1D1E23] rounded-2xl`}>
        <View style={tw`flex-row justify-between items-center py-4 border-b border-[#333]`}>
          <Text style={tw`text-white text-base`}>Enable Reminders</Text>
          <Switch
            value={remindersEnabled}
            onValueChange={toggleSwitch}
            thumbColor={remindersEnabled ? "#4956C7" : "#555"}
            trackColor={{ false: "#333", true: "#4956C7" }}
          />
        </View>

        <View style={tw`py-4 border-b border-[#333]`}>
          <Text style={tw`text-white text-base mb-2`}>Default Task Priority</Text>
          <View style={tw`flex-row justify-between`}>
            {['Low', 'Medium', 'High'].map((priority) => (
              <TouchableOpacity
                key={priority}
                onPress={() => setDefaultPriority(priority)}
                style={[
                  tw`px-3 py-2 rounded-2xl`,
                  { backgroundColor: defaultPriority === priority ? '#4956C7' : '#333' },
                ]}
              >
                <Text style={tw`text-white`}>{priority}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={tw`py-4`}>
          <Text style={tw`text-white text-base mb-2`}>Default Task Category</Text>
          <TextInput
            style={[
              tw`bg-[#111111] text-white p-3 rounded-2xl border-[#6F6F6F]`,
              { borderWidth: 0.5 },
            ]}
            placeholder="Enter default category..."
            placeholderTextColor="#6F6F6F"
            value={taskCategory}
            onChangeText={setTaskCategory}
          />
        </View>
      </View>

      <TouchableOpacity
        style={tw`bg-[#4956C7] rounded-2xl mx-6 mt-6 py-3 items-center shadow-lg`}
        onPress={handleSaveSettings}
      >
        <Text style={tw`text-white text-base font-semibold`}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(TaskSettingsScreen);