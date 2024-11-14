import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBorderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isUser?: boolean;
}

const GradientBorder = ({ children, style, isUser = false }: GradientBorderProps) => {
  if (isUser) {
    return (
      <View style={[{
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 16,
      }, style]}>
        {children}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#16213C', '#3272A0', '#3272A0', '#1E4E8D']}
      locations={[0, 0.4339, 0.4768, 1.0714]}
      style={[{
        padding: 1,
        borderRadius: 16,
      }, style]}
    >
      <View style={{ 
        backgroundColor: '#111111',
        borderRadius: 15,
      }}>
        {children}
      </View>
    </LinearGradient>
  );
};

export default GradientBorder; 