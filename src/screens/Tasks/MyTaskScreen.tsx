import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonHeader from '../../components/CommonHeader';
import { format, isToday, isThisWeek } from 'date-fns';
import DeleteTaskPopup from './DeleteTaskPopup';

interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
  status: 'pending' | 'completed';
}

const MyTaskScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [page, itemsPerPage]);

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      // Get current date and time
      const now = new Date();
      
      // Set end date to 12 days from now (matching PinnedTasks)
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 12);

      const startDate = now.toISOString().split('T')[0];
      const endDate = nextWeek.toISOString().split('T')[0];

      const response = await axios.get(`${BASE_URL}v1/tasks/range`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          start_date: startDate,
          end_date: endDate,
          page,
          items_per_page: itemsPerPage,
        },
      });

      const fetchedTasks = response.data.message.task_details.data
        .filter(task => {
          const taskDateTime = new Date(task.due_date);
          return taskDateTime > now;
        })
        .map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          time: task.due_date,
          icon: 'briefcase',
          color: '#1D1E23',
          status: task.status,
        }));

      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Unable to fetch tasks');
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTaskId === null) return;

    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      await axios.delete(`${BASE_URL}v1/tasks/${selectedTaskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTaskId));
      setIsDeletePopupVisible(false);
      Alert.alert('Success', 'Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Unable to delete task');
    }
  };

  const renderTask = (task: Task) => {
    const formattedTime = format(new Date(task.time), 'PPpp');

    return (
      <View key={task.id} style={[styles.taskCard, { backgroundColor: task.color }]}>
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: '#2D2D2D' }]}>
            <Icon name={task.icon} size={20} color="#65779E" />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description} numberOfLines={1}>{task.description}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => {
            setSelectedTaskId(task.id);
            setIsDeletePopupVisible(true);
          }}>
            <Icon name="trash" size={24} color="#FF3B30" style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const todayTasks = tasks.filter(task => isToday(new Date(task.time)));
  const thisWeekTasks = tasks.filter(task => isThisWeek(new Date(task.time), { weekStartsOn: 1 }));
  const afterThisWeekTasks = tasks.filter(task => !isToday(new Date(task.time)) && !isThisWeek(new Date(task.time), { weekStartsOn: 1 }));

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="My Tasks" showTitle={true} showNotificationIcon={true} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionHeader}>Today</Text>
        <View style={styles.taskList}>
          {todayTasks.map(renderTask)}
        </View>
        <Text style={styles.sectionHeader}>This Week</Text>
        <View style={styles.taskList}>
          {thisWeekTasks.map(renderTask)}
        </View>
        <Text style={styles.sectionHeader}>After This Week</Text>
        <View style={styles.taskList}>
          {afterThisWeekTasks.map(renderTask)}
        </View>
      </ScrollView>
      <DeleteTaskPopup
        visible={isDeletePopupVisible}
        onClose={() => setIsDeletePopupVisible(false)}
        onDelete={handleDeleteTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 16,
    paddingBottom: 70,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'light',
    color: '#7A7A7A',
    marginBottom: 12,
  },
  taskList: {
    marginBottom: 16,
  },
  taskCard: {
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 9,
    padding: 16,
    backgroundColor: '#1D1E23',
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 8,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 12,
    color: '#7A7A7A',
  },
  time: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'left',
    marginTop: 4,
  },
  deleteIcon: {
    marginTop: 4,
  },
});

export default MyTaskScreen;
