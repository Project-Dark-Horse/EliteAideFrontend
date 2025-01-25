import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { name: 'Personal', icon: 'person-outline' },
  { name: 'Work', icon: 'briefcase-outline' },
  { name: 'Finance', icon: 'cash-outline' },
  { name: 'Travel', icon: 'airplane-outline' },
  { name: 'Health', icon: 'heart-outline' },
  { name: 'Shopping', icon: 'cart-outline' },
];

const CategorySelector = ({ selectedCategory, onCategorySelect }: CategorySelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category</Text>
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.selectedCategory,
            ]}
            onPress={() => onCategorySelect(category.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={category.icon}
              size={16}
              color={selectedCategory === category.name ? '#fff' : '#3272A0'}
              style={styles.icon}
            />
            <Text style={[styles.categoryText, { fontSize: 12 }]}>{category.name}</Text>
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#3272A0',
    width: '30%',
  },
  selectedCategory: {
    backgroundColor: '#3272A0',
  },
  categoryText: {
    color: '#fff',
    marginLeft: 2,
  },
  icon: {
    marginRight: 5,
  },
});

export default CategorySelector; 