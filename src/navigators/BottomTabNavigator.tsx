import React from 'react';
import { StyleSheet } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import CustomButton from '../components/Button/CustomButton';
import TabBar from '../components/TabBar';
import Profile from '../screens/Profile/ProfileScreen';
import CalendarScreen from '../screens/Calendar/Calendar';
import Ai from '../screens/Ai/Ai';
import HomeStack from './HomeStack';
import Header from '../components/CommonHeader';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import ProfileStack from './ProfileStack';

// Define the navigation type for nested navigation
type BottomTabNavigatorProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'BottomBarStack'>,
  StackNavigationProp<RootStackParamList>
>;

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
        // Navigate with nested params to "BottomBarStack" and target "ManualTaskCreate"
        <CustomButton onPress={() => navigation.navigate('BottomBarStack', { screen: 'ManualTaskCreate' })} />
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
          header: () => <Header title="Calendar" showTitle={false} />,
        }}
      />
      <CurvedBottomBar.Screen
        name="Ai"
        position="RIGHT"
        component={Ai}
        options={{
          header: () => <Header title="Let’s get things done!" showTitle={false} />,
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