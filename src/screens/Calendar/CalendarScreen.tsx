import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import WeekView from './WeekViewScreen';
import DaySchedule from './DayScheduleScreen';
import CalendarPopup from './CalendarPopup';
import CreateTaskModal from '../Ai/ManualTaskCreate';
import { styles } from './styles';
import { Task } from '../../types/Task'; // Adjust the path as necessary

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');

      const response = await axios.get('https://api.eliteaide.tech/v1/tasks/range', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          start_date: '2024-09-01',
          end_date: '2024-09-30',
          page: 1,
          item_per_page: 10,
          range_type: 'month',
        },
      });

      const fetchedTasks = response.data.data.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: new Date(task.due_date),
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        // Add any other fields you need
      }));

      setTasks(fetchedTasks);
    } catch (error) {
      setError('Error fetching tasks. Please try again later.');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');

      const response = await axios.post('https://api.eliteaide.tech/v1/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const createdTask = response.data;
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      setError('Error creating task. Please try again later.');
      console.error('Error creating task:', error);
    }
  };

  // Example usage of createTask function
  const handleCreateTask = () => {
    const newTask = {
      description: "Hello my friend 😊",
      due_date: "2024-11-17T13:06:00.000Z",
      priority: 3,
      status: "Pending",
      title: "New Task 3",
      type: "personal"
    };
    createTask(newTask);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#111111]`}>
      <View style={tw`flex-1 p-4`}>
        <Header 
          onCalendarPress={() => setIsCalendarVisible(true)} 
          onCreateTaskPress={() => setIsCreateTaskVisible(true)} 
        />
        {loading ? (
          <ActivityIndicator size="large" color="#36AAB9" />
        ) : error ? (
          <Text style={tw`text-red-500`}>{error}</Text>
        ) : (
          <>
            <WeekView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <DaySchedule 
              selectedDate={selectedDate} 
              tasks={tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
                time: task.time,
                summary: task.summary,
                detail: task.detail,
                date: task.date,
                color: task.color,
              }))}
            />
          </>
        )}
      </View>

      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsCalendarVisible(false)}
        >
          <View style={styles.modalContent}>
            <CalendarPopup 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              setIsCalendarVisible={setIsCalendarVisible} 
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default CalendarScreen;