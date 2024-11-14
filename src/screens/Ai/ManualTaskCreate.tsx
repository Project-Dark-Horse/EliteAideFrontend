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
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import BotAvatar from '../../assets/bot.png';
import UserAvatar from '../../assets/ManAvatar.png';
import GradientBorder from '../../components/GradientBorder';


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

  const renderMessage = (message: string, isAI: boolean) => (
    <View style={[styles.messageWrapper, isAI ? {} : styles.userMessageWrapper]}>
      {isAI ? (
        <Image source={BotAvatar} style={styles.aiAvatar} />
      ) : (
        <Image source={UserAvatar} style={[styles.aiAvatar, styles.userAvatar]} />
      )}
      <GradientBorder style={{ flex: 1, maxWidth: '80%' }} isUser={!isAI}>
        <View style={[
          styles.messageBox,
          isAI ? styles.aiMessageBox : styles.userMessageBox
        ]}>
          <Text style={[
            styles.messageText,
            !isAI && styles.userMessageText
          ]}>{message}</Text>
        </View>
        <View style={[
          styles.chatTail,
          isAI ? styles.aiChatTail : styles.userChatTail
        ]} />
      </GradientBorder>
      {!isAI && <View style={styles.spacer} />}
    </View>
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

  const renderDatePicker = () => {
    if (!showDatePicker) return null;

    if (Platform.OS === 'ios') {
      return (
        <Modal
          transparent
          animationType="slide"
          visible={showDatePicker}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeader}>
                <TouchableOpacity 
                  onPress={() => setShowDatePicker(false)}
                  style={styles.datePickerButton}
                >
                  <Text style={styles.datePickerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setShowDatePicker(false)}
                  style={styles.datePickerButton}
                >
                  <Text style={[styles.datePickerButtonText, { color: '#3272A0' }]}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  if (date) setSelectedDate(date);
                }}
                textColor="#FFFFFF"
                themeVariant="dark"
                style={styles.datePickerIOS}
              />
            </View>
          </View>
        </Modal>
      );
    }

    // Android picker
    return (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={(event: DateTimePickerEvent, date?: Date) => {
          setShowDatePicker(false);
          if (date) setSelectedDate(date);
        }}
        themeVariant="dark"
      />
    );
  };

  const renderTimePicker = () => {
    if (!showTimePicker) return null;

    if (Platform.OS === 'ios') {
      return (
        <Modal
          transparent
          animationType="slide"
          visible={showTimePicker}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeader}>
                <TouchableOpacity 
                  onPress={() => setShowTimePicker(false)}
                  style={styles.datePickerButton}
                >
                  <Text style={styles.datePickerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setShowTimePicker(false)}
                  style={styles.datePickerButton}
                >
                  <Text style={[styles.datePickerButtonText, { color: '#3272A0' }]}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="spinner"
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  if (date) setSelectedTime(date);
                }}
                textColor="#FFFFFF"
                themeVariant="dark"
                style={styles.datePickerIOS}
              />
            </View>
          </View>
        </Modal>
      );
    }

    // Android picker
    return (
      <DateTimePicker
        value={selectedTime}
        mode="time"
        display="default"
        onChange={(event: DateTimePickerEvent, date?: Date) => {
          setShowTimePicker(false);
          if (date) setSelectedTime(date);
        }}
        themeVariant="dark"
      />
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconIonicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <IconIonicons name="search" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <IconIonicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {renderMessage("Hey, how is your productivity treating you? Tell me how can I help you!", true)}

          <View style={styles.quickReplies}>
            {['Create task', 'Set a goal', 'Roast me', 'Show my day', 'Pending tasks'].map((action) => (
              <GradientBorder key={action}>
                <TouchableOpacity style={styles.quickReplyButton}>
                  <Text style={styles.quickReplyText}>{action}</Text>
                </TouchableOpacity>
              </GradientBorder>
            ))}
          </View>

          {renderMessage(taskName, false)}
          {renderMessage("Would you like to describe it a bit more?", true)}
          {renderMessage(taskDescription, false)}
          {renderMessage("What kind of task is this?", true)}

          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <GradientBorder key={category.id}>
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryLabel}>{category.label}</Text>
                </TouchableOpacity>
              </GradientBorder>
            ))}
          </View>

          {renderMessage("How urgent is it?", true)}
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

          {renderMessage("When's the deadline?", true)}
          <GradientBorder>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <IconIonicons name="calendar-outline" size={20} color="#fff" />
              <Text style={styles.dateTimeText}>
                {selectedDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </TouchableOpacity>
          </GradientBorder>

          <GradientBorder>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <IconIonicons name="time-outline" size={20} color="#fff" />
              <Text style={styles.dateTimeText}>
                {selectedTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
          </GradientBorder>

          {renderDatePicker()}
          {renderTimePicker()}

          {renderMessage("Would you like me to auto-complete this task when certain conditions are met?", true)}
          <View style={styles.autoCompleteContainer}>
            <Text style={styles.autoCompleteText}>Autocomplete task:</Text>
            <TouchableOpacity
              style={[styles.toggle, autoComplete && styles.toggleActive]}
              onPress={() => setAutoComplete(!autoComplete)}
            >
              <View style={[styles.toggleHandle, autoComplete && styles.toggleHandleActive]} />
            </TouchableOpacity>
          </View>

          {renderMessage("Alright, here's your task summary. Does everything look good?", true)}

          <GradientBorder>
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
          </GradientBorder>

          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save task</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <Modal visible={showNameInput} transparent animationType="slide">
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

      <Modal visible={showDescInput} transparent animationType="slide">
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111111',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userMessageWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  userAvatar: {
    marginLeft: 8,
  },
  spacer: {
    width: 32,
  },
  messageBox: {
    padding: 12,
  },
  aiMessageBox: {
    backgroundColor: 'transparent',
  },
  userMessageBox: {
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  quickReplyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  quickReplyText: {
    color: '#FFFFFF',
    fontSize: 13,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: '#3272A0',
  },
  categoryIcon: {
    marginRight: 4,
    fontSize: 16,
  },
  categoryLabel: {
    color: '#FFFFFF',
    fontSize: 13,
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
  modalDatePickerButton: {
    padding: 8,
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
    padding: 16,
    backgroundColor: 'transparent',
  },
  taskSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskSummaryTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskSummaryDesc: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
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
  bottomPadding: {
    height: 36,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  datePickerContainer: {
    backgroundColor: '#1D1E23',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
 
  datePickerButtonText: {
    color: '#FFFFFF',
  },
  datePickerIOS: {
    height: 200,
    backgroundColor: '#1D1E23',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  dateTimeText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  chatTail: {
    position: 'absolute',
    bottom: 8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  aiChatTail: {
    left: -8,
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: '#3272A0',
    borderBottomColor: 'transparent',
  },
  userChatTail: {
    right: -8,
    borderTopWidth: 8,
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderTopColor: 'transparent',
    borderLeftColor: '#3272A0',
    borderBottomColor: 'transparent',
  },
});

export default CreateTaskScreen;