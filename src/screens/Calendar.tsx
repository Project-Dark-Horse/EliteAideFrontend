import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

interface Task {
  id: number;
  time: string;
  summary: string;
  detail: string;
  date: Date;
  color: string;
}

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, time: '08:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#4CAF50' },
    { id: 2, time: '09:50', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#2196F3' },
    { id: 3, time: '10:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#9C27B0' },
    { id: 4, time: '11:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#00BCD4' },
    { id: 5, time: '13:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#FF9800' },
  ]);

  const Header: React.FC = () => (
    <View style={tw`flex-row justify-between items-center mb-4`}>
      <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
        <Text style={tw`text-lg text-white font-bold`}>Today ▼</Text>
      </TouchableOpacity>
      <Button
        mode="contained"
        onPress={() => {}}
        style={tw`bg-[#1D1E23] rounded-full px-4 py-1`}
        labelStyle={tw`text-sm text-white`}
      >
        Create task
      </Button>
    </View>
  );

  const WeekView: React.FC<{ selectedDate: Date; onSelectDate: (date: Date) => void }> = ({ selectedDate, onSelectDate }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const dates = useMemo(() => {
      const startDate = new Date(selectedDate);
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
      });
    }, [selectedDate]);

    useEffect(() => {
      if (scrollViewRef.current) {
        const index = dates.findIndex(date => date.toDateString() === selectedDate.toDateString());
        scrollViewRef.current.scrollTo({ x: 58 * index, animated: true });
      }
    }, [selectedDate, dates]);

    return (
      <View style={tw`py-4`}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-2`}
        >
          {dates.map((date, index) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onSelectDate(date)}
                style={[
                  tw`items-center justify-center w-14 h-20 mx-1`,
                  isSelected ? tw`bg-[#1D1E23] rounded-3xl border border-[#0A84FF]` : tw``
                ]}
              >
                <Text style={tw`text-[#86868B] text-xs ${isSelected ? 'text-white' : ''}`}>
                  {daysOfWeek[date.getDay() - 1]}
                </Text>
                <Text style={tw`text-white text-lg font-bold mt-1`}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <View style={[tw`flex-row items-center mb-4 rounded-lg p-3`, { backgroundColor: task.color }]}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-white font-bold`}>{task.summary}</Text>
        <Text style={tw`text-white text-xs`}>{task.detail}</Text>
      </View>
      <Text style={tw`text-white text-xs`}>{task.time} - {parseInt(task.time) + 1}:00</Text>
      <Icon name="more-vertical" size={20} color="white" style={tw`ml-2`} />
    </View>
  );

  const DaySchedule: React.FC<{ selectedDate: Date; tasks: Task[] }> = ({ selectedDate, tasks }) => {
    const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    const filteredTasks = tasks.filter(
      task => task.date.toDateString() === selectedDate.toDateString()
    );

    return (
      <ScrollView style={tw`flex-grow`}>
        {timeSlots.map((time, index) => (
          <View key={index} style={tw`flex-row py-2`}>
            <Text style={tw`text-gray-500 w-12 text-right mr-4`}>{time}</Text>
            <View style={tw`flex-1 border-l border-gray-700 pl-4`}>
              {filteredTasks
                .filter(task => task.time === time)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#111111]`}>
      <View style={tw`flex-1 p-4`}>
        <Header />
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
            {/* Calendar Popup code can be included here */}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});

export default CalendarScreen;