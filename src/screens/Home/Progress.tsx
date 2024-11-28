import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: string;
  due_date: string;
  type: string;
  created_at: string;
  updated_at: string;
  creator: number;
}

interface TaskCardProps {
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
}

type NavigationProp = NativeStackNavigationProp<any>;

const TaskAnalysis = () => {
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statistics, setStatistics] = React.useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    overdue: 0
  });

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          console.log('🔴 No access token found');
          setLoading(false);
          return;
        }

        console.log('🟢 Token found:', token);
        console.log('📡 Fetching tasks...');

        const response = await fetch('https://api.eliteaide.tech/v1/tasks/user-tasks?page=1&items_per_page=200', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
          console.log('❌ Error response:', response.statusText);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('📦 API Response Data:', JSON.stringify(data, null, 2));

        if (data.message && data.message.task_details && data.message.task_details.data) {
          console.log('✅ Tasks loaded successfully');
          console.log('📊 Number of tasks:', data.message.task_details.data.length);
          setTasks(data.message.task_details.data);
        } else {
          console.log('⚠️ Unexpected response structure:', data);
        }
      } catch (error) {
        console.log('🔴 Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  React.useEffect(() => {
    const now = new Date();
    const stats = tasks.reduce((acc, task) => {
      // Count by status (matching API values)
      if (task.status === 'Completed') acc.completed++;
      else if (task.status === 'In Progress') acc.inProgress++;
      else if (task.status === 'Pending') acc.todo++;

      // Count by priority (API uses 1-3)
      if (task.priority === 3) acc.highPriority++;
      else if (task.priority === 2) acc.mediumPriority++;
      else if (task.priority === 1) acc.lowPriority++;

      // Check if overdue (only for non-completed tasks)
      const dueDate = new Date(task.due_date);
      if (dueDate < now && task.status !== 'Completed') {
        acc.overdue++;
      }

      return acc;
    }, {
      total: tasks.length,
      completed: 0,
      inProgress: 0,
      todo: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0,
      overdue: 0
    });

    setStatistics(stats);
  }, [tasks]);

  const pieData = [
    { 
      value: tasks.filter((task) => task.status === 'Pending').length, 
      color: '#4e54c8', 
      key: 'pending' 
    },
    { 
      value: tasks.filter((task) => task.status === 'In Progress').length, 
      color: '#48dbfb', 
      key: 'in progress' 
    },
    { 
      value: tasks.filter((task) => task.status === 'Completed').length, 
      color: '#0abde3', 
      key: 'completed' 
    },
  ];

  const total = pieData.reduce((sum, data) => sum + data.value, 0);

  const CustomPieChart = () => {
    let startAngle = 0;
    return (
      <Svg height="150" width="150" viewBox="0 0 180 180">
        <G transform="translate(90 90)">
          {pieData.map((item, index) => {
            const angle = total > 0 ? (item.value / total) * 360 : 0;
            const largeArcFlag = angle > 180 ? 1 : 0;
            const endAngle = startAngle + angle;
            const x1 = Math.cos((startAngle * Math.PI) / 180) * 80;
            const y1 = Math.sin((startAngle * Math.PI) / 180) * 80;
            const x2 = Math.cos((endAngle * Math.PI) / 180) * 80;
            const y2 = Math.sin((endAngle * Math.PI) / 180) * 80;
            const path = `M ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} L 0 0`;
            startAngle += angle;
            return <Path key={index} d={path} fill={item.color} />;
          })}
          <Circle r="60" fill="#1e1e1e" />
        </G>
      </Svg>
    );
  };

  const TaskCard = ({ title, description, time, backgroundColor }: TaskCardProps) => (
    <View style={[styles.taskCard, { backgroundColor }]}>
      <View style={styles.taskCardContent}>
        <View style={styles.taskIconContainer}>
          <Icon name="briefcase-outline" size={20} color="#fff" />
        </View>
        <View style={styles.taskTextContainer}>
          <Text style={styles.taskTitle}>{title}</Text>
          <Text style={styles.taskDescription}>{description}</Text>
        </View>
      </View>
      <View style={styles.taskTimeContainer}>
        <Text style={styles.taskTime}>{time}</Text>
        <View style={styles.taskControls}>
          <Icon name="notifications" size={24} color="#fff" style={styles.taskIcon} />
          <Icon name="ellipse" size={16} color="#4CD964" />
        </View>
      </View>
    </View>
  );

  const renderStatistics = () => (
    <View style={styles.statisticsContainer}>
      <Text style={styles.statisticsTitle}>Task Overview</Text>
      
      {/* Status Overview with data validation */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.total || 0}</Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.todo || 0}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.inProgress || 0}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.completed || 0}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Priority Breakdown with minimum width for segments */}
      <View style={styles.priorityContainer}>
        <Text style={styles.sectionTitle}>Priority Breakdown</Text>
        <View style={styles.priorityBar}>
          {statistics.highPriority > 0 && (
            <View 
              style={[
                styles.prioritySegment, 
                { 
                  flex: statistics.highPriority, 
                  backgroundColor: '#ff4757',
                  minWidth: 20 
                }
              ]} 
            />
          )}
          {statistics.mediumPriority > 0 && (
            <View 
              style={[
                styles.prioritySegment, 
                { 
                  flex: statistics.mediumPriority, 
                  backgroundColor: '#ffa502',
                  minWidth: 20 
                }
              ]} 
            />
          )}
          {statistics.lowPriority > 0 && (
            <View 
              style={[
                styles.prioritySegment, 
                { 
                  flex: statistics.lowPriority, 
                  backgroundColor: '#2ed573',
                  minWidth: 20 
                }
              ]} 
            />
          )}
        </View>
        <View style={styles.priorityLegend}>
          <Text style={styles.priorityLegendItem}>🔴 High Priority: {statistics.highPriority || 0}</Text>
          <Text style={styles.priorityLegendItem}>🟡 Medium: {statistics.mediumPriority || 0}</Text>
          <Text style={styles.priorityLegendItem}>🟢 Low: {statistics.lowPriority || 0}</Text>
        </View>
      </View>

      {/* Overdue Tasks with validation */}
      <View style={styles.overdueContainer}>
        <Text style={styles.sectionTitle}>Overdue Tasks</Text>
        <View style={styles.overdueBox}>
          <Icon name="warning" size={24} color="#ff4757" />
          <Text style={styles.overdueNumber}>{statistics.overdue || 0}</Text>
          <Text style={styles.overdueLabel}>
            {statistics.overdue === 1 ? 'Task Overdue' : 'Tasks Overdue'}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress Overview</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Icon name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chartContainer}>
          <CustomPieChart />
          <View style={styles.chartCenter}>
            <Text style={styles.chartCenterText}>{`${pieData[2].value}/${total}`}</Text>
            <Text style={styles.chartCenterSubtext}>tasks completed</Text>
          </View>
        </View>

        <View style={styles.legend}>
          {pieData.map((item) => (
            <View key={item.key} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{`${item.key.charAt(0).toUpperCase() + item.key.slice(1)} ${item.value}`}</Text>
            </View>
          ))}
        </View>

        {renderStatistics()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111', // Dark background for modern aesthetic
  },
  content: {
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111111', // Subtle dark header background
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCenterText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  chartCenterSubtext: {
    color: '#b0b0b0', // Subtle text color for subtext
    fontSize: 14,
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  taskCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#1f1f1f',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  taskCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#b0b0b0', // Softer text color for descriptions
    fontSize: 14,
  },
  taskTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  taskTime: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  taskControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    marginRight: 12,
  },
  statisticsContainer: {
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    margin: 16,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#363636',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  priorityContainer: {
    marginBottom: 24,
  },
  priorityBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#363636',
    marginBottom: 12,
  },
  prioritySegment: {
    height: '100%',
  },
  priorityLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityLegendItem: {
    color: '#fff',
    fontSize: 14,
  },
  overdueBox: {
    backgroundColor: '#363636',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  overdueNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff4757',
    marginVertical: 8,
  },
  overdueLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  overdueContainer: {
    marginTop: 16,
  },
});

export default React.memo(TaskAnalysis);