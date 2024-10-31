import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import CustomMessageComponent from '../components/MainPage/message';
import Tile from '../components/MainPage/Tile';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';
import UpcomingTasksComponent from '../components/MainPage/UpcomingTasks';
import PinnedTasks from '../components/MainPage/PinnedTasks';
import TopNavBar from '../components/UpperNavBar/TopNavBar';
import tw from 'twrnc';
import axios from 'axios';
import { BASE_URL } from '@env';

import TodoImage from '../assets/todo.png';
import ProgressImage from '../assets/progress.png';
import DoneImage from '../assets/done.png';

interface Task {
  id: string;
  title: string;
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const tiles = [
  { title: "To-do", screen: "ToDo", image: TodoImage },
  { title: "Progress", screen: "Progress", image: ProgressImage },
  { title: "Done", screen: "Done", image: DoneImage },
];

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [pinnedTasks, setPinnedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState({ upcoming: true, pinned: true });
  const [error, setError] = useState({ upcoming: false, pinned: false });

  const fetchUpcomingTasks = async () => {
    setLoading((prev) => ({ ...prev, upcoming: true }));
    setError((prev) => ({ ...prev, upcoming: false }));
    try {
      const response = await api.get('/upcoming-tasks');
      setUpcomingTasks(response.data);
    } catch (err) {
      console.error('Error fetching upcoming tasks:', err);
      setError((prev) => ({ ...prev, upcoming: true }));
    } finally {
      setLoading((prev) => ({ ...prev, upcoming: false }));
    }
  };

  const fetchPinnedTasks = async () => {
    setLoading((prev) => ({ ...prev, pinned: true }));
    setError((prev) => ({ ...prev, pinned: false }));
    try {
      const response = await api.get('/pinned-tasks');
      setPinnedTasks(response.data);
    } catch (err) {
      console.error('Error fetching pinned tasks:', err);
      setError((prev) => ({ ...prev, pinned: true }));
    } finally {
      setLoading((prev) => ({ ...prev, pinned: false }));
    }
  };

  useEffect(() => {
    fetchUpcomingTasks();
    fetchPinnedTasks();
  }, []);

  const renderLoadingOrError = (loadingKey: keyof typeof loading, errorKey: keyof typeof error, retryHandler: () => void, errorMessage: string) => {
    if (loading[loadingKey]) {
      return <ActivityIndicator size="large" color="#FFFFFF" style={tw`mt-4`} />;
    }

    if (error[errorKey]) {
      return (
        <View style={tw`mt-4`}>
          <Text style={tw`text-red-500`}>{errorMessage}</Text>
          <TouchableOpacity onPress={retryHandler} style={tw`mt-2`}>
            <Text style={tw`text-blue-500 underline`}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return null;
  };

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
            image={tile.image}
            backgroundColor={''} 
          />
        ))}
      </View>

      {renderLoadingOrError(
        'upcoming',
        'upcoming',
        fetchUpcomingTasks,
        'Failed to load upcoming tasks.'
      ) || <UpcomingTasksComponent tasks={upcomingTasks} />}

      {renderLoadingOrError(
        'pinned',
        'pinned',
        fetchPinnedTasks,
        'Failed to load pinned tasks.'
      ) || <PinnedTasks tasks={pinnedTasks} />}
    </View>
  );
};

export default Home;