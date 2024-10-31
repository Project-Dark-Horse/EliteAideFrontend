import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabBarProps = {
  routeName: string;
  selectedTab: string;
  navigate: (routeName: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({ routeName, selectedTab, navigate }) => {
  const renderIcon = (): JSX.Element => {
    switch (routeName) {
      case 'HomeStackMain':
        return <Ionicons name="home" size={24} color={selectedTab === 'HomeStackMain' ? '#384766' : '#555555'} />;
      case 'Calendar':
        return <Ionicons name="calendar-outline" size={24} color={selectedTab === 'Calendar' ? '#65779E' : '#555555'} />;
      case 'Ai':
        return (
          <View style={styles.aiIconContainer}>
            <Image source={require('../assets/tabbarai.png')} style={styles.iconImage} />
          </View>
        );
      case 'Profile':
        return <Ionicons name="person" size={24} color={selectedTab === 'Profile' ? '#555555' : '#555555'} />;
      default:
        return <Ionicons name="alert-circle-outline" size={24} color="gray" />;
    }
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
    justifyContent: 'center',
  },
  aiIconContainer: {
    alignItems: 'center',
    justifyContent: 'center', // "off grey" color for border
    padding: 6,
  },
  iconImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});

export default TabBar;