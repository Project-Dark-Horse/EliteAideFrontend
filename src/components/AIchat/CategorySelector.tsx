import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = ['Personal', 'Work', 'Finance', 'Travel', 'Health', 'Shopping'];

const CategorySelector = ({ selectedCategory, onCategorySelect }: CategorySelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category Selector</Text>
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => onCategorySelect(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  selectedCategory: {
    backgroundColor: '#3272A0',
  },
  categoryText: {
    color: '#fff',
  },
});

export default CategorySelector; 