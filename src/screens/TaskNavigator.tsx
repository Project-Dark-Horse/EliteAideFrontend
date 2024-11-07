import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateTaskScreen from '../screens/Tasks/CreateTask';

const Stack = createStackNavigator();

const TaskNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#121212' }
      }}
    >
      <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
    </Stack.Navigator>
  );
};

export default TaskNavigator;