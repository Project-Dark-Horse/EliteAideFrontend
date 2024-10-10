
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import tw from 'twrnc';

const avatarr = require('../assets/bot.png');

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

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Math.random().toString(),
        text: input,
        sender: 'user',
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setInput('');
    }
  };
  const renderItem = ({ item }: { item: Message }) => (
    <View style={tw`mb-3 flex items-${item.sender === 'user' ? 'end' : 'start'}`}>
      {item.sender === 'bot' && (
        <View style={tw`flex flex-row items-center`}>
          <Image
            source={avatarr} 
            style={tw`w-11 h-11 rounded-full mr-5 ml--3`} 
          />
          <View
            style={[
              tw`relative p-3 rounded-lg max-w-3/4 border`,
              {
                borderColor: '#3272A0',
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
          </View>
        </View>
      )}
  
      {item.sender === 'user' && (
        <View
          style={[
            tw`relative p-3 rounded-lg max-w-3/4 border`,
            {
              borderColor: '#9CA3AF',
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
          
          {/* User tail */}
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
        </View>
      )}
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
          <ScrollView 
            style={tw`max-h-12`} 
            keyboardShouldPersistTaps="handled"
          >
                <TextInput
                  style={tw`flex-1 px-4 py-2 rounded-md bg-[#1D1E23] text-white`}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type a message..."
                  placeholderTextColor="#ccc"
                  multiline={true}
                  textAlignVertical="top"
                />
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`bg-blue-500 p-2 rounded-md ml-2`}
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
