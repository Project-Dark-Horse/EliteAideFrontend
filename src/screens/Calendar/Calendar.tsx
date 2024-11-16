import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Header from './Header';
import WeekView from './WeekViewScreen';
import DaySchedule from './DayScheduleScreen';
import CalendarPopup from './CalendarPopup';
import CreateTaskModal from '../Ai/ManualTaskCreate';
import { styles } from './styles';
import { Task } from '../../types/Task'; // Adjust the path as necessary

interface CreateTaskModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  selectedDate: Date;
  onSave: (newTask: Omit<Task, "id">) => void;
}
const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      time: '8 AM', 
      summary: 'Team Meeting', 
      detail: 'Group discussion for the new product', 
      date: new Date(), 
      color: '#1D1E23',
      completed: true,
      category: 'Work',
      priority: 'High',
      reminder: true
    },
    { 
      id: 2, 
      time: '9 AM', 
      summary: 'Team Meeting', 
      detail: 'Group discussion for the new product', 
      date: new Date(), 
      color: '#2196F3',
      completed: true,
      category: 'Work',
      priority: 'Medium',
      reminder: true
    },
    { 
      id: 3, 
      time: '9 AM', 
      summary: 'Team Meeting', 
      detail: 'Group discussion for the new product', 
      date: new Date(), 
      color: '#36AAB9',
      completed: false,
      category: 'Work',
      priority: 'Low',
      reminder: true
    },
    { 
      id: 4, 
      time: '11 AM', 
      summary: 'Team Meeting', 
      detail: 'Group discussion for the new product', 
      date: new Date(), 
      color: '#5560C4',
      completed: false,
      category: 'Work',
      priority: 'High',
      reminder: true
    },
    { 
      id: 5, 
      time: '1 PM', 
      summary: 'Team Meeting', 
      detail: 'Group discussion for the new product', 
      date: new Date(), 
      color: '#B29361',
      completed: false,
      category: 'Work',
      priority: 'Medium',
      reminder: true
    }
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