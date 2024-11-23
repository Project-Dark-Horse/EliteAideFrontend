import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Header from './Header';
import WeekView from './WeekViewScreen';
import DaySchedule from './DayScheduleScreen';
import CalendarPopup from './CalendarPopup';
import CreateTaskModal from './CreateTaskModal';
import { styles } from './styles';
import { BASE_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    selected?: boolean;
    selectedColor?: string;
    dotColor?: string;
    dots?: Array<{ key: string; color: string; selectedDotColor: string }>;
  };
}

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  // Fetch tasks from API
  const fetchTasks = async (page = 1, itemsPerPage = 10) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.get(`${BASE_URL}v1/tasks/user-tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { page, items_per_page: itemsPerPage },
      });

      if (response.status !== 200) throw new Error('Failed to fetch tasks');

      const fetchedTasks = response.data.message.task_details.data.map((task: any) => ({
        id: task.id,
        time: task.due_date,
        summary: task.title,
        detail: task.description,
        date: new Date(task.due_date),
        color: '#1D1E23',
        completed: task.status === 'Completed',
        status: task.status,
      }));

      const newMarkedDates: MarkedDates = {};
      fetchedTasks.forEach((task: Task) => {
        const dateStr = task.date.toISOString().split('T')[0];
        if (!newMarkedDates[dateStr]) {
          newMarkedDates[dateStr] = { marked: true, dots: [] };
        }
        newMarkedDates[dateStr].dots?.push({
          key: task.id.toString(),
          color: task.status === 'Pending' ? '#3272A0' : '#4CAF50',
          selectedDotColor: '#FFFFFF',
        });
      });

      setMarkedDates(newMarkedDates);
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
  };

  // Add task locally
  const addTask = (newTask: Omit<Task, 'id'>) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#111111]`}>
      <ScrollView contentContainerStyle={tw`flex-1 p-4`}>
        <Header 
          onCalendarPress={() => setIsCalendarVisible(true)} 
          onCreateTaskPress={() => setIsCreateTaskVisible(true)} 
        />
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={tw`mt-10`} />
        ) : (
          <>
            <WeekView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <DaySchedule selectedDate={selectedDate} tasks={tasks} />
          </>
        )}
      </ScrollView>

      {/* Calendar Modal */}
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
              markedDates={markedDates}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Create Task Modal */}
      <CreateTaskModal
        isVisible={isCreateTaskVisible}
        setIsVisible={setIsCreateTaskVisible}
        onClose={() => setIsCreateTaskVisible(false)}
        selectedDate={selectedDate}
        onSave={(newTask) => addTask({ ...newTask, color: '', time: '', date: new Date(), summary: '', detail: '', status: 'Pending' })}
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;