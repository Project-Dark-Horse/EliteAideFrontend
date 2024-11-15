import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategorySelector = ({ selectedCategory, onCategorySelect }: CategorySelectorProps) => {
  return (
    <View>
      <Text>Category Selector</Text>
    </View>
  );
};

export default CategorySelector; 