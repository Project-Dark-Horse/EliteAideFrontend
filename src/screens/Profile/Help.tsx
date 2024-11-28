import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadialGradient } from 'react-native-gradients';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const HelpScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "You can reach us at support@example.com.");
  };

  const handleVisitFAQ = () => {
    Alert.alert("Visit FAQ", "Opening FAQ section...");
  };

  return (
    <View style={tw`flex-1 bg-[#111111]`}>
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
      <TouchableOpacity
        style={tw`w-10 h-10 justify-center items-center mt-5 ml-5 bg-[#1D1E23] rounded-2xl`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-white text-3xl font-semibold mb-4 text-center`}>Help & Support</Text>
        <Text style={tw`text-[#979797] text-center text-lg mb-8`}>
          If you have any questions or need assistance, feel free to reach out to our support team or visit our FAQ.
        </Text>

        {/* Action Buttons */}
        <TouchableOpacity
          style={tw`bg-[#4956C7] rounded-2xl py-3 px-6 mb-4 w-4/5 items-center`}
          onPress={handleContactSupport}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-[#1D1E23] rounded-2xl py-3 px-6 w-4/5 items-center`}
          onPress={handleVisitFAQ}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Visit FAQ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(HelpScreen);