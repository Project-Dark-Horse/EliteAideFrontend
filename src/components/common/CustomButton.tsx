import React, { useRef } from 'react';
import { Button } from 'react-native-paper';
import { View, Animated, Easing, Image } from 'react-native';
import tw from 'twrnc';

// Define an interface for component props
interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // Start the rotation animation
    Animated.timing(rotation, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Reset the rotation value after the animation
      rotation.setValue(0);
    });

    // Call the onPress function passed as a prop
    onPress();
  };

  // Interpolate the rotation value to degrees
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={tw`items-center`}>
      <Animated.Image
        source={require('../../assets/bot.png')}
        style={[{ width: 50, height: 50 }, { transform: [{ rotate }] }]}
      />
      <Button
        mode="elevated"
        onPress={handlePress}
        style={tw`bg-[#1D1E23] rounded-2xl mt-8`}
        contentStyle={tw`py-1`}
        labelStyle={tw`text-sm text-white`}
        elevation={5}
      >
        {title}
      </Button>
    </View>
  );
};

export default CustomButton;
