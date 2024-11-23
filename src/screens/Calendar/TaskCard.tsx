import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import tw from 'twrnc';

interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
  completed?: boolean;
  status: string;
}

const DayScheduleScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.eliteaide.tech/v1/tasks/user-tasks?page=2&items_per_page=5');
        const data = await response.json();
        const fetchedTasks = data.message.task_details.data.map((task: any) => ({
          id: task.id,
          time: '08:00', // Adjust as needed
          summary: task.title,
          detail: task.description,
          date: new Date(task.due_date),
          color: '#4CAF50', // Adjust as needed
          status: task.status,
        }));
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const renderTask = ({ item }: { item: Task }) => <TaskCard task={item} />;

  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DayScheduleScreen;