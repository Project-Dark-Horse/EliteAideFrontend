import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Alert, RefreshControl } from 'react-native';
import SeeAllCards from './SeeAllCards';
import { Surface, ActivityIndicator } from 'react-native-paper';
import UpcomingTasksCard from './UpcomingTasksCard';
import tw from 'twrnc';
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

interface UpcomingTasksComponentProps {
  tasks: FormattedTask[];
}

interface TaskResponse {
  message: {
    task_details: {
      data: {
        id: number;
        title: string;
        description: string;
        due_date: string;
        type: string;
        priority: string;
        status: string;
      }[];
    };
  };
}

const UpcomingTasksComponent: React.FC<UpcomingTasksComponentProps> = React.memo(({ tasks }) => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [localTasks, setLocalTasks] = useState<FormattedTask[]>(tasks);
  const { shouldRefresh, setShouldRefresh } = useTaskRefresh();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      const today = new Date();
      const twodays = new Date(today);
      twodays.setDate(twodays.getDate() + 2);
      
      const startDate = today.toISOString().split('T')[0];
      const endDate = twodays.toISOString().split('T')[0];
      
      const response = await axios.get<TaskResponse>(`${BASE_URL}v1/tasks/range`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });

      if (response.data?.message?.task_details?.data?.length > 0) {
        const fetchedTasks = response.data.message.task_details.data.map((task) => {
          const dueDate = new Date(task.due_date);
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            time: dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: dueDate.toLocaleDateString(),
            backgroundColor: getBackgroundColor(task.type),
            iconName: getIconName(task.type),
            priority: Number(task.priority),
            status: task.status,
            type: task.type,
            due_date: task.due_date
          };
        });
        setLocalTasks(fetchedTasks.slice(0, 3));
      } else {
        setLocalTasks([]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Unable to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchTasks]);

  useFocusEffect(
    useCallback(() => {
      if (shouldRefresh) {
        fetchTasks();
        setShouldRefresh(false);
      }
    }, [shouldRefresh, fetchTasks, setShouldRefresh])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  }, [fetchTasks]);

  return (
    <Surface style={tw`p-4 bg-[#111111]`}>
      <SeeAllCards 
        title="Upcoming Tasks" 
        onPress={() => navigation.navigate('MyTaskScreen')}
      />
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <FlatList
          horizontal
          data={localTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UpcomingTasksCard
              id={item.id}
              title={item.title}
              description={item.description}
              time={item.time}
              date={item.date}
              backgroundColor={item.backgroundColor}
              iconName={item.iconName}
            />
          )}
          contentContainerStyle={tw`py-1`}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={tw`w-3`} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </Surface>
  );
});

export default UpcomingTasksComponent;
