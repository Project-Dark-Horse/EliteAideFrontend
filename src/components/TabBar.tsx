import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabBarProps = {
  routeName: string;
  selectedTab: string;
  navigate: (routeName: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({ routeName, selectedTab, navigate }) => {
  const renderIcon = (): JSX.Element => {
    let icon: string;

    switch (routeName) {
      case 'HomeStackMain':
        icon = 'home';
        break;
      case 'Profile':
        icon = 'person';
        break;
      case 'Calender':
        icon = 'calendar-outline';
        break;
      case 'Ai':
        icon = 'logo-react';
        break;
      default:
        icon = 'alert-circle-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? '#384766' : 'gray'}
      />
    );
  };

  return (
    <TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabbarItem}>
      {renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    
  }
});

export default TabBar;
