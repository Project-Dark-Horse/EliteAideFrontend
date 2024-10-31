import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';


interface HeaderProps {
  onCalendarPress: () => void;
  onCreateTaskPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCalendarPress, onCreateTaskPress }) => (
  <View style={tw`flex-row justify-between items-center mb-4 py-4`}>
    <TouchableOpacity onPress={onCalendarPress}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-xl text-white font-bold`}>Today</Text>
        <Icon name="chevron-down" size={24} color="white" style={tw`ml-1`} />
      </View>
    </TouchableOpacity>
    <Button
      mode="contained"
      onPress={onCreateTaskPress}
      style={tw`bg-[#1D1E23]`}
      labelStyle={tw`text-sm text-white`}
    >
      Create task
    </Button>
  </View>
);

export default React.memo(Header);