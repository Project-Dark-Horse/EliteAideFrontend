// src/screens/Notification/NotificationScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../../components/CommonHeader';


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

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <LinearGradient
          colors={['#3272A0', '#3272A0', '#1E4E8D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBackground}
        >
          <Icon name={item.icon} size={24} color="#FFFFFF" />
        </LinearGradient>
        
        <View style={styles.textContainer}>
          <Title style={styles.title}>{item.title}</Title>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Common Header with Title and Back Button, without Notification Icon */}
      <CommonHeader title="Notifications" showTitle={true} showNotificationIcon={false} />
      

      {/* Notifications List */}
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