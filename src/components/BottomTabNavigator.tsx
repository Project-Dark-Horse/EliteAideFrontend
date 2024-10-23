import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import CustomButton from './CustomButton';
import TabBar from './TabBar';
import Profile from '../screens/Profile';
import Calender from '../screens/Calender';
import ChatScreen from '../screens/ChatScreen';
import HomeStack from '../navigators/HomeStack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationsComponent from './UpperNavBar/NotificationComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

const BottomTabNavigator: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => (
    <TabBar routeName={routeName} selectedTab={selectedTab} navigate={navigate} />
  );

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const renderHeaderLeft = () => (
    <TouchableOpacity style={styles.backButton} onPress={navigateToHome}>
      <Icon name="chevron-back" size={20} color="white" />
    </TouchableOpacity>
  );

  const renderHeaderRight = () => <NotificationsComponent />;

  const headerOptions = {
    headerShown: true,
    headerLeft: renderHeaderLeft,
    headerRight: renderHeaderRight,
    headerStyle: {
      height: 55,
      backgroundColor: '#111111',
      shadowColor: 'transparent',
      
    },
    headerTintColor: '#fff',
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={74}
      circleWidth={58}
      bgColor="#111111"
      initialRouteName="HomeStackMain"
      borderTopLeftRight
      renderCircle={() => <CustomButton />}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="HomeStackMain"
        position="LEFT"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <CurvedBottomBar.Screen
        name="Calender"
        position="LEFT"
        component={Calender}
        options={{ headerShown: false }}
      />
      <CurvedBottomBar.Screen
        name="ChatScreen"
        position="RIGHT"
        component={ChatScreen}
        options={{
          ...headerOptions,
          headerShown: true,
          headerTitle: ''
        }}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        position="RIGHT"
        component={Profile}
        options={{
          ...headerOptions,
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
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
});

export default BottomTabNavigator;
