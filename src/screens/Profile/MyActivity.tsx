import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={styles.activityCard}>
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          {item.type === 'add' && '📝 '}
          {item.type === 'delete' && '🗑️ '}
          {item.type === 'reschedule' && '⏰ '}
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Activity</Text>
      </View>
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
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listContent: {
    padding: 16,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
  },
  time: {
    color: '#3272A0',
    fontSize: 14,
    width: 55,
  },
  contentContainer: {
    flex: 1,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 15,
    opacity: 0.8,
  },
});

export default MyActivityScreen;