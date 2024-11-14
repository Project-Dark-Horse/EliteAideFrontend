import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
  completed?: boolean;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <TouchableOpacity 
    style={[
      tw`flex-row items-center mb-2 rounded-xl p-3`,
      { backgroundColor: task.color }
    ]}
  >
    <View style={tw`mr-2`}>
      <Ionicons name="briefcase-outline" size={20} color="white" />
    </View>
    <View style={tw`flex-1`}>
      <Text style={tw`text-white font-semibold text-base`}>
        {task.summary}
      </Text>
      <Text style={tw`text-white/70 text-sm mt-0.5`}>
        {task.detail}
      </Text>
    </View>
    <View style={tw`flex-row items-center`}>
      <Text style={tw`text-white/70 text-sm mr-2`}>
        {task.time}
      </Text>
      {task.completed && (
        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
      )}
    </View>
  </TouchableOpacity>
);

export default React.memo(TaskCard);