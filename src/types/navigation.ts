import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  ToDo: undefined;
  Progress: undefined;
  Done: undefined;
  Login: undefined;
  SignUp: undefined;
  EnterEmail: undefined;
  Otp: { email: string }; 
  BottomTabNavigator: undefined;
  Notifications: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
