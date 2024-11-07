import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CategoryButtonProps {
  icon: string;
  label: string;
  selected?: boolean;
  onPress: () => void;
}

const CategoryButton = ({icon, label, selected, onPress}: CategoryButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selectedButton]}
      onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
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
    paddingHorizontal: 12,
  },
  selectedButton: {
    backgroundColor: '#3A3A3C',
    borderColor: '#0A84FF',
    borderWidth: 1,
  },
  icon: {
    marginRight: 4,
    fontSize: 16,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default CategoryButton;