import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import bot from '../../assets/bot.png';
import Icon from 'react-native-vector-icons/Ionicons';
import user from '../../assets/user.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Voice from '@react-native-voice/voice';
import { useTaskRefresh } from '../../context/TaskRefreshContext';
import SearchBar from '../../components/SearchBar';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  showQuickReplies?: boolean;
  action?: 'create_task' | 'show_day' | null;
  backgroundColor?: string;
  timestamp?: string;
}

interface TaskDetails {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  type: string;
  created_at: string;
}

interface SuccessResponse {
  message: {
    message: string;
    task_details: TaskDetails;
  };
}

interface TaskResponse {
  message: {
    message: string;
    task_details: {
      total_pages: number;
      total_items: number;
      current_page: number | null;
      page_size: number;
      data: Array<{
        id: number;
        title: string;
        description: string;
        priority: number;
        status: string;
        due_date: string;
        type: string;
        created_at: string;
        updated_at: string;
        creator: number;
      }>;
    };
  };
}

interface ApiResponse {
  error?: string;
  message?: string;
  nextPrompt?: string;
  suggestions?: string[];
}

type RootStackParamList = {
  Login: undefined;
  NotificationScreen: undefined;
  // Add other screens as needed
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BASE_URL = 'https://api.eliteaide.tech/';

const ChatScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Hey, how is your productivity treating you? Tell me how can I help you!',
      sender: 'bot',
      showQuickReplies: true 
    },
  ]);

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const { setShouldRefresh } = useTaskRefresh();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = searchQuery
    ? messages.filter(msg => 
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const handleResponse = (response: ApiResponse) => {
    if (response.error) {
      setMessages((prevMessages) => [
        { id: Math.random().toString(), text: response.error || 'Unknown error', sender: 'bot' },
        ...prevMessages,
      ]);
    } else if (response.message || response.nextPrompt) {
      const botMessage: Message = {
        id: Math.random().toString(),
        text: response.message || response.nextPrompt || '',
        sender: 'bot' as const,
        showQuickReplies: response.suggestions ? true : false
      };
      
      setMessages((prevMessages) => [botMessage, ...prevMessages]);
      
      if (response.suggestions) {
        setQuickReplies(response.suggestions);
      }
    }
  };
  
  const sendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userInput = input.trim();
      setInput('');
      setIsLoading(true);

      // Check if the input is "SHOW MY TASKS" and handle it separately
      if (userInput.toLowerCase() === 'SHOW MY TASKS') {
        // Handle "SHOW MY TASKS" action here
        console.log('Handling "SHOW MY TASKS" action');
        // Add specific logic for "SHOW MY TASKS" here
        setIsLoading(false);
        return; // Exit early to prevent API call
      }

      const userMessage: Message = {
        id: Math.random().toString(),
        text: userInput,
        sender: 'user'
      };
      setMessages(prevMessages => [userMessage, ...prevMessages]);

      try {
        const token = await AsyncStorage.getItem('access_token');
        console.log('Retrieved Access Token:', token);
        if (!token) {
          navigation.navigate('Login');
          return;
        }

        console.log('Sending request with payload:', { prompt: userInput });

        const response = await axios.post<SuccessResponse>(
          `${BASE_URL}v1/tasks/prompts/`,
          { prompt: userInput },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('API Response:', response.data);

        const taskDetails = response.data.message.task_details;
        const priorityMap = {
          1: '🟢 Low',
          2: '🟡 Medium',
          3: '🔴 High'
        };
        const priorityKey = Number(taskDetails.priority) as keyof typeof priorityMap;
        const priority = priorityMap[priorityKey] || `Priority ${taskDetails.priority}`;

        const formattedMessage = `✅ Task created successfully!\n\n` +
          `Title: ${taskDetails.title}\n` +
          `Description: ${taskDetails.description}\n` +
          `Due Date: ${new Date(taskDetails.due_date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}\n` +
          `Priority: ${priority}\n` +
          `Type: ${taskDetails.type}\n` +
          `Created At: ${new Date(taskDetails.created_at).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}`;

        setMessages(prevMessages => [
          {
            id: Math.random().toString(),
            text: formattedMessage,
            sender: 'bot',
            timestamp: new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          },
          {
            id: Math.random().toString(),
            text: "What would you like to do next?",
            sender: 'bot',
            showQuickReplies: true,
            timestamp: new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          },
          ...prevMessages
        ]);

        setQuickReplies(['CREATE ANOTHER TASK', 'SHOW MY TASKS']);
        setShouldRefresh(true);

      } catch (error) {
        let errorMessage = "Sorry, something went wrong. Please try again.";
        
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            navigation.navigate('Login');
            errorMessage = "Your session has expired. Please login again.";
          } else if (error.response?.status === 400) {
            errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Invalid task description. Please provide more details.";
          } else if (error.response?.status === 429) {
            errorMessage = "You've made too many requests. Please wait a moment and try again.";
          }
        }

        setMessages(prevMessages => [
          { 
            id: Math.random().toString(), 
            text: `❌ ${errorMessage}`, 
            sender: 'bot' 
          },
          ...prevMessages
        ]);

      } finally {
        setIsLoading(false);
      }
    }
  };

  const [quickReplies, setQuickReplies] = useState<string[]>([
    'CREATE TASK', 
    'SHOW MY TASKS'
  ]);

  const handleQuickReply = async (reply: string) => {
    console.log('Quick reply selected:', reply);

    if (reply === 'CREATE TASK' || reply === 'CREATE ANOTHER TASK') {
      console.log('Handling CREATE TASK action');
      setShowInput(true);
      setMessages(prevMessages => [
        {
          id: Math.random().toString(),
          text: "Please describe the task you'd like to create",
          sender: 'bot',
          action: 'create_task'
        },
        ...prevMessages
      ]);
    } else if (reply === 'SHOW MY TASKS') {
      console.log('Handling SHOW MY TASKS action');
      setShowInput(false);
      
      // Get today's date and tomorrow's date
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const startDate = today.toISOString().split('T')[0];
      const endDate = tomorrow.toISOString().split('T')[0];
      
      console.log('Fetching tasks between:', { startDate, endDate });

      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          console.log('No token found, redirecting to login');
          navigation.navigate('Login');
          return;
        }

        console.log('Making API request to fetch tasks');
        const response = await axios.get<TaskResponse>(`${BASE_URL}v1/tasks/range`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            start_date: startDate,
            end_date: endDate
          }
        });

        console.log('API Response:', {
          status: response.status,
          taskCount: response.data.message.task_details.total_items,
          tasks: response.data.message.task_details.data
        });

        const tasks = response.data.message.task_details.data;
        const tasksList = tasks.map(task => {
          const dueDate = new Date(task.due_date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          const priorityMap = {
            1: '🟢 Low',
            2: '🟡 Medium',
            3: '🔴 High'
          };
          const priority = priorityMap[task.priority as keyof typeof priorityMap] || `Priority ${task.priority}`;
          
          return `• ${task.title}\n  ${priority} | Due: ${dueDate}\n  ${task.status} | ${task.type}`;
        }).join('\n\n');

        const messageText = tasks.length > 0 
          ? `📋 Here are your upcoming tasks:\n\n${tasksList}`
          : "✨ You have no tasks scheduled for today!";

        console.log('Updating messages with formatted task list');
        setMessages(prevMessages => [
          {
            id: Math.random().toString(),
            text: messageText,
            sender: 'bot',
            showQuickReplies: true
          },
          ...prevMessages
        ]);
      } catch (error) {
        console.error('Error in SHOW MY TASKS:', {
          error,
          status: axios.isAxiosError(error) ? error.response?.status : 'unknown',
          data: axios.isAxiosError(error) ? error.response?.data : 'unknown'
        });

        let errorMessage = "Sorry, I encountered an error while fetching your tasks. Please try again.";
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            errorMessage = "Your session has expired. Please login again.";
            navigation.navigate('Login');
          }
        }

        setMessages(prevMessages => [
          {
            id: Math.random().toString(),
            text: errorMessage,
            sender: 'bot',
            showQuickReplies: true
          },
          ...prevMessages
        ]);
      }
    } else {
      console.log('Handling other quick reply:', reply);
      setInput(reply);
      setShowInput(true);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View>
      <View
        style={tw`mb-3 flex ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}
      >
        {item.sender === 'bot' && (
          <Image source={bot} style={tw`w-8 h-8 rounded-full mr-2 mt-1`} />
        )}
        {item.sender === 'user' && (
          <Image 
            source={user} 
            style={[
              tw`w-8 h-8 rounded-full ml-2 mt-1`,
              { borderWidth: 2, borderColor: '#666' }
            ]} 
          />
        )}
        <View
          style={[
            tw`relative p-3 rounded-lg max-w-3/4`,
            {
              backgroundColor: item.backgroundColor || (item.sender === 'user' ? '#1D1E23' : '#1D1E23'),
              borderRadius: 7,
              borderWidth: 1,
              borderColor: item.sender === 'user' ? '#666' : '#3272A0',
            },
          ]}
        >
          <Text style={[tw`text-gray-200`, { fontWeight: '100' }]}>{item.text}</Text>
          <Text style={tw`text-gray-400 text-xs mt-1`}>{item.timestamp}</Text>

          {/* Bot tail */}
          {item.sender === 'bot' && (
            <>
              <View
                style={[
                  tw`absolute left-[-8px] w-0 h-0`,
                  {
                    borderRightWidth: 8,
                    borderRightColor: '#3272A0',
                    borderTopWidth: 6,
                    borderTopColor: 'transparent',
                    borderBottomWidth: 6,
                    borderBottomColor: 'transparent',
                    top: 12,
                    transform: [{ rotate: '-5deg' }]
                  },
                ]}
              />
              <View
                style={[
                  tw`absolute left-[-6px] w-0 h-0`,
                  {
                    borderRightWidth: 7,
                    borderRightColor: '#1D1E23',
                    borderTopWidth: 5,
                    borderTopColor: 'transparent',
                    borderBottomWidth: 5,
                    borderBottomColor: 'transparent',
                    top: 13,
                    transform: [{ rotate: '-5deg' }]
                  },
                ]}
              />
            </>
          )}

          {/* User tail */}
          {item.sender === 'user' && (
            <>
              <View
                style={[
                  tw`absolute right-[-8px] w-0 h-0`,
                  {
                    borderLeftWidth: 8,
                    borderLeftColor: '#666',
                    borderTopWidth: 6,
                    borderTopColor: 'transparent',
                    borderBottomWidth: 6,
                    borderBottomColor: 'transparent',
                    top: 12,
                    transform: [{ rotate: '5deg' }]
                  },
                ]}
              />
              <View
                style={[
                  tw`absolute right-[-6px] w-0 h-0`,
                  {
                    borderLeftWidth: 7,
                    borderLeftColor: '#1D1E23',
                    borderTopWidth: 5,
                    borderTopColor: 'transparent',
                    borderBottomWidth: 5,
                    borderBottomColor: 'transparent',
                    top: 13,
                    transform: [{ rotate: '5deg' }]
                  },
                ]}
              />
            </>
          )}
        </View>
      </View>
      
      {item.showQuickReplies && (
        <View style={tw`flex ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} mb-3 ml-13`}>
          <View style={tw`flex-row flex-wrap`}>
            {quickReplies.map((reply) => (
              <TouchableOpacity
                key={reply}
                style={tw`bg-[#1D1E23] rounded-lg px-4 py-2 mr-2 mb-2 border-[#555555] border-2`}
                onPress={() => handleQuickReply(reply)}
              >
                <Text style={[tw`text-white`, { fontFamily: 'Times New Roman', fontSize: 10, color: '#65779E', fontWeight: '700' }]}>
                  {reply}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Voice recognition error:', error);
      setIsListening(false);
    }
  };

  const onSpeechResults = (event: any) => {
    const spokenText = event.value[0];
    setInput(spokenText);
    setIsListening(false);
  };

  const onSpeechError = () => {
    setIsListening(false);
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleInputChange = (text: string) => {
    setInput(text);
    if (isListening && text.length > 0) {
      setIsListening(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={tw`flex-1 bg-[#111111] pb-7`}>
      <View style={tw`flex-row items-center justify-between p-4 bg-[#111111]`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold`}>AI Chat</Text>
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={() => console.log('Search pressed')} style={tw`p-2`}>
            <Icon name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')} style={tw`p-2`}>
            <Icon name="notifications" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={handleClearSearch}
        placeholder="Search conversations..."
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={tw`flex-1 pb-12`}
      >
        <FlatList
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={tw`px-4 pt-4`}
          ListFooterComponent={<View style={tw`h-4`} />}
          ListHeaderComponent={<View style={tw`h-4`} />}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />

        <View style={tw`flex-row items-center p-4 bg-[#111111] mb-12`}>
          <TextInput
            style={[
              tw`flex-1 px-4 py-2 rounded-full bg-[#1D1E23] text-white`,
              { fontSize: 13 }
            ]}
            value={input}
            onChangeText={handleInputChange}
            placeholder="Type a message..."
            placeholderTextColor="#4B4B4B"
            multiline
            numberOfLines={2}
            maxLength={1000}
          />
          
          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`bg-[#3272A0] p-2 rounded-full ml-2`}
            onPress={input.trim() ? sendMessage : startListening}
            disabled={isLoading}
          >
            <Icon 
              name={
                isLoading 
                  ? "timer-outline" 
                  : input.trim() 
                    ? "send" 
                    : isListening 
                      ? "stop" 
                      : "mic"
              } 
              size={20} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;