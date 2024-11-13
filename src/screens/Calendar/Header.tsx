import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface HeaderProps {
  onCalendarPress: () => void;
  onCreateTaskPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCalendarPress, onCreateTaskPress }) => (
  <View style={styles.headerContainer}>
    {/* Date Section */}
    <TouchableOpacity onPress={onCalendarPress} style={styles.dateContainer}>
      <Text style={styles.dateText}>Today</Text>
      <FontAwesome name="chevron-down" size={16} color="#979797" style={styles.chevronIcon} />
    </TouchableOpacity>

    {/* Create Task Button */}
    <TouchableOpacity onPress={onCreateTaskPress} style={styles.createTaskButton}>
      <Text style={styles.createTaskText}>Create task</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111111',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  chevronIcon: {
    marginLeft: 4,
  },
  createTaskButton: {
    backgroundColor: '#1D1E23',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  createTaskText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default React.memo(Header);