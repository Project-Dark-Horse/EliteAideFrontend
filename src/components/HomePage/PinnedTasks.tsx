import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from 'react-native';
import tw from 'twrnc';
import SeeAllCards from "./SeeAllCards";
import { Surface, ActivityIndicator } from "react-native-paper";
import PinnedTasksCard from "./PinnedTasksCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  day: string;
  backgroundColor: string;
  iconName: string;
}

interface TaskResponse {
  message: {
    message: string;
    task_details: {
      total_pages: number;
      total_items: number;
      current_page: string;
      page_size: string;
      data: Array<{
        id: number;
        title: string;
        description: string;
        priority: number;
        status: string;
        due_date: string;
        type: string;
        created_at: string;
        updated_at: string;
        creator: number;
      }>;
    };
  };
}

const getBackgroundColor = (type: string): string => {
  // Always return the dark background color as per design
  return '#1E1E1E';
};

const getIconName = (type: string): string => {
  switch (type) {
    case 'Work/Professional Tasks':
      return 'people';
    case 'Meeting':
      return 'people';
    case 'Discussion':
      return 'chatbubble';
    case 'Review':
      return 'document-text';
    case 'Personal Tasks':
      return 'person';
    case 'Errands':
      return 'list';
    default:
      return 'notifications';
  }
};

type RootStackParamList = {
  MyTaskScreen: undefined;
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const PinnedTasks: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const startDate = today.toISOString().split('T')[0];
      const endDate = nextWeek.toISOString().split('T')[0];
      
      const response = await axios.get<TaskResponse>(`${BASE_URL}v1/tasks/range`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          start_date: startDate,
          end_date: endDate,
          is_pinned: true
        }
      });

      if (response.data?.message?.task_details?.data?.length > 0) {
        const fetchedTasks = response.data.message.task_details.data.map((task) => {
          const dueDate = new Date(task.due_date);
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            time: dueDate.toLocaleTimeString([], { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            }).toUpperCase(),
            day: dueDate.toLocaleDateString('en-US', { 
              weekday: 'long' 
            }),
            backgroundColor: '#1E1E1E',
            iconName: getIconName(task.type),
          };
        });
        setTasks(fetchedTasks);
      }
    } catch (error) {
      console.error('Error fetching pinned tasks:', error);
      Alert.alert('Error', 'Unable to fetch pinned tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Surface style={tw`p-4 bg-[#111111] flex-1`}>
      <SeeAllCards title="Weekly Tasks" />
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PinnedTasksCard
              id={item.id}
              title={item.title}
              description={item.description}
              day={item.day}
              time={item.time}
              iconName={item.iconName}
              backgroundColor={item.backgroundColor}
            />
          )}
          contentContainerStyle={tw`py-2`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={tw`h-3`} />}
        />
      )}
    </Surface>
  );
};

export default PinnedTasks;