import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

const LoadingScreen = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [spinAnim, slideAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <Circle cx="50" cy="50" r="40" fill="url(#grad)" />
          <Defs>
            <RadialGradient id="grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(40)">
              <Stop stopColor="#0079F3" />
              <Stop offset="1" stopColor="#001D3A" stopOpacity="0" />
            </RadialGradient>
          </Defs>
        </Svg>
      </Animated.View>
      <Animated.Text style={[styles.text, { transform: [{ translateY: slideAnim }] }]}>
        Elite Aide
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LoadingScreen;
