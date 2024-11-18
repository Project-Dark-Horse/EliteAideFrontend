// CustomButton.tsx
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type CustomButtonProps = {
  onPress?: () => void;
  navigation?: StackNavigationProp<any>;
};

const CustomButton: React.FC<CustomButtonProps> = ({ onPress }) => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('ManualTaskCreate');
    }
  };

  return (
    <View style={tw`absolute bottom-10 left-0 right-0 items-center`}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          tw`w-16 h-10 rounded-full justify-center items-center`,
          {
            shadowColor: '#384766',
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
          source={require('../../assets/plustabbar.png')}
          style={tw`w-45px h-45px`}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;