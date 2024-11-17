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
import { BASE_URL } from '@env';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskPayload {
  title: string;
  description: string;
  priority: number;
  status: string;
  due_date: string;
  type: string;
}

type RootStackParamList = {
  Login: undefined;
};

const CATEGORIES = [
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'health', label: 'Health', icon: '💔' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'shopping', label: 'Shopping', icon: '🛒' },
];

// Define a type for the priority keys
type PriorityLevel = 'high' | 'medium' | 'low';

const priorityMap: Record<PriorityLevel, number> = {
  high: 1,
  medium: 2,
  low: 3,
};

const BOTTOM_TAB_HEIGHT = 50; 

const ManualTaskCreate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: Date) => date.toLocaleDateString('en-GB');
  const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const getAccessToken = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  };

  const createTask = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        Alert.alert('Authentication Error', 'Please log in to continue.');
        navigation.navigate('Login');
        return;
      }

      const dueDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );

      const payload: TaskPayload = {
        title: title.trim(),
        description: description.trim(),
        priority: priorityMap[priority],
        status: 'Pending',
        due_date: dueDateTime.toISOString(),
        type: selectedCategory || 'Personal',
      };

      console.log('Payload:', payload);

      const response = await axios.post(`${BASE_URL}v1/tasks/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message.message === 'Task created successfully') {
        console.log('Task created successfully:', response.data.message.task_details);
        navigation.goBack();
      } else {
        Alert.alert('Unexpected Response', 'The server responded with an unexpected result.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
        if (error.response?.status === 401) {
          Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
          navigation.navigate('Login');
        } else if (error.response?.status === 400) {
          Alert.alert('Validation Error', 'Please check the task details and try again.');
        } else {
          Alert.alert('Error', 'An error occurred while creating the task.');
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#65779E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Task</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateText}>{formatDate(date)}</Text>
                  <Ionicons name="chevron-down" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Time</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => setShowTimePicker(true)}>
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
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.id && styles.selectedCategory,
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
              <Text style={styles.label}>Priority</Text>
              <RNPickerSelect
                onValueChange={(value) => setPriority(value)}
                items={[
                  { label: 'High', value: 'High' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Low', value: 'Low' },
                ]}
                style={pickerSelectStyles}
                value={priority}
                placeholder={{}}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Autocomplete</Text>
              <Switch value={autoComplete} onValueChange={setAutoComplete} />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.saveButton, (!title || isLoading) && styles.saveButtonDisabled]}
            onPress={createTask}
            disabled={!title || isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save & Proceed</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
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
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
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
    backgroundColor: '#111111',
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
    color: '#65779E',
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
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
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
    borderBottomColor: '#979797',
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
    borderColor: '#979797',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryLabel: {
    color: '#fff',
    fontSize: 12,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#979797',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  selectedPriorityButton: {
    backgroundColor: '#979797',
  },
  autoCompleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#1D1E23', // Card grey color
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#323232',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#323232', // Card grey color
    shadowColor: '#323232',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  buttonShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  headerButton: {
    backgroundColor: '#1D1E23', // Button background color
    borderRadius: 20,
    padding: 8,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 4,
    color: '#fff',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'transparent',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#979797',
    borderRadius: 8,
    color: '#fff',
    paddingRight: 30, 
    backgroundColor: 'transparent',
  },
});

export default ManualTaskCreate;
