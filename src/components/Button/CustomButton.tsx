// CustomButton.tsx
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import tw from 'twrnc';

type CustomButtonProps = {
  onPress?: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [showThought, setShowThought] = useState(false);
  const thoughtAnim = useRef(new Animated.Value(0)).current;

  const productivityThoughts = [
    "Stay focused!",
    "Keep pushing forward!",
    "You're doing great!",
    "Every step counts!",
    "Believe in yourself!"
  ];

  const randomThought = productivityThoughts[Math.floor(Math.random() * productivityThoughts.length)];

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
    setShowThought(true);
    Animated.timing(thoughtAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(thoughtAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowThought(false));
      }, 2000);
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate 360 degrees
  });

  return (
    <View style={tw`absolute bottom-10 left-0 right-0 items-center`}>
      {showThought && (
        <Animated.View style={{ opacity: thoughtAnim, marginBottom: 18 }}>
          <Text style={tw`text-gray-600 text-center`}>{randomThought}</Text>
        </Animated.View>
      )}
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
            { transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }] },
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;