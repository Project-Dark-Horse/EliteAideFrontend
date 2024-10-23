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
import NotificationScreen from './screens/NotificationScreen'; // Add this
import CalendarScreen from './screens/CalendarScreen'; // Import the new CalendarScreen
import Login from './screens/Login';
import MyActivityScreen from './screens/MyActivityScreen';
import SignUp from './screens/SignUp';
import EnterEmail from './screens/EnterEmail';
import Otp from './screens/Otp';
import MyTaskScreen from './screens/MyTaskScreen';
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="EnterEmail" component={EnterEmail} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
          <Stack.Screen name="Email" component={EmailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MyTaskScreen" component={MyTaskScreen}
          options={{
                                  headerShown: true,
                                  headerTitle: 'My Tasks',
                                  headerTitleAlign: 'center',
                                  headerStyle: {
                                          backgroundColor: '#111111', // Customize header background color
                                          elevation: 0, // Remove border line on Android
                                          shadowOpacity: 0, // Remove border line on iOS
                                        },
                                  headerTintColor: '#fff', // Customize header text color
                                  }}/>
          <Stack.Screen name="MyActivityScreen" component={MyActivityScreen}
          options={{
                        headerShown: true,
                        headerTitle: 'My Activity',
                        headerTitleAlign: 'center',
                        headerStyle: {
                                backgroundColor: '#111111', // Customize header background color
                                elevation: 0, // Remove border line on Android
                                shadowOpacity: 0, // Remove border line on iOS
                              },
                        headerTintColor: '#fff', // Customize header text color
                        }}/>
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{
              headerShown: true,
              headerTitle: 'Notifications',
              headerTitleAlign: 'center',
              headerStyle: {
                      backgroundColor: '#111111', // Customize header background color
                      elevation: 0, // Remove border line on Android
                      shadowOpacity: 0, // Remove border line on iOS
                    },
              headerTintColor: '#fff', // Customize header text color
              }}/>
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