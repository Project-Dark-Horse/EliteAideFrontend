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
import { useTaskRefresh } from '../../context/TaskRefreshContext';
import { useFocusEffect } from '@react-navigation/native';
import { FormattedTask } from '../../types/Task';
import { getIconName, getBackgroundColor } from '../../utils/taskUtils';

type RootStackParamList = {
  MyTaskScreen: undefined;
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface PinnedTasksProps {
  tasks: FormattedTask[];
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

const PinnedTasks: React.FC<PinnedTasksProps> = ({ tasks: initialTasks }) => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const { shouldRefresh, setShouldRefresh } = useTaskRefresh();
  const [tasks, setTasks] = useState(initialTasks);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      // Get current date and time
      const now = new Date();
      
      // Set end date to 7 days from now
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 12);

      const startDate = now.toISOString().split('T')[0];
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

      console.log('API Response:', response.data);

      if (response.data?.message?.task_details?.data?.length > 0) {
        const fetchedTasks = response.data.message.task_details.data
          .filter(task => {
            const taskDateTime = new Date(task.due_date);
            return taskDateTime > now; 
          })
          .map((task: TaskResponse['message']['task_details']['data'][0]) => {
            const dueDate = new Date(task.due_date);
            return {
              id: task.id,
              title: task.title,
              description: task.description,
              status: task.status,
              due_date: task.due_date,
              type: task.type,
              priority: task.priority,
              time: dueDate.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }).toUpperCase(),
              day: dueDate.toLocaleDateString('en-US', {
                weekday: 'long'
              }) || 'Today',
              backgroundColor: '#1E1E1E',
              iconName: getIconName(task.type),
            };
          });

        console.log('Filtered tasks:', fetchedTasks);
        console.log('Setting local tasks:', fetchedTasks);
        setTasks(fetchedTasks);
      } else {
        console.log('No tasks received from API');
      }
    } catch (error) {
      console.error('Error fetching pinned tasks:', error);
      Alert.alert('Error', 'Unable to fetch pinned tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Initial tasks:', initialTasks);
    fetchTasks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (shouldRefresh) {
        fetchTasks();
        setShouldRefresh(false);
      }
    }, [shouldRefresh])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
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