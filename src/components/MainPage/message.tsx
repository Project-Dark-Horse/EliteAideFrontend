import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const CustomMessageComponent: React.FC = () => {
  return (
    <View style={tw`flex-row items-center mt-5 px-5`}>
      
      <View style={tw`flex-col`}>
        <Text style={tw`text-gray-500 text-base `}>
          Heya <Text style={tw`text-white`}>Arush,</Text>
        </Text>
        <Text style={tw`text-gray-400 text-base`}>Hope you have an awesome day!</Text>
      </View>
    </View>
  );
};

export default CustomMessageComponent;
