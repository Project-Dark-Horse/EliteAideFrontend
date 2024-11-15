import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

interface TopBarProps {
  title: string;
  onPress?: () => void;
}

const SeeAllCards: React.FC<TopBarProps> = ({ title, onPress }) => {
  const navigation = useNavigation();
  const handleSeeAllPress = () => {
    navigation.navigate('MyTaskScreen' as never);
  };

  return (
    <View style={tw`flex-row justify-between items-center`}>
      <Text style={tw`text-[#7A7A7A] text-sm font-normal`}>{title}</Text>
      <TouchableOpacity onPress={handleSeeAllPress} style={tw`flex-row items-center my-2`}>
        <Text style={tw`text-[#7A7A7A] text-sm font-normal`}>See all </Text>
        <Icon name="chevron-forward" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SeeAllCards;
