import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ToDo from '../screens/HomeScreens/Todo';
import Progress from '../screens/HomeScreens/Progress';
import Done from '../screens/HomeScreens/Done';
import Notification from '../screens/NotificationScreen';
// import { useNavigation } from '@react-navigation/native';  // Import navigation hook
// import MyActivity from '../screens/MyActivityScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
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
      <Stack.Screen name="ToDo" component={ToDo} />
      <Stack.Screen name="Progress" component={Progress} />
      <Stack.Screen name="Done" component={Done} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default HomeStack;
