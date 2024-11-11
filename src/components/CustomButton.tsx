// CustomButton.tsx
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

type CustomButtonProps = {
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ onPress }) => (
  <View style={tw`absolute bottom-10 left-0 right-0 items-center`}>
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`w-16 h-16 bg-[#384766] rounded-full justify-center items-center`,
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Create new task"
      accessibilityHint="Navigates to the manual create task screen"
    >
      <Image
        source={require('../assets/plustabbar.png')}
        style={tw`w-6 h-6`}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
);

export default CustomButton;