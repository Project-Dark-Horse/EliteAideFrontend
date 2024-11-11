import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TaskCategory {
  id: string;
  icon: string;
  label: string;
}

type RootStackParamList = {
  CreateTask: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateTask'>;

const CreateTaskScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // States
  const [taskName, setTaskName] = useState('Finish the monthly report');
  const [taskDescription, setTaskDescription] = useState('Complete the report, review it with the team, and submit.');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('work');
  const [priority, setPriority] = useState('high');
  const [autoComplete, setAutoComplete] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showDescInput, setShowDescInput] = useState(false);

  const categories: TaskCategory[] = [
    { id: 'health', icon: '❤️', label: 'Health' },
    { id: 'travel', icon: '✈️', label: 'Travel' },
    { id: 'work', icon: '💼', label: 'Work' },
    { id: 'shopping', icon: '🛍️', label: 'Shopping' },
    { id: 'finance', icon: '💰', label: 'Finance' },
    { id: 'personal', icon: '👤', label: 'Personal' },
  ];

  const renderAIMessage = (message: string) => (
    <View style={styles.messageContainer}>
      <View style={styles.aiAvatar}>
        <Text style={styles.aiAvatarText}>🤖</Text>
      </View>
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );

  const renderUserInput = (text: string, onPress?: () => void) => (
    <TouchableOpacity
      style={styles.userInputContainer}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.userInputBox}>
        <Text style={styles.userInputText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSave = () => {
    console.log({
      taskName,
      taskDescription,
      selectedCategory,
      priority,
      selectedDate,
      selectedTime,
      autoComplete,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconIonicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconIonicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContentContainer}
        >
          {renderAIMessage("Hey, how is your productivity treating you? Tell me how can I help you!")}

          <View style={styles.quickActions}>
            {['Create task', 'Set a goal', 'Roast me', 'Show my day', 'Pending tasks'].map(
              (action) => (
                <TouchableOpacity key={action} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>{action}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {renderUserInput("Create a task")}
          {renderAIMessage("Let's Create Your Task! What's the name of your task?")}
          {renderUserInput(taskName, () => setShowNameInput(true))}
          {renderAIMessage("Would you like to describe it a bit more?")}
          {renderUserInput(taskDescription, () => setShowDescInput(true))}
          {renderAIMessage("What kind of task is this?")}

          <View style={styles.categoryContainer}>
            {categories.map((category) => (
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

          {renderAIMessage("How urgent is it?")}
          <View style={styles.priorityContainer}>
            {[
              { id: 'high', color: '#FF4444', label: 'High' },
              { id: 'medium', color: '#FFA500', label: 'Medium' },
              { id: 'low', color: '#44FF44', label: 'Low' },
            ].map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.priorityButton,
                  priority === item.id && styles.selectedPriority,
                ]}
                onPress={() => setPriority(item.id)}
              >
                <View style={[styles.priorityDot, { backgroundColor: item.color }]} />
                <Text style={styles.priorityText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {renderAIMessage("When's the deadline?")}
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timePickerText}>
              {selectedTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>

          {renderAIMessage("Would you like me to auto-complete this task when certain conditions are met?")}
          <View style={styles.autoCompleteContainer}>
            <Text style={styles.autoCompleteText}>Autocomplete task:</Text>
            <TouchableOpacity
              style={[styles.toggle, autoComplete && styles.toggleActive]}
              onPress={() => setAutoComplete(!autoComplete)}
            >
              <View style={[styles.toggleHandle, autoComplete && styles.toggleHandleActive]} />
            </TouchableOpacity>
          </View>

          {renderAIMessage("Alright, here's your task summary. Does everything look good?")}

          <View style={styles.taskSummary}>
            <View style={styles.taskSummaryHeader}>
              <IconIonicons name="document-text-outline" size={24} color="#fff" />
              <Text style={styles.taskSummaryTitle}>{taskName}</Text>
            </View>
            <Text style={styles.taskSummaryDesc}>{taskDescription}</Text>
            <Text style={styles.taskSummaryTime}>
              Due date: {selectedDate.toLocaleDateString()} {selectedTime.toLocaleTimeString()}
            </Text>
          </View>

          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save task</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          visible={showNameInput}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Task Name</Text>
              <TextInput
                style={styles.modalInput}
                value={taskName}
                onChangeText={setTaskName}
                placeholder="Enter task name"
                placeholderTextColor="#666"
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowNameInput(false)}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showDescInput}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Task Description</Text>
              <TextInput
                style={[styles.modalInput, styles.modalTextArea]}
                value={taskDescription}
                onChangeText={setTaskDescription}
                placeholder="Enter task description"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowDescInput(false)}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={(event, time) => {
            setShowTimePicker(false);
            if (time) setSelectedTime(time);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiAvatarText: {
    fontSize: 20,
  },
  messageBox: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 12,
    maxWidth: '80%',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  userInputContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  userInputBox: {
    backgroundColor: '#0A84FF',
    borderRadius: 20,
    padding: 12,
    maxWidth: '80%',
  },
  userInputText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },
    categoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2C2C2E',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    selectedCategory: {
      backgroundColor: '#3A3A3C',
      borderColor: '#0A84FF',
      borderWidth: 1,
    },
    categoryIcon: {
      marginRight: 4,
      fontSize: 16,
    },
    categoryLabel: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    priorityContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
    priorityButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2C2C2E',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    selectedPriority: {
      backgroundColor: '#3A3A3C',
      borderColor: '#0A84FF',
      borderWidth: 1,
    },
    priorityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 8,
    },
    priorityText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    datePickerButton: {
      backgroundColor: '#2C2C2E',
      borderRadius: 20,
      padding: 12,
      marginBottom: 8,
    },
    datePickerText: {
      color: '#FFFFFF',
      fontSize: 14,
      textAlign: 'center',
    },
    timePickerButton: {
      backgroundColor: '#2C2C2E',
      borderRadius: 20,
      padding: 12,
      marginBottom: 16,
    },
    timePickerText: {
      color: '#FFFFFF',
      fontSize: 14,
      textAlign: 'center',
    },
    autoCompleteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    autoCompleteText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    toggle: {
      width: 51,
      height: 31,
      backgroundColor: '#3A3A3C',
      borderRadius: 15.5,
      padding: 2,
    },
    toggleActive: {
      backgroundColor: '#0A84FF',
    },
    toggleHandle: {
      width: 27,
      height: 27,
      backgroundColor: '#FFFFFF',
      borderRadius: 13.5,
    },
    toggleHandleActive: {
      transform: [{ translateX: 20 }],
    },
    taskSummary: {
      backgroundColor: '#2C2C2E',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    taskSummaryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    taskSummaryTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    taskSummaryDesc: {
      color: '#FFFFFF',
      fontSize: 14,
      marginBottom: 8,
    },
    taskSummaryTime: {
      color: '#8E8E93',
      fontSize: 12,
    },
    bottomButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    editButton: {
      flex: 1,
      backgroundColor: '#2C2C2E',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
          justifyContent: 'center',
        },
        editButtonText: {
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '500',
        },
        saveButton: {
          flex: 1,
          backgroundColor: '#0A84FF',
          borderRadius: 8,
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
        },
        saveButtonText: {
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '600',
        },
    });

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  modalTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButton: {
    backgroundColor: '#0A84FF',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateTaskScreen;