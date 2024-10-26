import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import CustomButton from './CustomButton';
import TabBar from './TabBar';
import Profile from '../screens/MyProfile';
import CalendarScreen from '../screens/Calendar';
import Ai from '../screens/Ai';
import HomeStack from '../navigators/HomeStack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationsComponent from './UpperNavBar/NotificationComponent';

const BottomTabNavigator: React.FC = () => {
  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return <TabBar routeName={routeName} selectedTab={selectedTab} navigate={navigate} />;
  };
  
  const navigation = useNavigation();
  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={74}
      circleWidth={65} // Adjust circle width
      bgColor="#111111"
      initialRouteName="HomeStackMain"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => <CustomButton />}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen name="HomeStackMain" position="LEFT" component={HomeStack} options={{ headerShown: false }} />
      <CurvedBottomBar.Screen name="Calendar" position="LEFT" component={CalendarScreen} options={{ headerShown: false }} />
      <CurvedBottomBar.Screen name="Ai" position="RIGHT" component={Ai} options={{ headerShown: false }} />
      <CurvedBottomBar.Screen name="Profile" position="RIGHT" component={Profile} options={{
        headerShown: true,
        headerTitle: 'Profile',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={20} color="white" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <NotificationsComponent />
        ),
        headerStyle: {
          height: 55,
          backgroundColor: '#111111',
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
      }} />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#222E49',
    shadowOffset: {
      width: 2,
      height: -15,
    },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 100,
  },
  bottomBar: {},
  backButton: {
    marginLeft: 15,
  },
  backButtonText: {
    color: '#F8F8F8',
  }
});

export default BottomTabNavigator;