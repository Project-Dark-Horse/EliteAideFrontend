import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  // Navigators
  BottomBarStack: { screen: 'Home' | 'ToDo' | 'Progress' }; // Dynamic stack support

  // Main Screens
  NotificationScreen: undefined;
  Home: undefined;
  ToDo: undefined;
  Progress: undefined;
  Done: undefined;
  ChatScreen: undefined;
  BottomTabNavigator: undefined;

  // Profile and Activity Screens
  MyProfile: undefined;
  Calendar: undefined;
  MyActivity: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;

  // Authentication Screens
  WelcomeScreen: undefined;
  EnterEmail: undefined;
  Otp: { email: string };
  SignUp: { email: string; otp: string; key: string };
  Login: undefined;
  ResetPassword: { email: string; otp: string };

  // Forgot Password Steps
  FPEnterEmail: undefined; // Step 1: Enter email
  FPEnterOtp: { email: string }; // Step 2: Enter OTP, requires email
  FPNewPassword: { email: string; otp: string }; // Step 3: Reset password, requires email and OTP

  // Task Screens
  DeleteTaskPopup: { taskId: string };
  MyTasksScreen: undefined; // Consolidated

  // Stacks
  ProfileStack: undefined;

  Notifications: undefined;
};

// Example usage
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type OTPRouteProp = RouteProp<RootStackParamList, 'Otp'>;
export type OTPNavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

// Additional Forgot Password Props
export type FPEnterEmailNavigationProp = StackNavigationProp<RootStackParamList, 'FPEnterEmail'>;
export type FPEnterOtpNavigationProp = StackNavigationProp<RootStackParamList, 'FPEnterOtp'>;
export type FPEnterOtpRouteProp = RouteProp<RootStackParamList, 'FPEnterOtp'>;
export type FPNewPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'FPNewPassword'>;
export type FPNewPasswordRouteProp = RouteProp<RootStackParamList, 'FPNewPassword'>;