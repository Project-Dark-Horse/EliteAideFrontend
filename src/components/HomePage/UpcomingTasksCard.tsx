import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc'; 

interface CardProps {
  id: number;
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
  iconName: string;
}

const UpcomingTasksCard: React.FC<CardProps> = ({ id, title, description, time, backgroundColor, iconName }) => {
  return (
    <Card style={[tw`rounded-xl mr-2 h-[120px] w-[200px] justify-between`, { backgroundColor }]}>
      <Card.Content style={tw`flex-col py-4 px-3`}>
        <View style={tw`flex-row items-center`}>
          <Ionicons name={iconName} size={15} color="white" style={tw`mr-1`} />
          <Text style={tw`text-white text-sm font-bold`} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <View style={tw`px-1 mt-2`}>
          <Text style={tw`text-gray-200 text-xs font-normal`} numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <Text style={tw`text-[#F8F8F8] text-base font-semibold mt-2 font-sans`}>{time}</Text>
      </Card.Content>
    </Card>
  );
};

export default UpcomingTasksCard;