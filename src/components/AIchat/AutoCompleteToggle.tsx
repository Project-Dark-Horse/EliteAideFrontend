import React from 'react';
import { View, Switch } from 'react-native';

interface AutoCompleteToggleProps {
  value: boolean;
  onToggle: () => void;
}

const AutoCompleteToggle = ({ value, onToggle }: AutoCompleteToggleProps) => {
  return (
    <View>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  );
};

export default AutoCompleteToggle; 