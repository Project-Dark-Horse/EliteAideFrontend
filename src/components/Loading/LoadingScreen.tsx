import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import tw from 'twrnc';

interface LoadingScreenProps {
  loading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      {/* Loading indicator */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4956C7" />
        <Text style={styles.quote}>
          "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort."
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quote: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LoadingScreen; 