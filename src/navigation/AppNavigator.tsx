import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyTaskScreen from '../screens/MyTasks/MyTasksScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MyTaskScreen" 
        component={MyTaskScreen} 
      />
      {/* ... other screens ... */}
    </Stack.Navigator>
  );
}; 