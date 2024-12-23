import React, { useState, useEffect, useCallback } from 'react';
import { View, Modal, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Header from './Header';
import WeekView from './WeekViewScreen';
import CalendarPopup from './CalendarPopup';
import CreateTaskModal from './CreateTaskModal';
import { styles as globalStyles } from './styles';
import { BASE_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
  status: string;
}

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.get(`${BASE_URL}v1/tasks/user-tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { page: 1, items_per_page: 200 },
      });

      if (response.status !== 200) throw new Error('Failed to fetch tasks');

      const fetchedTasks = response.data.message.task_details.data.map((task: any) => ({
        id: task.id,
        time: task.due_date,
        summary: task.title,
        detail: task.description,
        date: new Date(task.due_date),
        color: getTaskColor(task.status),
        status: task.status,
      }));

      setTasks(fetchedTasks);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 }
    ]);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks();
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchTasks]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  }, [fetchTasks]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#111111]`}>
      <View style={tw`flex-1 p-4`}>
        <Header 
          onCalendarPress={() => setIsCalendarVisible(true)} 
          onCreateTaskPress={() => setIsCreateTaskVisible(true)} 
        />
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={tw`mt-10`} />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <WeekView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <DaySchedule selectedDate={selectedDate} tasks={tasks} />
          </ScrollView>
        )}
      </View>

      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <TouchableOpacity
          style={globalStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsCalendarVisible(false)}
        >
          <View style={globalStyles.modalContent}>
            <CalendarPopup 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              setIsCalendarVisible={setIsCalendarVisible}
              markedDates={{}}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <CreateTaskModal
        isVisible={isCreateTaskVisible}
        setIsVisible={setIsCreateTaskVisible}
        onClose={() => setIsCreateTaskVisible(false)}
        selectedDate={selectedDate}
        onSaveTask={addTask}
      />
    </SafeAreaView>
  );
};

interface DayScheduleProps {
  selectedDate: Date;
  tasks: Task[];
}

const DaySchedule: React.FC<DayScheduleProps> = ({ selectedDate, tasks }) => {
  const filteredTasks = tasks.filter(
    (task) => task.date.toDateString() === selectedDate.toDateString()
  );

  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i-12} PM`
  );

  return (
    <ScrollView style={tw`flex-1 mt-4`}>
      {timeSlots.map((time, index) => {
        const tasksAtTime = filteredTasks.filter(task => {
          const taskHour = new Date(task.time).getHours();
          return taskHour === index;
        });

        return (
          <View key={time} style={tw`flex-row mb-4`}>
            <Text style={tw`text-gray-400 w-16`}>{time}</Text>
            <View style={tw`flex-1`}>
              {tasksAtTime.map(task => (
                <View key={task.id} style={cardStyles.taskCardContainer}>
                  <LinearGradient
                    colors={['#16213C', '#3272A0', '#3272A0', '#1E4E8D']}
                    locations={[0, 0.4339, 0.4768, 1.0714]}
                    style={cardStyles.gradientBorder}
                  >
                    <View style={[cardStyles.taskCard, { backgroundColor: task.color }]}>
                      <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center`}>
                          <Ionicons name="briefcase-outline" size={20} color="#fff" />
                          <Text style={tw`text-white font-bold ml-2`}>{task.summary}</Text>
                        </View>
                        <Text style={tw`text-gray-300`}>
                          {new Date(task.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                        </Text>
                      </View>
                      <Text style={tw`text-gray-300 mt-1`}>{task.detail}</Text>
                    </View>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const cardStyles = StyleSheet.create({
  taskCardContainer: {
    marginBottom: 8,
    padding: 2,
  },
  gradientBorder: {
    borderRadius: 10,
    padding: 2,
  },
  taskCard: {
    borderRadius: 8,
    padding: 12,
  }
});

const getTaskColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return '#5560C4';
    case 'in_progress':
      return '#2196F3';
    default:
      return '#1D1E23';
  }
};

export default React.memo(CalendarScreen);