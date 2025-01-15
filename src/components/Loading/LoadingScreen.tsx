import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';

interface LoadingScreenProps {
  loading: boolean;
  backgroundColor?: string;
  spinnerColor?: string;
  style?: ViewStyle;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loading,
  backgroundColor = 'rgba(0, 0, 0, 0.7)',
  spinnerColor = '#3272A0',
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Start spinning
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      );
      
      spinAnimation.start();
      
      return () => {
        spinAnimation.stop();
      };
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, fadeAnim, spinValue]);

  if (!loading) return null;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor },
        style,
        { opacity: fadeAnim }
      ]}
    >
      <Animated.View
        style={[
          styles.spinner,
          { 
            borderColor: spinnerColor,
            borderTopColor: 'transparent'
          },
          { transform: [{ rotate: spin }] }
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
  },
});

export default LoadingScreen; 