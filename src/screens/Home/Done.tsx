import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '@env';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
  type: string;
}

const CompletedTaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    fetchCompletedTasks();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCompletedTasks().finally(() => setRefreshing(false));
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${BASE_URL}v1/tasks/user-tasks?page=1&items_per_page=200`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch tasks');

      const data = await response.json();
      if (data.message?.task_details?.data) {
        const completedTasks = data.message.task_details.data.filter(
          (task: Task) => task.status === 'Completed'
        );
        setTasks(completedTasks);
      }
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load completed tasks',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Completed Tasks</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={onRefresh}
        >
          <Ionicons 
            name="refresh-outline" 
            size={24} 
            color="#FFFFFF"
            style={[
              styles.refreshIcon,
              refreshing && styles.rotating
            ]} 
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#4956C7" />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4956C7"
              colors={['#4956C7']}
            />
          }
        >
          {/* ... rest of your JSX ... */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  refreshButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    opacity: 0.9,
  },
  rotating: {
    transform: [{ rotate: '360deg' }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubText: {
    color: '#979797',
    fontSize: 14,
    marginTop: 8,
  },
  taskCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  priorityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginRight: 24,
  },
  taskDescription: {
    color: '#979797',
    fontSize: 14,
    marginBottom: 16,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#979797',
    fontSize: 14,
    marginLeft: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 213, 115, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  completedText: {
    color: '#2ed573',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subText: {
    color: '#979797',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default CompletedTaskScreen;