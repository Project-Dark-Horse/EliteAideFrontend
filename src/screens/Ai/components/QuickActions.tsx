import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

interface QuickActionProps {
  actions: string[];
  onSelect: (action: string) => void;
}

const QuickActions = ({ actions, onSelect }: QuickActionProps) => (
  <View style={tw`flex-row flex-wrap gap-2 my-4`}>
    {actions.map((action) => (
      <TouchableOpacity
        key={action}
        style={tw`bg-[#1E2746] px-4 py-2 rounded-full`}
        onPress={() => onSelect(action)}
      >
        <Text style={tw`text-white`}>{action}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default QuickActions; 