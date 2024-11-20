import React, { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
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
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      time: '8 AM', 
      summary: 'Water Plants',
      detail: 'Remind me to water the Plants',
      date: new Date(), 
      color: '#1D1E23',
      completed: true
    },
    { 
      id: 2, 
      time: '',
      summary: 'Team Meeting', 
      detail: 'Work', 
      date: new Date(), 
      color: '#2196F3',
      completed: true
    },
    { 
      id: 3, 
      time: '12 PM', 
      summary: 'Elite Aide Launch', 
      detail: 'Launch of Elite Aide', 
      date: new Date(), 
      color: '#36AAB9',
      completed: false
    },
  ]);

  // Function to add a new task
  const addTask = (newTask: Omit<Task, 'id'>) => {
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
        <WeekView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <DaySchedule selectedDate={selectedDate} tasks={tasks} />
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
        selectedDate={selectedDate}
        onSave={addTask} // Pass addTask to save new tasks
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;