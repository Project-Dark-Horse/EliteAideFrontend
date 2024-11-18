import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

const LoadingScreen: React.FC = () => {
  const progress = 70; // This would be dynamic based on actual loading progress

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={progress}
          tintColor="transparent" // Make the circle transparent
          backgroundColor="transparent" // Transparent background
          lineCap="round" // Rounded line ends
        >
          {() => (
            <View style={styles.gradientCircleContainer}>
              <Svg height="200" width="200" viewBox="0 0 200 200">
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
                    <Stop offset="0%" stopColor="#00BCD4" stopOpacity="1" />
                    <Stop offset="100%" stopColor="#8E2DE2" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Circle cx="100" cy="100" r="92.5" stroke="url(#grad)" strokeWidth="15" fill="none" />
              </Svg>
              <Text style={styles.progressText}>{`${progress}%`}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Dark background for better contrast
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gradientCircleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  progressText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default LoadingScreen;