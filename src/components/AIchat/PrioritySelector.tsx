import React from 'react';
import { View, Text } from 'react-native';

interface PrioritySelectorProps {
  priority: string;
  onPrioritySelect: (priority: string) => void;
}

const PrioritySelector = ({ priority, onPrioritySelect }: PrioritySelectorProps) => {
  return (
    <View>
      <Text>Priority Selector</Text>
    </View>
  );
};

export default PrioritySelector; 