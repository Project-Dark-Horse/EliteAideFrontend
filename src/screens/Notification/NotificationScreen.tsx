import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import { BASE_URL } from '@env';
import CommonHeader from '../../components/CommonHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import BottomBarStack from '../../navigation/BottomBarStack';
import { Swipeable } from 'react-native-gesture-handler';
import { groupBy } from 'lodash';
// Add logging utility
const log = (message: string, data?: any) => {
  console.log(`[NotificationScreen] ${message}`, data || '');
};

// Types
interface Notification {
  id: number;
  task?: number;
  notification_type: 'task' | 'warning' | 'success' | 'info' | 'due_date';
  notification_status: 'pending' | 'read' | 'deleted';
  notification_message: string;
  created_at: string;
  isUnread?: boolean;
}

interface ApiError {
  message: string;
  status: number;
}

interface ApiResponse {
  data: Notification[];
  status: number;
}

// Function to format the date
const formatDate = (dateString: string) => {
  console.log('Original date string:', dateString);
  const date = new Date(dateString);
  const formattedDate = format(date, "do MMM yyyy 'at' h a");
  console.log('Formatted date:', formattedDate);
  return formattedDate;
};

// Add new helper function
const groupNotificationsByDate = (notifications: Notification[]) => {
  return groupBy(notifications, (notification) => {
    const date = new Date(notification.created_at);
    return format(date, 'yyyy-MM-dd');
  });
};

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([
    // Default notifications
    {
      id: 0,
      task: undefined,
      notification_type: 'info',
      notification_status: 'read',
      notification_message: 'Welcome to the notification center!',
      created_at: new Date().toISOString(),
    },
    {
      id: 1,
      task: undefined,
      notification_type: 'success',
      notification_status: 'read',
      notification_message: 'Your profile has been updated successfully.',
      created_at: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API calls
  const fetchNotifications = async () => {
    log('Fetching notifications');
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        log('No access token found');
        navigation.navigate('Login' as never);
        return;
      }

      const url = `${BASE_URL.replace(/\/+$/, '')}/v1/notifications/`;
      log('Fetch URL:', url);
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const [notificationsData, statusCode] = response.data;
      log('API Response:', notificationsData);
      setNotifications(notificationsData.length > 0 ? notificationsData : notifications);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        log('API Error:', {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers
        });

        if (err.response?.status === 401) {
          navigation.navigate('Login' as never);
          setError('Session expired. Please login again.');
        } else {
          setError('Failed to fetch notifications');
          Alert.alert('Error', 'Failed to load notifications');
        }
      } else {
        log('Non-API Error:', err);
        //setError('An unexpected error occurred');
        //Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notificationId: number) => {
    log('Attempting to delete notification:', notificationId);
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => log('Delete cancelled for notification:', notificationId)
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('access_token');
              if (!token) {
                log('No access token found');
                navigation.navigate('Login' as never);
                return;
              }

              const url = `${BASE_URL.replace(/\/+$/, '')}/notifications/${notificationId}`;
              log('Delete URL:', url);
              
              await axios.delete(url, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              
              log('Successfully deleted notification:', notificationId);
              setNotifications(prev => 
                prev.filter(notif => notif.id !== notificationId)
              );
            } catch (err) {
              log('Error deleting notification:', err);
              if (axios.isAxiosError(err) && err.response?.status === 401) {
                navigation.navigate('Login' as never);
              } else {
                Alert.alert('Error', 'Failed to delete notification');
              }
            }
          }
        }
      ]
    );
  };

  const markAsRead = async (notificationId: number) => {
    log('Marking notification as read:', notificationId);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        log('No access token found');
        navigation.navigate('Login' as never);
        return;
      }

      const url = `${BASE_URL.replace(/\/+$/, '')}/notifications/${notificationId}`;
      log('Mark as read URL:', url);
      
      await axios.patch(url, 
        {
          notification_status: 'read'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      log('Successfully marked notification as read:', notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, notification_status: 'read' }
            : notif
        )
      );
    } catch (err) {
      log('Error marking notification as read:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        navigation.navigate('Login' as never);
      } else {
        Alert.alert('Error', 'Failed to mark notification as read');
      }
    }
  };

  const handleRefresh = async () => {
    log('Refreshing notifications');
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  useEffect(() => {
    log('Component mounted, fetching initial notifications');
    fetchNotifications();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "do MMM yyyy 'at' h a");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'due_date':
        return 'event';
      case 'reminder':
        return 'notifications';
      default:
        return 'info';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'due_date':
        return '#3272A0'; 
      case 'reminder':
        return '#4682B4'; 
      default:
        return '#696969'; 
    }
  };

  // Add new renderSwipeableNotification function
  const renderSwipeableNotification = ({ item }: { item: Notification }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => handleDelete(item.id)}
      >
        <Icon name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={() => markAsRead(item.id)}>
          <Card style={[styles.card, item.isUnread && styles.unreadCard]}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Icon 
                  name={getNotificationIcon(item.notification_type)} 
                  size={24} 
                  color={getNotificationColor(item.notification_type)} 
                />
                {item.isUnread && <View style={styles.unreadDot} />}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.title, item.isUnread && styles.unreadText]}>
                  {item.notification_message}
                </Text>
                <Text style={styles.date}>
                  {formatDate(item.created_at)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  // Replace existing renderEmpty with enhanced version
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="notifications-off" size={80} color="#3272A0" />
      <Text style={styles.emptyTitle}>No Notifications Yet</Text>
      <Text style={styles.emptySubtitle}>
        We'll notify you when something important happens
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader 
        title="Notifications" 
        showTitle={true} 
        showNotificationIcon={false} 
      />
      {loading && !refreshing ? (
        <View style={styles.skeletonContainer}>
          {[1, 2, 3].map((key) => (
            <View key={key} style={styles.skeletonCard}>
              <View style={styles.skeletonIcon} />
              <View style={styles.skeletonContent}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonDate} />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderSwipeableNotification}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          contentContainerStyle={
            notifications.length === 0 ? styles.emptyList : styles.listContent
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={renderEmpty}
        />
      )}
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
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 8,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    elevation: 0,
    borderWidth: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.9,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 12,
  },
  date: {
    color: '#AAAAAA',
    fontSize: 14,
    marginTop: 4,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#3272A0',
  },
  unreadText: {
    fontWeight: '600',
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3272A0',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  deleteAction: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
  },
  skeletonContainer: {
    padding: 16,
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  skeletonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#333333',
    marginRight: 12,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonTitle: {
    height: 16,
    backgroundColor: '#333333',
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonDate: {
    height: 12,
    backgroundColor: '#333333',
    borderRadius: 6,
    width: '40%',
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default React.memo(NotificationScreen);