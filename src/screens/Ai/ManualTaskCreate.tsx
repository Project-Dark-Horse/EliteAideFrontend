import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { getAccessToken } from '../../utils/auth';
import { BASE_URL } from '@env';
import api from '../../types/api';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Category {
  id: string;
  icon: string;
  label: string;
  color?: string;
}

interface TaskResponse {
  message: {
    message: string;
  };
}

interface TaskPayload {
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  type: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  type: string;
}

interface CreateTaskModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  selectedDate: Date;
  onSave: (newTask: Omit<Task, "id">) => void;
}

const CATEGORIES: Category[] = [
  { id: 'personal', icon: '👤', label: 'Personal', color: '#FF9F0A' },
  { id: 'work', icon: '💼', label: 'Work', color: '#32ADE6' },
  { id: 'health', icon: '❤️', label: 'Health', color: '#FF453A' },
  { id: 'finance', icon: '💰', label: 'Finance', color: '#32D74B' },
  { id: 'travel', icon: '✈️', label: 'Travel', color: '#BF5AF2' },
  { id: 'shopping', icon: '🛒', label: 'Shopping', color: '#FF9F0A' },
];

const PRIORITIES = [
  { id: 'High', color: '#FF453A', icon: '🔴' },
  { id: 'Medium', color: '#FF9F0A', icon: '🟠' },
  { id: 'Low', color: '#32ADE6', icon: '🔵' },
];

const priorityMap: Record<string, string> = {
  'High': 'high',
  'Medium': 'medium',
  'Low': 'low',
};

const BOTTOM_TAB_HEIGHT = Platform.OS === 'ios' ? 85 : 65; // Height including safe area
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type RootStackParamList = {
  Login: undefined;
  // ... other screens
};

const ManualTaskCreate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priority, setPriority] = useState('High');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const createTask = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const dueDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );

      const payload: TaskPayload = {
        title,
        description,
        priority: priorityMap[priority],
        status: 'Pending',
        due_date: dueDateTime.toISOString(),
        type: selectedCategory || 'Personal',
      };

      const response = await api.post<TaskResponse>('v1/tasks/', payload);

      if (response.data.message.message === 'Task created successfully') {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error creating task:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Failed to create task. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Task</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Due Date</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateText}>{formatDate(date)}</Text>
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Time</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.dateText}>{formatTime(time)}</Text>
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter task description"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.id && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={styles.categoryLabel}>{category.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.priorityRow}>
                <Text style={styles.label}>Priority level:</Text>
                <View style={styles.prioritySelector}>
                  <Text style={[styles.priorityText, { color: PRIORITIES.find(p => p.id === priority)?.color }]}>
                    {priority}
                  </Text>
                  <Text style={styles.priorityDot}>
                    {PRIORITIES.find(p => p.id === priority)?.icon}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.autoCompleteRow}>
                <Text style={styles.label}>Autocomplete task:</Text>
                <Switch
                  value={autoComplete}
                  onValueChange={setAutoComplete}
                  trackColor={{ false: '#1E2746', true: '#36AAB9' }}
                  thumbColor={autoComplete ? '#fff' : '#666'}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.saveButton, !title ? styles.saveButtonDisabled : {}]}
            onPress={createTask}
            disabled={!title || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save & Proceed</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) setTime(selectedDate);
          }}
        />
      )}
    </SafeAreaView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#1E2746',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    marginLeft: 8,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: BOTTOM_TAB_HEIGHT + 80, // Add extra padding for bottom tab
  },
  form: {
    padding: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: BOTTOM_TAB_HEIGHT, // Position above bottom tab
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#1E2746',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#36AAB9',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#36AAB9',
    paddingVertical: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  categoryButton: {
    backgroundColor: '#1E2746',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    width: '31%',
    marginBottom: 8,
  },
  selectedCategory: {
    borderWidth: 1,
    borderColor: '#36AAB9',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryLabel: {
    color: '#fff',
    fontSize: 14,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prioritySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityText: {
    fontSize: 16,
    fontWeight: '500',
  },
  priorityDot: {
    fontSize: 16,
  },
  autoCompleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#1E2746',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Alternative style approach using SafeAreaView for the bottom container
const alternativeStyles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#1E2746',
    paddingBottom: BOTTOM_TAB_HEIGHT,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default ManualTaskCreate;
