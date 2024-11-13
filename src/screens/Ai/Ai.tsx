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

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey, how is your productivity treating you? Tell me how can I help you!', sender: 'bot' },
  ]);

  const [input, setInput] = useState('');

  const handleResponse = (response) => {
    if (response.error) {
      if (response.error.includes("completion date")) {
        setMessages((prevMessages) => [
          { id: Math.random().toString(), text: "Please enter the completion date.", sender: 'bot' },
          ...prevMessages,
        ]);
      } else {
        setMessages((prevMessages) => [
          { id: Math.random().toString(), text: "Please provide the title information for the task.", sender: 'bot' },
          ...prevMessages,
        ]);
      }
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Math.random().toString(),
        text: input,
        sender: 'user',
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setInput('');

      // Simulating a backend response
      const response = await mockBackendRequest(input); // Replace with actual backend call
      handleResponse(response);
    }
  };

  const mockBackendRequest = async (message) => {
    if (message.toLowerCase().includes("date")) {
      return { error: "Please provide a valid completion date and time for the task." };
    }
    return { error: "Please provide the task title." };
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={tw`mb-3 flex ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}
    >
      {item.sender === 'bot' && (
        <Image source={bot} style={tw`w-10 h-10 rounded-full mr-5 mt-4`} />
      )}
      <View
        style={[
          tw`relative p-3 rounded-lg max-w-3/4`,
          {
            backgroundColor: item.sender === 'user' ? '#3272A0' : '#1D1E23',
            borderRadius: 7,
            borderWidth: 1,
            borderColor: item.sender === 'user' ? '#3272A0' : '#666',
          },
        ]}
      >
        <Text style={tw`text-white`}>{item.text}</Text>

        {/* Bot tail */}
        {item.sender === 'bot' && (
          <>
            <View
              style={[
                tw`absolute left-[-17px] w-0 h-0 border-t-[10px] border-r-[17px] border-b-[11px]`,
                {
                  borderRightColor: '#3272A0',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  bottom: 10,
                },
              ]}
            />
            <View
              style={[
                tw`absolute left-[-10px] w-0 h-0 border-t-[10px] border-r-[11px] border-b-[10px]`,
                {
                  borderRightColor: '#1D1E23',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  bottom: 11,
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
                tw`absolute right-[-16px] w-0 h-0 border-t-[11px] border-l-[15px] border-b-[9px]`,
                {
                  borderLeftColor: '#3272A0',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  bottom: 9,
                },
              ]}
            />
            <View
              style={[
                tw`absolute right-[-10px] w-0 h-0 border-t-[10px] border-l-[11px] border-b-[6px]`,
                {
                  borderLeftColor: '#1D1E23',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  bottom: 12,
                },
              ]}
            />
          </>
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