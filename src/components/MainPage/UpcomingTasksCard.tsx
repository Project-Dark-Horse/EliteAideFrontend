import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';  // Import twrnc for styling

interface CardProps {
  id: number;
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
  iconName: string;
}

const UpcomingTasksCard: React.FC<CardProps> = ({ id, title, description, time, backgroundColor, iconName }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Card style={[tw`rounded-xl mr-2 h-[125px] w-[152px] justify-between`, { backgroundColor }]}>
      <Card.Content style={tw`flex-col py-4 px-3`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <Ionicons name={iconName} size={20} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white text-sm font-bold`}>{title}</Text>
          </View>
          {/* Add the toggle switch */}
        </View>
        <View style={tw`px-1`}>
          <Text style={tw`text-white text-xs font-normal mt-2`}>{description}</Text>
        </View>
        <View style={tw`flex-row items-center justify-between mt-2`}>
          <Text style={tw`text-[#F8F8F8] text-base font-bold`}>{time}</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#27e0cb" />

        </View>
      </Card.Content>
    </Card>
  );
};

export default UpcomingTasksCard;
