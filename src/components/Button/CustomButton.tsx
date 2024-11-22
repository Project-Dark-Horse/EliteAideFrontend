// CustomButton.tsx
import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';

type CustomButtonProps = {
  onPress?: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate 360 degrees
  });

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
          style={[
            tw`w-45px h-45px`,
            { transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }] }, // Apply scale and rotation
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;