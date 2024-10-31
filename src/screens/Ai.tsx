import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import tw from 'twrnc';
import bot from '../assets/bot.png';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey, how is your productivity treating you?', sender: 'bot' },
  ]);

  const [input, setInput] = useState('');

  const getBotResponse = async (message: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API Key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // or the appropriate model you want to use
          messages: [{ role: 'user', content: message }],
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return 'Oops! Something went wrong. Please try again later.';
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

      // Get bot response
      const botResponse = await getBotResponse(input);
      const botMessage: Message = {
        id: Math.random().toString(),
        text: botResponse,
        sender: 'bot',
      };
      setMessages((prevMessages) => [botMessage, ...prevMessages]);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={tw`mb-3 flex ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-${item.sender === 'user' ? 'end' : 'start'}`}
    >
      {item.sender === 'bot' && (
        <Image source={bot} style={tw`w-10 h-10 rounded-full mr-5 mt-4`} />
      )}
      <View
        style={[
          tw`relative p-3 rounded-lg max-w-3/4 border`,
          {
            borderColor: item.sender === 'user' ? '#9CA3AF' : '#3272A0',
            backgroundColor: '#1D1E23',
            shadowColor: 'white',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
            borderRadius: 7,
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
                  borderLeftColor: 'grey',
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
            onPress={sendMessage}
          >
            <Text style={tw`text-white`}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;