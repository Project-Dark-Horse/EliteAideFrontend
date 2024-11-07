import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

interface TaskSummaryProps {
  title: string;
  description: string;
  dueDate: string;
}

const TaskSummary = ({title, description, dueDate}: TaskSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconIonicons name="document-text-outline" size={24} color="#fff" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.dueDate}>Due date: {dueDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  dueDate: {
    color: '#8E8E93',
    fontSize: 12,
  },
});

export default TaskSummary;