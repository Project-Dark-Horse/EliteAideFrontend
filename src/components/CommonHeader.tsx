// src/components/CommonHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import NotificationsComponent from '../components/UpperNavBar/NotificationComponent';

interface HeaderProps {
  title?: string;
  showTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = "Profile", showTitle = true }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
        <Icon name="chevron-back" size={24} color="#65779E" />
      </TouchableOpacity>

      {/* Title */}
      {showTitle && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {/* Right icons (search and notification) */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search-outline" size={24} color="#65779E" />
        </TouchableOpacity>
        <NotificationsComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    backgroundColor: '#111111',
    paddingHorizontal: 10,
    position: 'relative', // Needed for absolute positioning of the title
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute', // Center the title absolutely
    left: '50%',
    transform: [{ translateX: -24 }], // Offset to keep it centered
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 5,
  },
});

export default Header;