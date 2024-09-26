import React from 'react';
import { Button } from 'react-native-paper';
import tw from 'twrnc';

// Define an interface for component props
interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title }) => (
  <Button
    mode="elevated"
    onPress={onPress}
    style={tw`bg-[#1D1E23] rounded-2xl mt-8`} 
    contentStyle={tw`py-1`} 
    labelStyle={tw`text-sm text-white`} 
    elevation={5} 
  >
    {title}
  </Button>
);

export default CustomButton;
