import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

interface CustomToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomToggle = ({value, onValueChange}: CustomToggleProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, value && styles.containerActive]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}>
      <View style={[styles.handle, value && styles.handleActive]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: '#3A3A3C',
    padding: 2,
  },
  containerActive: {
    backgroundColor: '#0A84FF',
  },
  handle: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#FFFFFF',
  },
  handleActive: {
    transform: [{translateX: 20}],
  },
});

export default CustomToggle;