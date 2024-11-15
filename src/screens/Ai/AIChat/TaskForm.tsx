import React from 'react';
import { View } from 'react-native';
import CategorySelector from './CategorySelector';
import PrioritySelector from './PrioritySelector';
import DateTimeSelector from './DateTimeSelector';
import AutoCompleteToggle from './AutoCompleteToggle';

interface TaskFormProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priority: string;
  setPriority: (priority: string) => void;
  selectedDate: Date;
  selectedTime: Date;
  setShowDatePicker: (show: boolean) => void;
  setShowTimePicker: (show: boolean) => void;
  autoComplete: boolean;
  setAutoComplete: (auto: boolean) => void;
}

const TaskForm = (props: TaskFormProps) => (
  <View>
    <CategorySelector
      selectedCategory={props.selectedCategory}
      onCategorySelect={props.setSelectedCategory}
    />
    <PrioritySelector
      priority={props.priority}
      onPrioritySelect={props.setPriority}
    />
    <DateTimeSelector
      selectedDate={props.selectedDate}
      selectedTime={props.selectedTime}
      onDatePress={() => props.setShowDatePicker(true)}
      onTimePress={() => props.setShowTimePicker(true)}
    />
    <AutoCompleteToggle
      value={props.autoComplete}
      onToggle={() => props.setAutoComplete(!props.autoComplete)}
    />
  </View>
);

export default TaskForm;