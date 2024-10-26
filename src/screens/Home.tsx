import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomMessageComponent from '../components/MainPage/message';
import Tile from '../components/MainPage/Tile';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';
import UpcomingTasksComponent from '../components/MainPage/UpcomingTasks';
import PinnedTasks from '../components/MainPage/PinnedTasks';
import TopNavBar from '../components/UpperNavBar/TopNavBar';
import tw from 'twrnc';
import axios from 'axios';

// Import images from assets folder
import TodoImage from '../assets/todo.png';
import ProgressImage from '../assets/progress.png';
import DoneImage from '../assets/done.png';

interface Task {
  id: string;
  title: string;
}

const api = axios.create({
  baseURL: 'https://api.eliteaide.tech/', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [pinnedTasks, setPinnedTasks] = useState<Task[]>([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingPinned, setLoadingPinned] = useState(true);
  const [errorUpcoming, setErrorUpcoming] = useState(false);
  const [errorPinned, setErrorPinned] = useState(false);

  // Fetch Upcoming Tasks
  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      setLoadingUpcoming(true);
      setErrorUpcoming(false);
      try {
        const response = await api.get('/upcoming-tasks');
        setUpcomingTasks(response.data);
      } catch (error) {
        setErrorUpcoming(true);
      } finally {
        setLoadingUpcoming(false);
      }
    };
    fetchUpcomingTasks();
  }, []);

  // Fetch Pinned Tasks
  useEffect(() => {
    const fetchPinnedTasks = async () => {
      setLoadingPinned(true);
      setErrorPinned(false);
      try {
        const response = await api.get('/pinned-tasks');
        setPinnedTasks(response.data);
      } catch (error) {
        setErrorPinned(true);
      } finally {
        setLoadingPinned(false);
      }
    };
    fetchPinnedTasks();
  }, []);

  // Define tiles with titles, screens, and images
  const tiles = [
    { title: "To-do", screen: "ToDo", image: TodoImage },
    { title: "Progress", screen: "Progress", image: ProgressImage },
    { title: "Done", screen: "Done", image: DoneImage },
  ];

  return (
    <View style={tw`flex-1 bg-[#111111] p-4 px-2`}>
      <TopNavBar />
      <CustomMessageComponent />
      <View style={tw`flex-row justify-between mt-2`}>
        {tiles.map((tile, index) => (
          <Tile 
            key={index}
            title={tile.title}
            onPress={() => navigation.navigate(tile.screen)}
            image={tile.image} // Pass image prop to Tile
            backgroundColor={''}          />
        ))}
      </View>
      <UpcomingTasksComponent />
      <PinnedTasks />
    </View>
  );
};

export default Home;