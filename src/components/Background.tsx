import React from 'react';
import { View, StyleSheet } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { BlurView } from '@react-native-community/blur';

const Background: React.FC = ({ children }) => {
  return (
    <View style={styles.container}>
      <RadialGradient
        style={styles.radialGradient}
        colors={['#4956C7', '#111111', '#111111']}
        center={[330, 99]}
        radius={350}
      />
      <BlurView
        style={styles.blurView}
        blurType="extraDark"
        blurAmount={70}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radialGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Background; 