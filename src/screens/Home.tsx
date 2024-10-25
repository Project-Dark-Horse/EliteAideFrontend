import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';
import Tile from '../components/MainPage/Tile';
import TopNavBar from '../components/UpperNavBar/TopNavBar';
import axios from 'axios';
import tw from 'twrnc';

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

  const tiles = [
    { title: "To-do", screen: "ToDo" },
    { title: "Progress", screen: "Progress" },
    { title: "Done", screen: "Done" },
  ];

  return (
    <View style={tw`flex-1 bg-[#111111] p-4 px-2`}>
      <TopNavBar />

      {/* Tiles for navigation */}
      <View style={tw`flex-row justify-between mt-2`}>
        {tiles.map((tile, index) => (
          <Tile key={index} title={tile.title} onPress={() => navigation.navigate(tile.screen)} />
        ))}
      </View>

      {/* Upcoming Tasks Section */}
      <Text style={tw`text-white text-lg mt-4 mb-2`}>Upcoming Tasks</Text>
      {loadingUpcoming ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : errorUpcoming ? (
        <Text style={tw`text-red-500`}>Failed to load upcoming tasks</Text>
      ) : (
        <View style={tw`mt-2`}>
          {upcomingTasks.map((task) => (
            <View key={task.id} style={tw`p-2 bg-gray-800 rounded-lg mb-2`}>
              <Text style={tw`text-white`}>{task.title}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Pinned Tasks Section */}
      <Text style={tw`text-white text-lg mt-4 mb-2`}>Pinned Tasks</Text>
      {loadingPinned ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : errorPinned ? (
        <Text style={tw`text-red-500`}>Failed to load pinned tasks</Text>
      ) : (
        <View style={tw`mt-2`}>
          {pinnedTasks.map((task) => (
            <View key={task.id} style={tw`p-2 bg-gray-800 rounded-lg mb-2`}>
              <Text style={tw`text-white`}>{task.title}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Home;