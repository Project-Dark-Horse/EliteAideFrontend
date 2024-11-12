// BottomTabNavigator.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import CustomButton from '../components/Button/CustomButton';
import TabBar from '../components/TabBar';
import Profile from '../screens/Profile/ProfileScreen';
import CalendarScreen from '../screens/Calendar/Calendar';
import Ai from '../screens/Ai/Ai';
import HomeStack from './HomeStack';
import Header from '../components/CommonHeader'; // Import the custom Header component

const BottomTabNavigator: React.FC = () => {
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
      renderCircle={({ selectedTab, navigate }) => <CustomButton onPress={function (): void {
        throw new Error('Function not implemented.');
      } } />}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen 
      name="HomeStackMain" 
      position="LEFT" 
      component={HomeStack} 
      options={{ 
      headerShown: false  
  }} 
/>
      <CurvedBottomBar.Screen 
        name="Calendar" 
        position="LEFT" 
        component={CalendarScreen} 
        options={{ 
          header: () => <Header title="Calendar" showTitle={false} />
        }} 
      />
      <CurvedBottomBar.Screen 
        name="Ai" 
        position="RIGHT" 
        component={Ai} 
        options={{ 
          header: () => <Header title="Let’s get things done!" showTitle={false} />
        }} 
      />
      <CurvedBottomBar.Screen 
        name="Profile" 
        position="RIGHT" 
        component={Profile} 
        options={{ 
          header: () => <Header title="Profile" showTitle={true} />
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