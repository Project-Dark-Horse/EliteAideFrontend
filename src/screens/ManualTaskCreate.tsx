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
  Alert,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bot from '../assets/bot.png';

// Define interfaces for Categories and Urgency Levels
interface Category {
  id: 'health' | 'travel' | 'work' | 'shopping' | 'finance' | 'personal';
  icon: string;
  label: string;
}

interface UrgencyLevel {
  id: 'high' | 'medium' | 'low';
  color: string;
  label: string;
}

interface TaskData {
  name: string;
  description: string;
  category: Category['id'] | '';
  urgency: UrgencyLevel['id'] | '';
  dueDate: Date | null;
  autoComplete: boolean;
}

// Define a message interface
interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const TaskCreationScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm here to help you manage your tasks.", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to update chat messages
  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prevMessages => [
      ...prevMessages,
      { id: Math.random().toString(), text, sender },
    ]);
  };

  const createTask = async (task: TaskData): Promise<string> => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return 'Please log in to create tasks.';
      }

      const response = await fetch('https://api.eliteaide.tech/v1/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      setLoading(false);
      if (response.ok) {
        return 'Task created successfully!';
      } else {
        return data.message || 'Failed to create task. Please provide complete details.';
      }
    } catch (error) {
      setLoading(false);
      console.error('Error creating task:', error);
      return 'An error occurred. Please try again later.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    addMessage(input, 'user');

    // Determine bot response
    if (input.toLowerCase().includes('create task')) {
      addMessage('Please provide the task details in the format: title, description, category, urgency, due date.', 'bot');
    } else if (input.toLowerCase().includes('task')) {
      const taskData: TaskData = {
        name: 'Sample Task',
        description: input,
        category: 'work', // Default category for example
        urgency: 'medium', // Default urgency
        dueDate: new Date(), // Placeholder date
        autoComplete: false,
      };
      const response = await createTask(taskData);
      addMessage(response, 'bot');
    } else {
      addMessage("I'm here to help! Try asking me to 'create task'.", 'bot');
    }
    setInput('');
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        tw`mb-3 flex ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-center`,
      ]}
    >
      {item.sender === 'bot' && <Image source={bot} style={tw`w-10 h-10 rounded-full mr-3`} />}
      <View
        style={[
          tw`p-3 rounded-lg max-w-3/4`,
          {
            backgroundColor: item.sender === 'user' ? '#1D1E23' : '#3272A0',
            borderRadius: 15,
            borderBottomLeftRadius: item.sender === 'user' ? 15 : 0,
            borderBottomRightRadius: item.sender === 'bot' ? 15 : 0,
          },
        ]}
      >
        <Text style={tw`text-white`}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-[#111111]`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={tw`flex-1`}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          style={tw`p-4`}
        />

        <View style={tw`flex-row items-center p-4 bg-[#111111] mb-25`}>
          <TextInput
            style={tw`flex-1 px-4 py-2 rounded-md bg-[#1D1E23] text-white`}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={2}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`bg-gray-500 p-2 rounded-md ml-2`}
            onPress={handleSend}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={tw`text-white`}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TaskCreationScreen;