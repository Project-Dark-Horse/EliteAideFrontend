import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

interface PriorityButtonProps {
  label: string;
  color: string;
  selected?: boolean;
  onPress: () => void;
}

const PriorityButton = ({
  label,
  color,
  selected,
  onPress,
}: PriorityButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selectedButton]}
      onPress={onPress}>
      <View style={[styles.dot, {backgroundColor: color}]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#3A3A3C',
    borderColor: '#0A84FF',
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default PriorityButton;