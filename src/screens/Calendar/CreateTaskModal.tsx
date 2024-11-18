import React, { useState, useCallback } from 'react';
import { View, Modal, TouchableOpacity, TextInput, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Task } from '../../types/Task';

interface CreateTaskModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  selectedDate: Date;
  onSave: (newTask: Omit<Task, 'id'>) => void;
}

const CATEGORIES = [
  { id: 'work', label: 'Work', color: '#FF6B6B', icon: 'briefcase' },
  { id: 'personal', label: 'Personal', color: '#4ECDC4', icon: 'person' },
  // Add other categories as needed
];

const PRIORITIES = [
  { id: 'high', label: 'High', color: '#FF6B6B' },
  { id: 'medium', label: 'Medium', color: '#FFD93D' },
  { id: 'low', label: 'Low', color: '#6BCB77' },
];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isVisible, setIsVisible, selectedDate, onSave }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    time: new Date(),
    reminder: false
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleClose = useCallback(() => {
    setTaskData({
      title: '',
      description: '',
      category: '',
      priority: '',
      time: new Date(),
      reminder: false
    });
    setIsVisible(false);
  }, [setIsVisible]);

  const handleCreateTask = useCallback(() => {
    if (!taskData.title.trim()) {
      // Show error toast or alert
      return;
    }

    const newTask = {
      id: Date.now(),
      summary: taskData.title,
      detail: taskData.description,
      category: taskData.category,
      priority: taskData.priority,
      time: formatTime(taskData.time),
      date: selectedDate,
      reminder: taskData.reminder,
      completed: false,
      color: CATEGORIES.find((cat: { id: string }) => cat.id === taskData.category)?.color || '#666'
    };

    onSave(newTask);
    handleClose();
  }, [taskData, selectedDate, onSave]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Create New Task</Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color="#F8F8F8" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              <View style={styles.inputContainer}>
                <Ionicons name="pencil" size={20} color="#979797" />
                <TextInput
                  style={styles.input}
                  placeholder="Task Title"
                  placeholderTextColor="#979797"
                  value={taskData.title}
                  onChangeText={text => setTaskData(prev => ({ ...prev, title: text }))}
                />
              </View>

              <View style={[styles.inputContainer, { height: 100, alignItems: 'flex-start' }]}>
                <Ionicons name="document-text" size={20} color="#666" style={{ marginTop: 12 }} />
                <TextInput
                  style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                  placeholder="Description"
                  placeholderTextColor="#666"
                  multiline
                  value={taskData.description}
                  onChangeText={text => setTaskData(prev => ({ ...prev, description: text }))}
                />
              </View>

              <Text style={styles.sectionTitle}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoriesContainer}>
                  {CATEGORIES.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryButton,
                        taskData.category === category.id && styles.selectedCategory,
                        { backgroundColor: category.color + '20' }
                      ]}
                      onPress={() => setTaskData(prev => ({ ...prev, category: category.id }))}
                    >
                      <Ionicons 
                        name={category.icon} 
                        size={20} 
                        color={category.color} 
                      />
                      <Text style={[
                        styles.categoryText,
                        { color: category.color }
                      ]}>
                        {category.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <Text style={styles.sectionTitle}>Priority</Text>
              <View style={styles.priorityContainer}>
                {PRIORITIES.map(priority => (
                  <TouchableOpacity
                    key={priority.id}
                    style={[
                      styles.priorityButton,
                      taskData.priority === priority.id && styles.selectedPriority,
                      { borderColor: priority.color }
                    ]}
                    onPress={() => setTaskData(prev => ({ ...prev, priority: priority.id }))}
                  >
                    <Text style={[
                      styles.priorityText,
                      { color: priority.color }
                    ]}>
                      {priority.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time" size={20} color="#979797" />
                <Text style={styles.timeText}>
                  {formatTime(taskData.time)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reminderButton}
                onPress={() => setTaskData(prev => ({ ...prev, reminder: !prev.reminder }))}
              >
                <View style={styles.reminderLeft}>
                  <Ionicons name="notifications" size={20} color="#979797" />
                  <Text style={styles.reminderText}>Reminder</Text>
                </View>
                <View style={[
                  styles.toggleButton,
                  taskData.reminder && styles.toggleActive
                ]}>
                  <View style={[
                    styles.toggleCircle,
                    taskData.reminder && styles.toggleCircleActive
                  ]} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateTask}
              >
                <Text style={styles.createButtonText}>Create Task</Text>
              </TouchableOpacity>
            </ScrollView>

            {showTimePicker && (
              <DateTimePicker
                value={taskData.time}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={(event, selectedDate) => {
                  setShowTimePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    setTaskData(prev => ({ ...prev, time: selectedDate }));
                  }
                }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default React.memo(CreateTaskModal);