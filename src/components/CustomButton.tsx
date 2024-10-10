import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import tw from 'twrnc';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

const CustomButton: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ChatScreen'>>();

  return (
    <View style={tw`absolute bottom-10 left-0 right-0 items-center`}>
      <FAB
        icon="plus"
        onPress={() => navigation.navigate('ChatScreen')} 
        style={tw`w-13 h-13 bg-[#384766] rounded-full justify-center items-center shadow-lg`}
        color="white"
      />
    </View>
  );
};

export default CustomButton;
