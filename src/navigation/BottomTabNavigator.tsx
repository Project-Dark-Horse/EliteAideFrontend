import React from 'react';
import { StyleSheet } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import CustomButton from '../components/Button/CustomButton';
import TabBar from './TabBar';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import Ai from '../screens/Ai/AIScreen';
import HomeStack from './HomeStack';
import Header from '../components/CommonHeader';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileStack from './ProfileStack';
import BottomBarStack from './BottomBarStack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type BottomTabNavigatorProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'BottomBarStack'>,
  StackNavigationProp<RootStackParamList>
>;

// Define the RootStackParamList with all possible routes
type RootStackParamList = {
  HomeStackMain: undefined;
  Calendar: undefined;
  Ai: undefined;
  Profile: undefined;
  BottomBarStack: undefined;
  // ... other screens
};

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigatorProp>();

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return <TabBar routeName={routeName} selectedTab={selectedTab} navigate={navigate} />;
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={74}
      circleWidth={60}
      bgColor="#111111"
      initialRouteName="HomeStackMain"
      borderTopLeftRight
      renderCircle={() => (
        <CustomButton onPress={() => {}} />
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="HomeStackMain"
        position="LEFT"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <CurvedBottomBar.Screen
        name="Calendar"
        position="LEFT"
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />
      <CurvedBottomBar.Screen
        name="Ai"
        position="RIGHT"
        component={Ai}
        options={{
          headerShown: false,
        }}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        position="RIGHT"
        component={ProfileStack}
        options={{
          headerShown: false, // This will hide the header
        }}
      />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#222E49',
    shadowOffset: { width: 2, height: -15 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 100,
  },
  bottomBar: {},
});

export default BottomTabNavigator;