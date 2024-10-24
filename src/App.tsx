import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './components/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import EnterEmail from './screens/EnterEmail';
import Otp from './screens/Otp';
const tasks =[
  {
    id:1,
    title: 'Team Meeting',
    description : 'Group discussion for the new product',
    time: '10 Am',
    icon: 'calender'
  }
]

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="EnterEmail" component={EnterEmail} options={{ headerShown: false }}  />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}  />
        <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}/>
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }}/>

                
       </Stack.Navigator> 
          
        </NavigationContainer>
    </SafeAreaProvider>




  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    
     
  },
});
