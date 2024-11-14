import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/HomeScreen';
import ToDo from '../screens/Home/Todo';
import Progress from '../screens/Home/Progress';
import Done from '../screens/Home/Done';
import TaskAnalysis from '../screens/Tasks/TaskAnalysis';
import NotificationScreen from '../screens/Notification/Notification';
import ManualTaskCreate from '../screens/Ai/ManualTaskCreate';
import MyActivity from '../screens/Profile/MyActivity';
import MyTaskScreen from '../screens/Tasks/MyTaskScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ToDo" component={ToDo} />
      <Stack.Screen name="Progress" component={Progress} />
      <Stack.Screen name="Done" component={Done} />
      <Stack.Screen name="TaskAnalysis" component={TaskAnalysis} options={{ title: 'Progress Overview' }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ManualTaskCreate" component={ManualTaskCreate} options={{ headerShown: false }} />
      <Stack.Screen name="MyActivity" component={MyActivity} options={{ headerShown: false }} />
      <Stack.Screen 
        name="MyTaskScreen"  // This name must match exactly with what you use in navigation.navigate()
        component={MyTaskScreen} 
      />
    </Stack.Navigator>
  );
};

export default HomeStack;