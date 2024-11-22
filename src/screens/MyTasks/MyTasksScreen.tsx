import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '@env';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
  cardStyle?: ViewStyle;
  leftContainerStyle?: ViewStyle;
  middleContainerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
}

type MyTasksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyTasksScreen'>;

interface Props {
  navigation: MyTasksScreenNavigationProp;
}

const MyTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`${BASE_URL}v1/tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data?.message?.task_details?.data?.length > 0) {
          const fetchedTasks = response.data.message.task_details.data.map((task: any) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            time: new Date(task.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            icon: 'briefcase', // Adjust based on task type if needed
            color: '#1D1E23', // Adjust based on task type if needed
          }));
          setTasks(fetchedTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const renderTask = (task: Task) => (
    <View key={task.id} style={[styles.taskCard, task.cardStyle]}>
      <View style={[styles.leftContainer, task.leftContainerStyle]}>
        <View style={styles.iconContainer}>
          <Icon name={task.icon} size={20} color="#FFFFFF" />
        </View>
      </View>
      <View style={[styles.middleContainer, task.middleContainerStyle]}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>
      <View style={[styles.rightContainer, task.rightContainerStyle]}>
        <View style={styles.taskControls}>
          <Icon name="notifications-outline" size={18} color="#FFFFFF" style={styles.notificationIcon} />
          <Icon name="ellipse" size={16} color="#4CD964" />
        </View>
        <Text style={styles.time}>{task.time}</Text>
      </View>
    </View>
  );

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.sectionHeader}>All Tasks</Text>
          <View style={styles.todayContainer}>
            {tasks.map(renderTask)}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 20,
    color: '#7A7A7A',
    marginBottom: 16,
    marginTop: 8,
  },
  taskCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#1D1E23',
  },
  leftContainer: {
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  taskControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  time: {
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 4,
  },
  notificationIcon: {
    opacity: 0.7,
  },
  todayContainer: {
    marginBottom: 24,
  },
  thisWeekContainer: {
    marginBottom: 24,
  },
});

export default MyTaskScreen;