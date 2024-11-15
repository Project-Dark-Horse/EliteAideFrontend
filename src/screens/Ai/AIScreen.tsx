import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import tw from 'twrnc';
import bot from '../../assets/bot.png';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

interface TaskPromptResponse {
  error?: string;
  missing_fields?: string[];
  success?: boolean;
  nextPrompt?: string;
}

interface AccumulatedPrompt {
  title?: string;
  description?: string;
  dueDate?: string;
}

const categories = [
  { id: 'health', icon: '❤️', label: 'Health' },
  { id: 'travel', icon: '🚗', label: 'Travel' },
  { id: 'work', icon: '💼', label: 'Work' },
  { id: 'shopping', icon: '🛒', label: 'Shopping' },
  { id: 'finance', icon: '💰', label: 'Finance' },
  { id: 'personal', icon: '👤', label: 'Personal' },
];


// Add these flow-related types
interface TaskCreationState {
  name?: string;
  description?: string;
  category?: string;
  priority?: 'High' | 'Medium' | 'Low';
  deadline?: Date;
  autoComplete?: boolean;
}
// Update mockBackendRequest to handle the task creation flow
const mockBackendRequest = async (input: string, currentTask?: TaskCreationState): Promise<TaskPromptResponse> => {
  if (input.toLowerCase().includes('create') || input.toLowerCase().includes('task')) {
    return {
      success: true,
      nextPrompt: "Let's Create Your Task! What's the name of your task?"
    };
  }

  if (!currentTask?.name) {
    return {
      success: true,
      nextPrompt: "Would you like to describe it a bit more?"
    };
  }

  if (!currentTask?.description) {
    return {
      success: true,
      nextPrompt: "What kind of task is this?"
    };
  }

  if (!currentTask?.category) {
    return {
      success: true,
      nextPrompt: "How urgent is it?"
    };
  }

  if (!currentTask?.priority) {
    return {
      success: true,
      nextPrompt: "When's the deadline?"
    };
  }

  // Add more flow steps as needed

  return {
    success: true,
    nextPrompt: "Would you like me to auto-complete this task when certain conditions are met?"
  };
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey, how is your productivity treating you! Tell me how can I help you!', sender: 'bot' },
  ]);

  const [input, setInput] = useState('');
  const [currentTask, setCurrentTask] = useState<TaskCreationState>({});
  const [accumulatedPrompt, setAccumulatedPrompt] = useState<AccumulatedPrompt>({});

  const createTaskFromPrompt = async (prompt: string) => {
    try {
      const fullPrompt = [
        accumulatedPrompt.title && `title: ${accumulatedPrompt.title}`,
        accumulatedPrompt.description && `description: ${accumulatedPrompt.description}`,
        accumulatedPrompt.dueDate && `due date: ${accumulatedPrompt.dueDate}`,
        prompt
      ].filter(Boolean).join('. ');

      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${BASE_URL}/tasks/prompts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.missing_fields) {
          setAccumulatedPrompt(prev => ({
            ...prev,
          }));
        }
        return {
          error: data.message,
          missing_fields: data.missing_fields
        };
      }

      setAccumulatedPrompt({});
      return {
        success: true,
        nextPrompt: data.message
      };
    } catch (error) {
      console.error('Error creating task:', error);
      return {
        error: 'Failed to create task. Please try again.'
      };
    }
  };

  const handleResponse = async (response: TaskPromptResponse) => {
    if (response.error) {
      if (response.missing_fields?.length) {
        const missingFieldsMessage = `Please provide: ${response.missing_fields.join(', ')}`;
        setMessages(prevMessages => [
          { id: Math.random().toString(), text: missingFieldsMessage, sender: 'bot' },
          ...prevMessages,
        ]);
      } else {
        setMessages(prevMessages => [
          { id: Math.random().toString(), text: response.error || 'An error occurred', sender: 'bot' },
          ...prevMessages,
        ]);
      }
    } else if (response.success) {
      setMessages(prevMessages => [
        { id: Math.random().toString(), text: "Task created successfully! Anything else I can help you with?", sender: 'bot' },
        ...prevMessages,
      ]);
    } else if (response.nextPrompt) {
      setMessages(prevMessages => [
        { id: Math.random().toString(), text: response.nextPrompt || '', sender: 'bot' },
        ...prevMessages,
      ]);
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Math.random().toString(),
        text: input,
        sender: 'user',
      };
      setMessages(prevMessages => [newMessage, ...prevMessages]);
      setInput('');

      // If the message starts with "create" or contains task-related keywords
      if (input.toLowerCase().includes('create') || 
          input.toLowerCase().includes('task') || 
          input.toLowerCase().includes('reminder')) {
        const response = await createTaskFromPrompt(input);
        await handleResponse(response);
      } else {
        // Handle the task creation flow
        const response = await mockBackendRequest(input, currentTask);
        await handleResponse(response);
      }
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={tw`mb-3 flex ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
      {item.sender === 'bot' && (
        <View style={tw`w-10 h-10 rounded-full mr-2 bg-[#1D1E23] items-center justify-center`}>
          <Image source={bot} style={tw`w-8 h-8`} />
        </View>
      )}
      <View
        style={[
          tw`relative p-3 rounded-lg max-w-3/4`,
          {
            backgroundColor: '#1D1E23',
            borderRadius: 12,
          },
        ]}
      >
        <Text style={tw`text-white`}>{item.text}</Text>
        
        {/* Render category buttons if message asks for category */}
        {item.text === "What kind of task is this?" && (
          <View style={tw`flex-row flex-wrap mt-2`}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={tw`bg-[#2D2E33] rounded-full px-4 py-2 mr-2 mb-2 flex-row items-center`}
              >
                <Text style={tw`mr-1`}>{category.icon}</Text>
                <Text style={tw`text-white`}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Render priority buttons */}
        {item.text === "How urgent is it?" && (
          <View style={tw`flex-row mt-2`}>
            {['High', 'Medium', 'Low'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={tw`bg-[#2D2E33] rounded-full px-4 py-2 mr-2`}
              >
                <Text style={tw`text-white`}>
                  {priority === 'High' ? '🔴' : priority === 'Medium' ? '🟠' : '🔵'} {priority}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Calendar picker */}
        {item.text === "When's the deadline?" && (
          <View style={tw`mt-2 bg-[#2D2E33] rounded-lg p-2`}>
            <Calendar
              theme={{
                backgroundColor: '#2D2E33',
                calendarBackground: '#2D2E33',
                textSectionTitleColor: '#ffffff',
                selectedDayBackgroundColor: '#3272A0',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#3272A0',
                dayTextColor: '#ffffff',
                monthTextColor: '#ffffff',
              }}
            />
            <View style={tw`flex-row items-center justify-between mt-2`}>
              <Text style={tw`text-white`}>Time</Text>
              <TextInput
                style={tw`bg-[#1D1E23] text-white px-4 py-2 rounded-lg`}
                placeholder="11:38"
                placeholderTextColor="#666"
              />
              <TouchableOpacity style={tw`px-2`}>
                <Text style={tw`text-white`}>AM</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const quickReplies = ['Create task', 'Set a goal', 'Roast me', 'Show my day', 'Pending tasks'];

  return (
    <View style={tw`flex-1 bg-[#111111]`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={tw`flex-1 pb-9`}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          style={tw`p-4`}
          ListHeaderComponent={
            <View style={tw`flex-row flex-wrap mb-8`}>
              {quickReplies.map((reply) => (
                <TouchableOpacity
                  key={reply}
                  style={tw`bg-[#1D1E23] rounded-lg px-4 py-2 mr-2 mb-2`}
                  onPress={() => setInput(reply)}
                >
                  <Text style={tw`text-white`}>{reply}</Text>
                </TouchableOpacity>
              ))}
            </View>
          }
        />

        <View style={tw`flex-row items-center p-4 bg-[#111111] mb-25`}>
          <TextInput
            style={tw`flex-1 px-4 py-2 rounded-full bg-[#1D1E23] text-white`}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={2}
          />

          {/* Mic Icon
          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`bg-[#3272A0] p-2 rounded-full ml-2`}
          >
            <Icon name="mic" size={20} color="#fff" />
          </TouchableOpacity> */}

          {/* Send Icon */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`bg-[#3272A0] p-2 rounded-full ml-2`}
            onPress={sendMessage}
          >
            <Icon name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;