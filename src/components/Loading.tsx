import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

const Loading = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 80,
    borderColor: '#0079F3',
    borderTopColor: 'transparent',
    borderRightColor: 'rgba(0, 121, 243, 0.3)',
    borderBottomColor: 'rgba(0, 121, 243, 0.1)',
  },
  text: {
    color: 'white',
    marginTop: 32,
    fontSize: 16,
  },
});

export default Loading; 