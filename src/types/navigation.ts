import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BottomBarStack: { screen: string };
  Home: undefined;
  ToDo: undefined;
  Progress: undefined;
  Done: undefined;
  ChatScreen: undefined;
  Notification: undefined;
  BottomTabNavigator: undefined;
  MyProfile: undefined;
  Calendar: undefined;
  MyTask: undefined; // Add this line
  MyActivity: undefined; // Add this line
  WelcomeScreen: undefined;
  EnterEmail: undefined;  // No parameters expected
  Otp: { email: string }; // Otp screen expects an 'email' parameter
  SignUp: { email: string; otp: string; key: string }; // SignUp screen expects 'email', 'otp', and 'key'
  Login: undefined; // N
  ForgotPassword: undefined; 
  ProfileScreen: undefined;
  MyActivityScreen: undefined;
  SettingsScreen: undefined;
  ProfileStack: undefined;
  ManualTaskCreate: undefined;
  DeleteTaskPopup: {
    taskId: string;
  };
  MyTaskScreen: undefined;  // Add this line
};


// Example usage in other components
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type OTPRouteProp = RouteProp<RootStackParamList, 'Otp'>;
export type OTPNavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;