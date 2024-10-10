import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ToDo from '../screens/HomeScreens/Todo';
import Progress from '../screens/HomeScreens/Progress';
import Done from '../screens/HomeScreens/Done';
import Calender from '../screens/Calender';
import Ai from '../screens/ChatScreen';
import Profile from '../screens/Profile';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const BottomBarStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',  
        },
        headerTintColor: '#fff',  
        headerTitleStyle: {
          fontWeight: 'bold',  
        },
        gestureEnabled: true,  
        gestureDirection: 'horizontal',  
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Calender" component={Calender} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default BottomBarStack;
