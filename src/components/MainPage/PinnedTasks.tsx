import React from "react";
import { View, FlatList } from 'react-native';
import tw from 'twrnc';
import SeeAllCards from "./SeeAllCards";
import { Surface } from "react-native-paper";
import PinnedTasksCard from "./PinnedTasksCard";

const PinnedTasksData = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Group discussion for the new product',
    time: '10 AM',
    day: 'Friday',
    backgroundColor: '#1E1E1E',
    iconName: 'people', 
  },
  {
    id: 2,
    title: 'Design Review',
    description: 'Review of the new design prototype',
    time: '2 PM',
    day: 'Friday',
    backgroundColor: '#1E1E1E',
    iconName: 'chatbubble', 
  },
];

const PinnedTasks: React.FC = () => {
  return (
    <Surface style={tw`p-4 bg-[#111111] flex-1`}>
      <SeeAllCards title="Weekly Tasks" onSeeAllPress={() => console.log('See all pressed')} />
      <FlatList
        data={PinnedTasksData}
        keyExtractor={(item) => item.id.toString()}  
        renderItem={({ item }) => (
          <PinnedTasksCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            time={item.time}
            day={item.day}
            backgroundColor={item.backgroundColor}
            iconName={item.iconName}          />
        )}
        contentContainerStyle={tw`py-2`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={tw`h-3`} />}  
      />
    </Surface>
  );
};

export default PinnedTasks;
