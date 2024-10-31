import React, { useState, useCallback, useMemo } from 'react';
import { View, Modal, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import { styles } from './styles';

interface CreateTaskModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isVisible, setIsVisible, selectedDate, setTasks }) => {
  const [localTask, setLocalTask] = useState({ summary: '', detail: '', time: '09:00' });

  const handleCreateTask = useCallback(() => {
    if (localTask.summary.trim() === '') {
      Alert.alert('Error', 'Please enter a task summary.');
      return;
    }

    if (!/^\d{2}:\d{2}$/.test(localTask.time)) {
      Alert.alert('Invalid Time Format', 'Please enter the time in HH:MM format.');
      return;
    }

    const newTaskObj = {
      id: Date.now(),
      time: localTask.time,
      summary: localTask.summary,
      detail: localTask.detail,
      date: selectedDate,
      color: getRandomColor(),
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setLocalTask({ summary: '', detail: '', time: '09:00' });
    setIsVisible(false);
  }, [localTask, selectedDate, setTasks, setIsVisible]);

  const getRandomColor = useMemo(() => {
    const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#00BCD4', '#FF9800'];
    return () => colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Summary"
            placeholderTextColor="#86868B"
            value={localTask.summary}
            onChangeText={(text) => setLocalTask((prev) => ({ ...prev, summary: text }))}
            accessibilityLabel="Task Summary Input"
          />
          <TextInput
            style={styles.input}
            placeholder="Task Detail"
            placeholderTextColor="#86868B"
            value={localTask.detail}
            onChangeText={(text) => setLocalTask((prev) => ({ ...prev, detail: text }))}
            accessibilityLabel="Task Detail Input"
          />
          <TextInput
            style={styles.input}
            placeholder="Time (HH:MM)"
            placeholderTextColor="#86868B"
            value={localTask.time}
            onChangeText={(text) => setLocalTask((prev) => ({ ...prev, time: text }))}
            accessibilityLabel="Task Time Input"
            keyboardType="numeric"
          />
          <Button
            mode="contained"
            onPress={handleCreateTask}
            style={tw`bg-[#0A84FF] mt-4`}
            labelStyle={tw`text-sm text-white`}
          >
            Add Task
          </Button>
          <Button
            mode="text"
            onPress={() => setIsVisible(false)}
            style={tw`mt-2`}
            labelStyle={tw`text-sm text-white`}
          >
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(CreateTaskModal);