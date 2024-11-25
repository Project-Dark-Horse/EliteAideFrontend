import React from "react";
import { View, Text, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

interface PinnedTasksCardProps {
  id:number;
  title: string;
  description: string;
  day?: string;
  time: string;
  iconName: string;
  backgroundColor: string;

}

const PinnedTasksCard: React.FC<PinnedTasksCardProps> = ({

  id,
  title,
  description,
  day,
  time,
  iconName,
  backgroundColor
  
}) => {
  return (
    <Card style={[tw`rounded-xl border border-[#1D1E23] flex-row items-center mb-3`, { backgroundColor, width: width * 0.87, height: 60 }]}>
      <View style={tw`flex-row justify-between items-center p-3 w-full`}>
        <View style={tw`flex-row items-start`}>
          <View style={tw`relative w-7 h-7 mr-2`}>
            <Ionicons name={iconName} size={24} color="#7CC2E8" />
            <View style={tw`absolute top-0 right-0 w-2 h-2 bg-[#C02B2B] rounded-full`} />
          </View>
          <View>
            <Text style={tw`text-white text-sm font-bold mb-1`}>{title}</Text>
            <Text style={tw`text-[#979797] text-xs font-normal`}>{description}</Text>
          </View>
        </View>
        <View style={tw`flex-1 flex-col items-end`}>
          {day && <Text style={tw`text-white text-sm font-semibold mb-1`}>{day}</Text>}
          <Text style={tw`text-white text-xs font-semibold`}>{time}</Text>
        </View>
      </View>
    </Card>
  );
};

export default PinnedTasksCard;
