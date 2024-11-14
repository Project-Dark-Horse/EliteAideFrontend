// src/screens/Notification/NotificationScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../../components/CommonHeader';


interface Notification {
  id: number;
  icon: string;
  title: string;
  type: 'task' | 'warning' | 'success' | 'info';
  emoji?: string;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, icon: 'calendar', title: "Your task 'Submit monthly report' is due in 1 hour! Don't forget!", type: 'task', emoji: '⏳' },
    { id: 2, icon: 'calendar', title: "Uh-oh! The 'Budget review' task is overdue. Let's tackle it!", type: 'warning', emoji: '⚠️' },
    { id: 3, icon: 'document-text', title: "Your task 'Submit invoice' has been automatically completed. No action needed!", type: 'success' },
    { id: 4, icon: 'chatbubble', title: "You've completed 4 tasks today! Great job! Check tomorrow's tasks for a head start", type: 'info', emoji: '🌙' },
    { id: 5, icon: 'document-text', title: "Your task 'Submit monthly report' is due in 1 hour! Don't forget!", type: 'task', emoji: '⏳' }
  ]);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'task':
        return ['#2C2C2E', '#2C2C2E'];
      case 'warning':
        return ['#2C2C2E', '#2C2C2E'];
      case 'success':
        return ['#2C2C2E', '#2C2C2E'];
      case 'info':
        return ['#2C2C2E', '#2C2C2E'];
      default:
        return ['#2C2C2E', '#2C2C2E'];
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Icon name={item.icon} size={20} color="#3272A0" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {item.emoji && `${item.emoji} `}{item.title}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Notifications" showTitle={true} showNotificationIcon={false} />
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
    backgroundColor: '#000000',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 8,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    elevation: 0,
    borderWidth: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    opacity: 0.8,
    fontWeight: '400',
  },
});

export default NotificationScreen;