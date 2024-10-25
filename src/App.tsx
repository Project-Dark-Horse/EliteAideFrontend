import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login';
import EnterEmail from './screens/EnterEmail';
import SignUp from './screens/SignUp';
import NotificationScreen from './screens/NotificationScreen';
import CalendarScreen from './screens/CalendarScreen';
import MyActivityScreen from './screens/MyActivityScreen';
import Otp from './screens/Otp';
import MyTaskScreen from './screens/MyTaskScreen';
import BottomTabNavigator from './components/BottomTabNavigator';
import { RootStackParamList } from '../src/types/navigation'; // Import RootStackParamList
import WelcomeScreen from './screens/WelcomeScreen';



const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="EnterEmail" component={EnterEmail} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
          <Stack.Screen 
            name="MyTaskScreen" 
            component={MyTaskScreen}
            options={{
              headerShown: true,
              headerTitle: 'My Tasks',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#111111',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="MyActivityScreen" 
            component={MyActivityScreen}
            options={{
              headerShown: true,
              headerTitle: 'My Activity',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#111111',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="NotificationScreen" 
            component={NotificationScreen} 
            options={{
              headerShown: true,
              headerTitle: 'Notifications',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#111111',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}