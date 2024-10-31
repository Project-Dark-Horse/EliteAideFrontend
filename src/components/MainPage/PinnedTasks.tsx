import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import tw from 'twrnc';
import SeeAllCards from './SeeAllCards';
import { Surface } from 'react-native-paper';
import PinnedTasksCard from './PinnedTasksCard';
import axios from 'axios';
import { BASE_URL } from '@env';
import { AsyncStorage } from 'react-native';

interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
  day: string;
  backgroundColor: string;
  iconName: string;
}

const PinnedTasks: React.FC = () => {
  const [pinnedTasks, setPinnedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPinnedTasks = async () => {
    setLoading(true);
    setError(false);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.get(`${BASE_URL}/v1/tasks/pinned`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPinnedTasks(response.data);
    } catch (err) {
      console.error('Error fetching pinned tasks:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPinnedTasks();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500`}>Failed to load pinned tasks.</Text>
      </View>
    );
  }

  return (
    <Surface style={tw`p-4 bg-[#111111] flex-1`}>
      <SeeAllCards title="Weekly Tasks" onSeeAllPress={() => console.log('See all pressed')} />
      <FlatList
        data={pinnedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PinnedTasksCard
            id={item.id}
            title={item.title}
            description={item.description}
            time={item.time}
            day={item.day}
            backgroundColor={item.backgroundColor}
            iconName={item.iconName}
          />
        )}
        contentContainerStyle={tw`py-2`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={tw`h-3`} />}
      />
    </Surface>
  );
};

export default PinnedTasks;