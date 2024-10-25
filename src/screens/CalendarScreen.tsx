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
    { id: 2, time: '09:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#2196F3' },
    { id: 3, time: '10:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#9C27B0' },
    { id: 4, time: '11:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#00BCD4' },
    { id: 5, time: '13:00', summary: 'Team Meeting', detail: 'Group discussion for the new product', date: new Date(), color: '#FF9800' },
  ]);

  const Header: React.FC = () => (
    <View style={tw`flex-row justify-between items-center mb-4 py-4`}>
      <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
        <Text style={tw`text-xl text-white font-bold`}>Today ▼</Text>
      </TouchableOpacity>
      <Button
        mode="contained"
        onPress={() => {}}
        style={tw`bg-[#1D1E23]`}
        labelStyle={tw`text-sm text-white`}
      >
        Create task
      </Button>
    </View>
  );

  const WeekView: React.FC<{ selectedDate: Date; onSelectDate: (date: Date) => void }> = ({ selectedDate, onSelectDate }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const dates = useMemo(() => {
      const startDate = new Date(selectedDate);
      startDate.setDate(startDate.getDate() - 15);
      return Array.from({ length: 31 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return date;
      });
    }, []);

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
                style={tw`items-center justify-center w-14 h-20 mx-1 ${isSelected ? 'bg-[#0A84FF] rounded-3xl' : ''}`}
              >
                <Text style={tw`text-[#86868B] text-xs ${isSelected ? 'text-white' : ''}`}>
                  {daysOfWeek[date.getDay()]}
                </Text>
                <Text style={tw`text-white text-xl font-bold mt-1`}>
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
    <View style={tw`flex-row items-center mb-4 bg-[${task.color}] rounded-lg p-3`}>
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

  const CalendarPopup: React.FC = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

    const renderDays = () => {
      const days = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        const isSelected = i === selectedDate.getDate();
        days.push(
          <TouchableOpacity
            key={i}
            style={[styles.dayCell, isSelected && styles.selectedDay]}
            onPress={() => {
              setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
              setIsCalendarVisible(false);
            }}
          >
            <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{i}</Text>
          </TouchableOpacity>
        );
      }
      return days;
    };

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
            <Icon name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.monthYearText}>{`${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</Text>
          <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
            <Icon name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.weekDaysContainer}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {renderDays()}
        </View>
      </View>
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
            <CalendarPopup />
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
  calendarContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthYearText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#0A84FF',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CalendarScreen;