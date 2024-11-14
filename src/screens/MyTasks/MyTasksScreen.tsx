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

type MyTasksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyTasks'>;

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
      <View key={task.id} style={[styles.taskCard, { backgroundColor: task.color + '20' }, task.cardStyle]}>
        <View style={[styles.leftContainer, task.leftContainerStyle]}>
          <View style={[styles.container, { backgroundColor: task.color }]}>
            <Icon name={task.icon} size={20} color="#FFFFFF" />
          </View>
        </View>
        <View style={[styles.middleContainer, task.middleContainerStyle]}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
        <View style={[styles.rightContainer, task.rightContainerStyle]}>
          <Text style={styles.time}>{task.time}</Text>
          <Icon name="checkmark-circle" size={24} color={task.color} style={styles.checkIcon} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  todayContainer: {
    backgroundColor: '#1D1E23',
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
  },
  thisWeekContainer: {
    backgroundColor: '#1D1E23',
    borderRadius: 12,
    padding: 8,
  },
  taskCard: {
      flexDirection: 'row',
      borderRadius: 8,
      marginBottom: 8,
      overflow: 'hidden',
    },
    leftContainer: {
      padding: 13,
      justifyContent: 'center',
    },
    middleContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 12,
    },
    rightContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 12,
    },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 12,
    color: '#7A7A7A',
  },
  time: {
    fontSize: 12,
    color: '#7A7A7A',
    textAlign: 'right',
  },
  checkIcon: {
    marginTop: 4,
  },
});

export default MyTaskScreen;