// CustomButton.tsx
import React, { useRef } from 'react';
import { View, TouchableOpacity, Image, Animated } from 'react-native';
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
  const scaleAnim = useRef(new Animated.Value(1)).current; // Create an animated value

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9, // Scale down
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
    }
  };

  return (
    <View style={tw`absolute bottom-10 left-0 right-0 items-center`}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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
        accessibilityHint="Triggers an animation instead of navigating"
      >
        <Animated.Image
          source={require('../../assets/bot.png')}
          style={[tw`w-45px h-45px`, { transform: [{ scale: scaleAnim }] }]} // Apply scale animation
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;