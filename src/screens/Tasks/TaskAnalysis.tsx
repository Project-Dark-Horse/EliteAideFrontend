import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { Path, G, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import notificationService from '../../utils/notificationService';

interface TaskCardProps {
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
  iconName: string;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
}

const TaskAnalysis = () => {
  const navigation = useNavigation();

  const pieData = [
    { value: 12, color: '#4e54c8', key: 'todo' },
    { value: 5, color: '#48dbfb', key: 'progress' },
    { value: 3, color: '#0abde3', key: 'done' },
  ];

  const total = pieData.reduce((sum, data) => sum + data.value, 0);

  const PieChart = () => {
    let startAngle = 0;
    return (
      <Svg height="150" width="150" viewBox="0 0 180 180">
        <G transform="translate(90 90)">
          {pieData.map((item, index) => {
            const angle = (item.value / total) * 360;
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

  const TaskCard: React.FC<TaskCardProps> = ({ title, description, time, backgroundColor, iconName }) => (
  <View style={[styles.taskCard, { backgroundColor }]}>
    <View style={styles.taskIconContainer}>
      <Icon name={iconName} size={20} color="#fff" />
    </View>
    <Text style={styles.taskTitle}>{title}</Text>
    <Text style={styles.taskDescription}>{description}</Text>
    <View style={styles.taskTimeContainer}>
      <Icon name="time-outline" size={14} color="#fff" />
      <Text style={styles.taskTime}>{time}</Text>
    </View>
  </View>
);

  const scheduleTaskReminder = async (task: Task) => {
    const reminderDate = new Date(task.dueDate);
    reminderDate.setHours(reminderDate.getHours() - 1); // Remind 1 hour before

    try {
      await notificationService.createDueDateNotification(
        task.id,
        `Don't forget: ${task.title} is due in 1 hour!`
      );
    } catch (error) {
      console.error('Failed to schedule task reminder:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress Overview</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chartContainer}>
          <PieChart />
          <View style={styles.chartCenter}>
            <Text style={styles.chartCenterText}>5/20</Text>
            <Text style={styles.chartCenterSubtext}>tasks completed</Text>
          </View>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4e54c8' }]} />
            <Text style={styles.legendText}>To-do 12</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#48dbfb' }]} />
            <Text style={styles.legendText}>Progress 5</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#0abde3' }]} />
            <Text style={styles.legendText}>Done 3</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>To-do Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskCardContainer}>
            <TaskCard
              title="Team Meeting"
              description="Group discussion for the new product"
              time="10 AM"
              backgroundColor="#4e54c8"
              iconName="people-outline"
            />
            <TaskCard
              title="Team Meeting"
              description="Group discussion for the new product"
              time="10 AM"
              backgroundColor="#4e54c8"
              iconName="people-outline"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>In-Progress Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskCardContainer}>
            <TaskCard
              title="Project Review"
              description="Review project milestones"
              time="2 PM"
              backgroundColor="#48dbfb"
              iconName="document-text-outline"
            />
            <TaskCard
              title="Project Review"
              description="Review project milestones"
              time="2 PM"
              backgroundColor="#48dbfb"
              iconName="document-text-outline"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskCardContainer}>
            <TaskCard
              title="Code Review"
              description="Review pull requests"
              time="11 AM"
              backgroundColor="#0abde3"
              iconName="code-slash-outline"
            />
            <TaskCard
              title="Code Review"
              description="Review pull requests"
              time="11 AM"
              backgroundColor="#0abde3"
              iconName="code-slash-outline"
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  content: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCenterText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartCenterSubtext: {
    color: '#fff',
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#48dbfb',
    fontSize: 12,
  },
  taskCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  taskCard: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 8,
  },
  taskTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTime: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#48dbfb',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskAnalysis;