import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc'; 

interface CardProps {
  id: number;
  title: string;
  description: string;
  time: string;
  date: string;
  backgroundColor: string;
  iconName: string;
  priority?: number;
  status?: string;
}

const UpcomingTasksCard: React.FC<CardProps> = ({ id, title, description, time, date, backgroundColor, iconName, priority, status }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Card style={[tw`rounded-xl mr-2 h-[120px] w-[200px] justify-between`, { backgroundColor: '#1f1f1f' }]}>
        <Card.Content style={tw`flex-col py-4 px-3`}>
          <View style={tw`flex-row items-center`}>
            <Ionicons name={iconName} size={15} color="#F8F8F8" style={tw`mr-1`} />
            <Text style={tw`text-white text-sm font-bold`} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
          </View>
          <View style={tw`px-1 mt-2`}>
            <Text style={tw`text-gray-400 text-xs font-normal`} numberOfLines={2} ellipsizeMode="tail">
              {description}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mt-2`}>
            <Text style={tw`text-[#F8F8F8] text-xs font-bold font-sans`}>{time}</Text>
            <Text style={tw`text-gray-200 text-xs font-bold`}>{date}</Text>
          </View>
          {priority && <Text style={tw`text-gray-200 text-xs`}>Priority: {priority}</Text>}
          {status && <Text style={tw`text-gray-300 text-xs`}>Status: {status}</Text>}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default UpcomingTasksCard;