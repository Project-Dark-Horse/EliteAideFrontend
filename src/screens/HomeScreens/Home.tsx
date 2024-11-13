import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomMessageComponent from '../../components/HomePage/message';
import Tile from '../../components/HomePage/Tile';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../types/navigation';
import UpcomingTasksComponent from '../../components/HomePage/UpcomingTasks';
import PinnedTasks from '../../components/HomePage/PinnedTasks';
import TopNavBar from '../../components/UpperNavBar/TopNavBar';
import GreetingPopup from '../Tasks/GreetingPopup';
import tw from 'twrnc';

import TodoImage from '../../assets/todo.png';
import ProgressImage from '../../assets/progress.png';
import DoneImage from '../../assets/done.png';

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isGreetingVisible, setIsGreetingVisible] = useState(false); // Control overlay visibility

  const handleShowGreeting = () => {
    setIsGreetingVisible(true);
  };

  const handleCloseGreeting = () => {
    setIsGreetingVisible(false);
  };

  return (
    <View style={tw`flex-1 bg-[#111111] p-4 px-2`}>
      <TopNavBar navigation={undefined} />
      <CustomMessageComponent />

      {/* Task category tiles */}
      <View style={tw`flex-row justify-between mt-2`}>
        <Tile 
          title="To-do"
          onPress={() => navigation.navigate('ToDo')}
          image={TodoImage} 
          backgroundColor=""
        />
        <Tile 
          title="Progress"
          onPress={() => navigation.navigate('Progress')}
          image={ProgressImage} 
          backgroundColor=""
        />
        <Tile 
          title="Done"
          onPress={() => navigation.navigate('Done')}
          image={DoneImage} 
          backgroundColor=""
        />
      </View>

      {/* Wrap UpcomingTasksComponent in TouchableOpacity */}
      <TouchableOpacity onPress={handleShowGreeting}>
        <UpcomingTasksComponent />
      </TouchableOpacity>
      
      <PinnedTasks />

      {/* Render GreetingPopup as overlay when visible */}
      <GreetingPopup visible={isGreetingVisible} onClose={handleCloseGreeting} />
    </View>
  );
};

export default Home;