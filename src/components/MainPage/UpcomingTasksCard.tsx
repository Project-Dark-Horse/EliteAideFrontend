import React from 'react';
import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Card, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';  // Import twrnc for styling

interface CardProps {
  id  : number;
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
  iconName: string;
}

const UpcomingTasksCard: React.FC<CardProps> = ({ id, title, description, time, backgroundColor, iconName }) => {
  return (
    <Card style={[tw`rounded-xl mr-2 h-[125px] w-[152px] justify-between`, { backgroundColor }]}>
      {/* Added custom padding (12px on x-axis, 16px on y-axis) */}
      <Card.Content style={tw`flex-col py-4 px-3`}> 
        <View style={tw`flex-row items-center`}>
          <Ionicons name={iconName} size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-sm font-bold`}>{title}</Text>
        </View>
        {/* Removed 'text-center' to align the text to the left */}
      {/* Added custom padding (12px on x-axis, 16px on y-axis) */}
      <Card.Content style={tw`flex-col py-4 px-3`}> 
        <View style={tw`flex-row items-center`}>
          <Ionicons name={iconName} size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-sm font-bold`}>{title}</Text>
        </View>
        {/* Removed 'text-center' to align the text to the left */}
        <View style={tw`px-1`}>
          <Text style={tw`text-white text-xs font-normal mt-2 `}>{description}</Text>
          <Text style={tw`text-white text-xs font-normal mt-2 `}>{description}</Text>
        </View>
        <Text style={tw`text-[#F8F8F8] text-base font-bold mt-2`}>{time}</Text>
        <Text style={tw`text-[#F8F8F8] text-base font-bold mt-2`}>{time}</Text>
      </Card.Content>
    </Card>
  );
};

export default UpcomingTasksCard;
