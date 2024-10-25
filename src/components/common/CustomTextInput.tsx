import React from 'react';
import { TextInput, View, TextInputProps, TextStyle } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: string;
  style?: TextStyle | TextStyle[];
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  style
}) => (
  <View style={tw`relative flex-1 `}>
    <TextInput
      style={[
        tw`bg-[#111111] text-[#6F6F6F] p-3 rounded-2xl`,
        { borderColor: '#B0B0B0', borderWidth: 0.7, textAlign: 'left' },
        style
      ]}
      placeholder={placeholder}
      placeholderTextColor="#646464"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
    {icon && (
      <View style={tw`absolute right-4 top-3`}>
        <Ionicons name={icon} size={22} color="#979797" />
      </View>
    )}
  </View>
);

export default CustomTextInput;