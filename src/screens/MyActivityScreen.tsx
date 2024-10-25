import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface Activity {
  id: number;
  time: string;
  description: string;
  type: 'add' | 'complete' | 'delete' | 'reschedule' | 'modify';
}

const MyActivityScreen: React.FC = () => {
  const activities: Activity[] = [
    { id: 1, time: '12 AM', description: "You added a new task: 'Prepare project proposal' on Sep 12.", type: 'add' },
    { id: 2, time: '12 AM', description: "Task 'Upload documents to drive' was automatically completed on Sep 16.", type: 'complete' },
    { id: 3, time: '12 AM', description: "Task 'Research competitors' was deleted on Sep 11.", type: 'delete' },
    { id: 4, time: '12 AM', description: "Task 'Submit tax forms' is now rescheduled for Sep 23.", type: 'reschedule' },
    { id: 5, time: '12 AM', description: "Update marketing plan' was modified. Priority changed to High.", type: 'modify' },
    { id: 6, time: '12 AM', description: "Task 'Upload documents to drive' was automatically completed on Sep 16.", type: 'complete' },
    { id: 7, time: '12 AM', description: "Task 'Research competitors' was deleted on Sep 11.", type: 'delete' },
    { id: 8, time: '12 AM', description: "Task 'Submit tax forms' is now rescheduled for Sep 23.", type: 'reschedule' },
  ];

  const getIconName = (type: Activity['type']) => {
    switch (type) {
      case 'add': return 'add-circle-outline';
      case 'complete': return 'checkmark-circle-outline';
      case 'delete': return 'trash-outline';
      case 'reschedule': return 'calendar-outline';
      case 'modify': return 'create-outline';
      default: return 'information-circle-outline';
    }
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={styles.activityCard}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Icon name={getIconName(item.type)} size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  listContent: {
    padding: 18,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#1D1E23',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  timeContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#2C2C2E',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  time: {
    color: '#8E8E93',
    fontSize: 12,
  },
  icon: {
    marginRight: 12,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
});

export default MyActivityScreen;