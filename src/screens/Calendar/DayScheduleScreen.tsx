import React, { useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import tw from 'twrnc';
import TaskCard from './TaskCard';

interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
  completed?: boolean;
}

interface DayScheduleProps {
  selectedDate: Date;
  tasks: Task[];
}

const DaySchedule: React.FC<DayScheduleProps> = ({ selectedDate, tasks }) => {
  const timeSlots = useMemo(() => 
    Array.from({ length: 11 }, (_, i) => {
      const hour = i + 8;
      return hour < 12 ? 
        `${hour} AM` : 
        hour === 12 ? 
          '12 PM' : 
          `${hour - 12} PM`;
    }), 
  []);

  return (
    <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
      {timeSlots.map((time, index) => (
        <View key={index} style={tw`flex-row h-24`}>
          <Text style={tw`text-gray-500 w-16 text-right mr-4 text-sm`}>
            {time}
          </Text>
          <View style={tw`flex-1 border-l border-[#2C2C2E] pl-4`}>
            {tasks
              .filter(task => task.time === time)
              .map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default React.memo(DaySchedule);