import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import tw from 'twrnc';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <View style={styles.mainContainer}>
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
        style={tw`absolute bottom-0 left-0 right-0 h-[100px]`}
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
      
      {/* Content container */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...tw`flex-1`,
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  safeArea: {
    ...tw`flex-1`,
  },
  container: {
    ...tw`flex-1 px-4`,
  },
});

export default React.memo(Background);