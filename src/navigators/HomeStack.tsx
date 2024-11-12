import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/HomeScreens/Home';
import ToDo from '../screens/HomeScreens/Todo';
import Progress from '../screens/HomeScreens/Progress';
import Done from '../screens/HomeScreens/Done';
import TaskAnalysis from '../screens/Tasks/TaskAnalysis';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ToDo" component={ToDo} />
      <Stack.Screen name="Progress" component={Progress} />
      <Stack.Screen name="Done" component={Done} />
      <Stack.Screen name="TaskAnalysis" component={TaskAnalysis} options={{ title: 'Progress Overview' }} />
    </Stack.Navigator>
  );
};

export default HomeStack;