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
}

interface DayScheduleProps {
  selectedDate: Date;
  tasks: Task[];
}

const DaySchedule: React.FC<DayScheduleProps> = ({ selectedDate, tasks }) => {
  const timeSlots = useMemo(() => Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`), []);

  const filteredTasks = useMemo(() => tasks.filter(
    task => task.date.toDateString() === selectedDate.toDateString()
  ), [tasks, selectedDate]);

  return (
    <ScrollView style={tw`flex-grow`}>
      {timeSlots.map((time, index) => (
        <View key={index} style={tw`flex-row py-2`}>
          <Text style={tw`text-gray-500 w-12 text-right mr-4`}>{time}</Text>
          <View style={tw`flex-1 border-l border-gray-700 pl-4`}>
            {filteredTasks
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