import React, { useState } from "react";
import { View, Text, Dimensions } from 'react-native';
import { Card, Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

interface PinnedTasksCardProps {
  id: number;
  title: string;
  description: string;
  day: string; 
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
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Card style={[tw`rounded-xl border border-[#1D1E23] flex-row items-center mb-3`, { backgroundColor, width: width * 0.87, height: 70 }]}>
      <View style={tw`flex-row justify-between items-center p-3 w-full`}>

        <View style={tw`w-1/6 items-center`}>
          <View style={tw`relative w-7 h-7`}>
            <Ionicons name={iconName} size={24} color="#7CC2E8" />
            <View style={tw`absolute top-0 right-0 w-2 h-2 bg-[#C02B2B] rounded-full`} />
          </View>
        </View>

        <View style={tw`w-3/6`}>
          <View style={tw`flex-col`}>
            <Text style={tw`text-white text-sm font-bold mb-1`}>{title}</Text>
            <Text style={tw`text-[#979797] text-xs`}>{description}</Text>
          </View>
        </View>

        <View style={tw`w-2/6 flex-col items-end`}>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#27e0cb"  />
          <View style={tw`flex-row items-end`}>
            {day && <Text style={tw`text-white text-xs font-semibold`}>{day}</Text>}
            <Text style={tw`text-white text-xs font-semibold`}>, {time}</Text>
          </View>
        </View>
        
      </View>
    </Card>
  );
};

export default PinnedTasksCard;
