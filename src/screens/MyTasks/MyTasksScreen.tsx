import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '@env';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

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
  const todayTasks: Task[] = [
    {
      id: 1,
      title: "Team Meeting",
      description: "Group discussion for the n...",
      time: "8-9 AM",
      icon: "briefcase",
      color: "#1D1E23",
      cardStyle: { borderLeftWidth: 4, borderLeftColor: "#007AFF" }
    },
    {
      id: 2,
      title: "Team Meeting",
      description: "Group discussion for the new product",
      time: "Fri, 9-10 AM",
      icon: "briefcase",
      color: "#1D1E23",
//       middleContainerStyle: { backgroundColor: 'rgba(0, 122, 255, 0.1)' }
    },
    {
      id: 3,
      title: "Team Meeting",
      description: "Group discussion for the new product",
      time: "Fri, 9-10 AM\nFri, 9-10 AM",
      icon: "briefcase",
      color: "#1D1E23",
//       rightContainerStyle: { backgroundColor: 'rgba(0, 122, 255, 0.2)' }
    },
  ];

  const thisWeekTasks: Task[] = [
    {
      id: 4,
      title: "Team Meeting",
      description: "Group discussion for the new product",
      time: "Fri, 9-10 AM",
      icon: "briefcase",
      color: "#5856D6",
      cardStyle: { borderRadius: 20 }
    },
    {
      id: 5,
      title: "Team Meeting",
      description: "Group discussion for the new product",
      time: "Fri, 9-10 AM",
      icon: "briefcase",
      color: "#34C759",
      leftContainerStyle: { borderRightWidth: 1, borderRightColor: '#34C759' }
    },

  ];

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
          <Text style={styles.sectionHeader}>Today</Text>
          <View style={styles.todayContainer}>
            {todayTasks.map(renderTask)}
          </View>
          <Text style={styles.sectionHeader}>This Week</Text>
          <View style={styles.thisWeekContainer}>
            {thisWeekTasks.map(renderTask)}
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