// components/NotificationItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

interface NotificationItemProps {
  message: string;
  onPress: () => void;
}

const NotificationCard: React.FC<NotificationItemProps> = ({ message, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`h-[70px] p-4 bg-[#1d1e23] rounded-2xl flex-row justify-start items-center gap-6`}
    >
      <View style={tw`w-6 h-6 relative`}>
        <Icon name="notifications" size={24} color="#979797" />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-[#979797] text-sm font-medium`}>
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
