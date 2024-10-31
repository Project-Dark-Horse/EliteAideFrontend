// UpcomingTasks.tsx
import React from "react";
import { View, FlatList } from 'react-native';
import SeeAllCards from "./SeeAllCards";
import { Surface } from "react-native-paper";
import UpcomingTasksCard from "./UpcomingTasksCard";
import tw from 'twrnc';

const UpcomingTasks = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Group discussion for the new product',
    time: '10 AM',
    backgroundColor: '#4956C7',
    iconName: 'people', 
  },
  {
    id: 2,
    title: 'Design Review',
    description: 'Review of the new design prototype',
    time: '2 PM',
    backgroundColor: '#3C8FA9',
    iconName: 'chatbubble', 
  },
  {
    id: 3,
    title: 'Code Review',
    description: 'Review of the recent code changes',
    time: '4 PM',
    backgroundColor: '#3D83AA',
    iconName: 'notifications', 
  },
];

const UpcomingTasksComponent: React.FC = () => {
  return (
    <Surface style={tw`p-4 bg-[#111111]`}>
      <SeeAllCards title="Upcoming Tasks" onSeeAll={() => console.log('See all pressed')} />
      <FlatList 
        horizontal
        data={UpcomingTasks}
        keyExtractor={(item) => item.id.toString()}  // Convert id to string
        renderItem={({ item }) => (
          <UpcomingTasksCard
            id={item.id}
            title={item.title}
            description={item.description}
            time={item.time}
            backgroundColor={item.backgroundColor}
            iconName={item.iconName}
          />
        )}
        contentContainerStyle={tw`py-1`}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={tw`w-3`} />}  
      />
    </Surface>
  );
};

export default UpcomingTasksComponent;