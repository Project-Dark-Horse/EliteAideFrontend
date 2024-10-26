import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

const CustomButton: React.FC = () => {
  return (
    <View style={tw`absolute bottom-10 left-0 right-0 items-center`}>
      <TouchableOpacity
        onPress={() => console.log('Custom Button Pressed')}
        style={tw`w-16 h-16 bg-[#384766] rounded-full justify-center items-center shadow-lg`}
      >
        <Image
          source={require('../assets/plustabbar.png')}
          style={tw`w-6 h-6`} // Adjust icon size here
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;