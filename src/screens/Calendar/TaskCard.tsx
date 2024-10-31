import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <View style={tw`flex-row items-center mb-4 bg-[${task.color}] rounded-lg p-3`}>
    <View style={tw`flex-1`}>
      <Text style={tw`text-white font-bold`}>{task.summary}</Text>
      <Text style={tw`text-white text-xs`}>{task.detail}</Text>
    </View>
    <Text style={tw`text-white text-xs`}>{task.time} - {parseInt(task.time) + 1}:00</Text>
    <Icon name="more-vertical" size={20} color="white" style={tw`ml-2`} />
  </View>
);

export default React.memo(TaskCard);