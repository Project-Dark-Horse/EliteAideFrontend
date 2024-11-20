import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Header from './Header';
import WeekView from './WeekViewScreen.tsx';
import DaySchedule from './DayScheduleScreen.tsx';
import CalendarPopup from './CalendarPopup';
import CreateTaskModal from './CreateTaskModal';
import { styles } from './styles';

interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
  completed?: boolean;
}

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (startDate: string, endDate: string) => {
    setLoading(true);
    try {
      const response = await fetch(`v1/tasks/range?start_date=${startDate}&end_date=${endDate}&page=1&item_per_page=10&range_type=day`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.tasks); // Adjust based on your API response structure
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

  useEffect(() => {
    const startDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const endDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    fetchTasks(startDate, endDate);
  }, [selectedDate]);

  const addTask = (newTask: Omit<Task, 'id'> & { color: string; time: string; date: Date; summary: string; detail: string; }) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#111111]`}>
      <View style={tw`flex-1 p-4`}>
        <Header 
          onCalendarPress={() => setIsCalendarVisible(true)} 
          onCreateTaskPress={() => setIsCreateTaskVisible(true)} 
        />
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <WeekView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <DaySchedule selectedDate={selectedDate} tasks={tasks} />
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

      <CreateTaskModal
        isVisible={isCreateTaskVisible}
        setIsVisible={setIsCreateTaskVisible}
        onClose={() => setIsCreateTaskVisible(false)}
        selectedDate={selectedDate}
        onSave={(newTask) => addTask({ ...newTask, color: '', time: '', date: new Date(), summary: '', detail: '' })}
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;