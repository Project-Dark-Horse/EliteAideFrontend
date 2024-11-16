import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const TASK_TYPES = [
  { id: 'health', icon: '❤️', label: 'Health' },
  { id: 'travel', icon: '✈️', label: 'Travel' },
  { id: 'work', icon: '💼', label: 'Work' },
  { id: 'shopping', icon: '🛍️', label: 'Shopping' },
  { id: 'finance', icon: '💰', label: 'Finance' },
  { id: 'personal', icon: '👤', label: 'Personal' },
];

interface TaskTypeSelectorProps {
  onSelect: (type: string) => void;
}

const TaskTypeSelector = ({ onSelect }: TaskTypeSelectorProps) => (
  <View style={tw`flex-row flex-wrap gap-2`}>
    {TASK_TYPES.map(({ id, icon, label }) => (
      <TouchableOpacity
        key={id}
        style={tw`bg-[#1E2746] px-4 py-2 rounded-full flex-row items-center`}
        onPress={() => onSelect(id)}
      >
        <Text style={tw`mr-2`}>{icon}</Text>
        <Text style={tw`text-white`}>{label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default TaskTypeSelector; 