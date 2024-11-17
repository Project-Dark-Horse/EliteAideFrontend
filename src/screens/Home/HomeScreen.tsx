import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import CustomMessageComponent from '../../components/HomePage/message';
import Tile from '../../components/HomePage/Tile';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../types/navigation';
import UpcomingTasksComponent from '../../components/HomePage/UpcomingTasks';
import PinnedTasks from '../../components/HomePage/PinnedTasks';
import TopNavBar from '../../components/UpperNavBar/TopNavBar';
import GreetingPopup from './GreetingPopup';
import tw from 'twrnc';

import TodoImage from '../../assets/todo.png';
import ProgressImage from '../../assets/progress.png';
import DoneImage from '../../assets/done.png';
import BotImage from '../../assets/bot.png';

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isGreetingVisible, setIsGreetingVisible] = useState(false); // Control overlay visibility
  const [showProgressOverlay, setShowProgressOverlay] = useState(false);
  const completedTasks = 1; // Example value, replace with actual data
  const totalTasks = 10; // Example value, replace with actual data

  const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

  const handleShowGreeting = () => {
    setIsGreetingVisible(true);
  };

  const handleCloseGreeting = () => {
    setIsGreetingVisible(false);
  };

  const ProgressClock = () => {
    const size = 32;
    const strokeWidth = 3;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={tw`absolute right-4 top-25`}>
        <TouchableOpacity 
          onPress={() => setShowProgressOverlay(true)}
          style={tw`relative`}
        >
          <Svg width={size} height={size}>
            <Circle
              stroke="#384766"
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke="#36AAB9"
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
          </Svg>
          <View style={tw`absolute inset-0 items-center justify-center`}>
            <Image source={BotImage} style={{ width: 20, height: 20 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-[#111111] p-4 px-2`}>
      <TopNavBar navigation={undefined} />
      <ProgressClock />
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

      {/* Progress Overlay */}
      <Modal
        visible={showProgressOverlay}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProgressOverlay(false)}
      >
        <TouchableOpacity 
          style={tw`flex-1 bg-black/50 justify-center items-center`}
          activeOpacity={1}
          onPress={() => setShowProgressOverlay(false)}
        >
          <View style={tw`bg-[#1D1E23] p-6 rounded-2xl w-80`}>
            <View style={tw`items-center`}>
              <Svg width={120} height={120}>
                <Circle
                  stroke="#384766"
                  fill="none"
                  cx={60}
                  cy={60}
                  r={54}
                  strokeWidth={8}
                />
                <Circle
                  stroke="#36AAB9"
                  fill="none"
                  cx={60}
                  cy={60}
                  r={54}
                  strokeWidth={8}
                  strokeDasharray={`${339.292} ${339.292}`}
                  strokeDashoffset={339.292 - (progress / 100) * 339.292}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </Svg>
              
              <Text style={tw`text-white text-3xl font-bold mt-4`}>
                {progress}%
              </Text>
              <Text style={tw`text-[#979797] text-lg mt-2`}>
                Total Progress
              </Text>
            </View>

            <View style={tw`mt-6 border-t border-[#384766] pt-4`}>
              <Text style={tw`text-[#F8F8F8] text-sm text-center`}>
                {progress < 30 ? 'Just getting started! Keep going!' :
                 progress < 70 ? 'Great progress! You\'re on track!' :
                 'Almost there! Finish strong!'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <GreetingPopup visible={isGreetingVisible} onClose={handleCloseGreeting} />
    </View>
  );
};

export default Home;