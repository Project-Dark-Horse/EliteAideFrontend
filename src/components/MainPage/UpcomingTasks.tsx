// UpcomingTasks.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import SeeAllCards from './SeeAllCards';
import { Surface, ActivityIndicator } from 'react-native-paper';
import UpcomingTasksCard from './UpcomingTasksCard';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env';

interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
  iconName: string;
}

const sampleTasks: Task[] = [
  { id: 1, title: 'Team Meeting', description: 'Group discussion for the new product', time: '10 AM', backgroundColor: '#4956C7', iconName: 'people' },
  { id: 2, title: 'Design Review', description: 'Review of the new design prototype', time: '2 PM', backgroundColor: '#3C8FA9', iconName: 'chatbubble' },
  { id: 3, title: 'Code Review', description: 'Review of the recent code changes', time: '4 PM', backgroundColor: '#3D83AA', iconName: 'notifications' },
];

const UpcomingTasksComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.get(`${BASE_URL}/v1/tasks/user-tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 1, items_per_page: 3 },
      });

      if (response.data && response.data.length > 0) {
        const fetchedTasks = response.data.map((task: any, index: number) => ({
          id: task.id,
          title: task.title || `Task ${index + 1}`,
          description: task.description || 'No description provided',
          time: new Date(task.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          backgroundColor: sampleTasks[index]?.backgroundColor || '#3C8FA9',
          iconName: sampleTasks[index]?.iconName || 'list',
        }));
        setTasks(fetchedTasks);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Surface style={tw`p-4 bg-[#111111]`}>
      <SeeAllCards title="Upcoming Tasks" onSeeAllPress={() => console.log('See all pressed')} />
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <FlatList
          horizontal
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UpcomingTasksCard
              id={item.id}
              title={item.title}
              description={item.description}
              time={item.time}
              backgroundColor={item.backgroundColor}
              iconName={item.iconName}
            />
          )}
          contentContainerStyle={tw`py-1`}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={tw`w-3`} />}
        />
      )}
    </Surface>
  );
};

export default UpcomingTasksComponent;