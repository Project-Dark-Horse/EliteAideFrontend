import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...'
}) => {
  return (
    <View style={tw`flex-row items-center bg-[#1D1E23] rounded-full px-4 py-2`}>
      <Icon name="search" size={20} color="#979797" style={tw`mr-2`} />
      <TextInput
        style={tw`flex-1 text-white`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#979797"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={tw`ml-2`}>
          <Icon name="close-circle" size={20} color="#979797" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar; 