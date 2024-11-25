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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTaskRefresh } from '../../context/TaskRefreshContext';
import { useFocusEffect } from '@react-navigation/native';
import { FormattedTask } from '../../types/task';
import { getIconName, getBackgroundColor } from '../../utils/taskUtils';

type RootStackParamList = {
  MyTaskScreen: undefined;
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface UpcomingTasksComponentProps {
  tasks: FormattedTask[];
}

const UpcomingTasksComponent: React.FC<UpcomingTasksComponentProps> = ({ tasks }) => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const { shouldRefresh, setShouldRefresh } = useTaskRefresh();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      console.log('[HomeScreen] Fetching upcoming tasks...');
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }
      console.log('[HomeScreen] Token retrieved, making API call...');

      // Get today's date and next 7 days date for upcoming tasks
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const startDate = today.toISOString().split('T')[0];
      const endDate = nextWeek.toISOString().split('T')[0];
      
      console.log('[HomeScreen] Fetching tasks between:', { startDate, endDate });
      
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

      console.log('[HomeScreen] API Response received:', response.status);

      if (response.data?.message?.task_details?.data?.length > 0) {
        console.log('[HomeScreen] Processing', response.data.message.task_details.data.length, 'tasks');
        const fetchedTasks = response.data.message.task_details.data.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          time: new Date(task.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          backgroundColor: getBackgroundColor(task.type),
          iconName: getIconName(task.type),
          priority: task.priority,
          status: task.status,
          type: task.type
        }));
        // Only take first 3 tasks for display
        setTasks(fetchedTasks.slice(0, 3));
        console.log('[HomeScreen] Tasks processed and state updated');
      } else {
        console.log('[HomeScreen] No tasks received from API');
      }
    } catch (error) {
      console.error('[HomeScreen] Error fetching tasks:', error);
      Alert.alert('Error', 'Unable to fetch tasks');
    } finally {
      setLoading(false);
      console.log('[HomeScreen] Fetch tasks operation completed');
    }
  };

  useEffect(() => {
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