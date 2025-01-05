import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RouteNames = 'HomeStackMain' | 'Calendar' | 'Ai' | 'Profile';

interface TabConfig {
  name: string;
  activeColor: string;
  inactiveColor: string;
  size: number;
}

interface TabBarProps {
  routeName: RouteNames;
  selectedTab: string;
  navigate: (routeName: RouteNames) => void;
}

const TAB_CONFIG: Record<RouteNames, TabConfig> = {
  HomeStackMain: {
    name: 'home',
    activeColor: '#FFFFFF',
    inactiveColor: '#555555',
    size: 24,
  },
  Calendar: {
    name: 'calendar-outline',
    activeColor: '#FFFFFF',
    inactiveColor: '#555555',
    size: 24,
  },
  Ai: {
    name: 'ai',
    activeColor: '#FFFFFF',
    inactiveColor: '#555555',
    size: 27,
  },
  Profile: {
    name: 'person',
    activeColor: '#FFFFFF',
    inactiveColor: '#555555',
    size: 24,
  },
};

const AI_ICON = require('../assets/tabbarai.png') as ImageSourcePropType;

function TabBar({ routeName, selectedTab, navigate }: TabBarProps) {
  const isSelected = routeName === selectedTab;

  const renderIcon = () => {
    if (routeName === 'Ai') {
      return (
        <View style={styles.aiIconContainer}>
          <Image 
            source={AI_ICON} 
            style={[
              styles.iconImage,
              isSelected && { tintColor: '#ffffff' }
            ]} 
          />
        </View>
      );
    }

    const config = TAB_CONFIG[routeName as RouteNames];
    return (
      <Ionicons
        name={config.name}
        size={config.size}
        color={isSelected ? config.activeColor : config.inactiveColor}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}
      activeOpacity={0.7}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
}

TabBar.displayName = 'TabBar';

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  aiIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 20,
  },
  iconImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: '#555555',
  },
});

export default memo(TabBar);