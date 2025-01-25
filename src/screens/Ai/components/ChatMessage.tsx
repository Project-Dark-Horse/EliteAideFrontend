import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import BotAvatar from '../../../assets/bot.png';

interface ChatMessageProps {
  isAI: boolean;
  message: string;
}


const ChatMessage = ({ isAI, message }: ChatMessageProps) => (
  <View style={tw`flex-row items-start my-2 ${!isAI ? 'justify-end' : ''}`}>
    {isAI && (
      <Image source={BotAvatar} style={tw`w-8 h-8 mr-2 rounded-full`} />
    )}
    <View style={tw`${isAI ? 'bg-[#1E2746]' : 'bg-[#36AAB9]'} rounded-2xl p-3 max-w-[80%]`}>
      <Text style={tw`text-white`}>{message}</Text>
    </View>
  </View>
);

export default ChatMessage; 