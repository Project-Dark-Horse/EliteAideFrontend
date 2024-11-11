import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface Notification {
  id: number;
  icon: string;
  title: string;
  description: string;
  type: 'task' | 'warning' | 'success' | 'info';
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, icon: 'document-text', title: "Your task 'Submit monthly report' is due in 1 hour! Don't forget!", description: '', type: 'task' },
    { id: 2, icon: 'calendar', title: "Uh-oh! The 'Budget review' task is overdue. Let's tackle it!", description: '', type: 'warning' },
    { id: 3, icon: 'checkmark-circle', title: "Your task 'Submit invoice' has been automatically completed. No action needed!", description: '', type: 'success' },
    { id: 4, icon: 'moon', title: "You've completed 4 tasks today! Great job! Check tomorrow's tasks for a head start.", description: '', type: 'info' },
    { id: 5, icon: 'document-text', title: "Your task 'Submit monthly report' is due in 1 hour! Don't forget!", description: '', type: 'task' }
  ]);

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'task': return '#007AFF';
      case 'warning': return '#FFD60A';
      case 'success': return '#34C759';
      case 'info': return '#5856D6';
      default: return '#646464';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        {/* Icon with Gradient Background */}
        <LinearGradient
          colors={['#3272A0', '#3272A0', '#1E4E8D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBackground}
        >
          <Icon name={item.icon} size={24} color="#FFFFFF" />
        </LinearGradient>
        
        {/* Text Content */}
        <View style={styles.textContainer}>
          <Title style={styles.title}>{item.title}</Title>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  list: {
    padding: 10,
  },
  card: {
    marginTop: 15,
    backgroundColor: '#1D1E23',
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default NotificationScreen;