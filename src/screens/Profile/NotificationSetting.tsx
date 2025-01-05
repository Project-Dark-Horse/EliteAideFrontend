import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadialGradient } from 'react-native-gradients';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1`}>
      <RadialGradient
        colorList={[
          { offset: '0%', color: '#4956C7', opacity: '1' },
          { offset: '50%', color: '#111111', opacity: '1' },
          { offset: '100%', color: '#111111', opacity: '1' },
        ]}
        x="50%"
        y="50%"
        rx="50%"
        ry="50%"
      />
      <View style={tw`absolute inset-1 bg-[#000000] opacity-70`} />

      <TouchableOpacity
        style={tw`w-10 h-10 justify-center items-center mt-5 ml-5 bg-[#1D1E23] rounded-2xl`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={tw`text-white text-2xl font-semibold mt-[90px] text-center`}>Notifications</Text>
    </View>
  );
};

export default React.memo(NotificationScreen);