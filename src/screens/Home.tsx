import React from 'react';
import { View } from 'react-native';
import CustomMessageComponent from '../components/MainPage/message';
import Tile from '../components/MainPage/Tile';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';
import UpcomingTasksComponent from '../components/MainPage/UpcomingTasks';
import PinnedTasks from '../components/MainPage/PinnedTasks';
import TopNavBar from '../components/UpperNavBar/TopNavBar';
import tw from 'twrnc';

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={tw`flex-1 bg-[#111111] p-4 px-2`}>
      <TopNavBar />
      <CustomMessageComponent />
      <View style={tw`flex-row justify-between mt-2`}>
        <Tile title="To-do" onPress={() => navigation.navigate('ToDo')} />
        <Tile title="Progress" onPress={() => navigation.navigate('Progress')} />
        <Tile title="Done" onPress={() => navigation.navigate('Done')} />
      </View>
      <UpcomingTasksComponent />
      <PinnedTasks />
    </View>
  );
};

export default Home;
