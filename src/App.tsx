import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BottomTabNavigator from './components/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import OTPVerificationScreen from './screens/OTPVerificationScreen';
import EmailScreen from './screens/EmailScreen';
import TopNavBar from './components/UpperNavBar/TopNavBar';
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
      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
                
      </Stack.Navigator> */}
          <StatusBar backgroundColor="#111111" barStyle="light-content" />
          <View style={styles.container}>
              <BottomTabNavigator />
          </View>
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
