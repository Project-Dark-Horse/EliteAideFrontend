import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';
import tw from 'twrnc';

interface LoadingScreenProps {
  loading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      {/* Base black background */}
      <View style={styles.backgroundBase} />
      
      {/* Top radial gradient */}
      <RadialGradient
        style={tw`absolute top-0 left-0 right-0 h-[350px]`}
        colors={['#4956C7', '#111111', '#111111']}
        center={[330, 99]}
        radius={350}
      />

      {/* Bottom radial gradient */}
      <RadialGradient
        style={tw`absolute top-200 left-0 right-0 h-[350px]`}
        colors={['#4956C7', '#111111', '#111111']}
        center={[200, 99]}
        radius={500}
      />

      {/* Blur overlay */}
      <BlurView
        style={tw`absolute inset-1`}
        blurType="extraDark"
        blurAmount={100}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />

      {/* Loading indicator */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4956C7" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen; 