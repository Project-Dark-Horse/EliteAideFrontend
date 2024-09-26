import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

interface TopBarProps {
  title: string;
  onSeeAllPress: () => void;
}

const SeeAllCards: React.FC<TopBarProps> = ({ title, onSeeAllPress }) => {
  return (
    <View style={tw`flex-row justify-between items-center`}>
      <Text style={tw`text-[#7A7A7A] text-sm font-normal`}>{title}</Text>
      <TouchableOpacity onPress={onSeeAllPress} style={tw`flex-row items-center my-2`}>
        <Text style={tw`text-[#7A7A7A] text-sm font-normal`}>See all </Text>
        <Icon name="chevron-forward" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SeeAllCards;
