import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import { BASE_URL } from '@env';
import CommonHeader from '../../components/CommonHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
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

// Constants for notification visibility
const NOTIFICATION_VISIBILITY_DAYS = 7; // Show notifications from last 7 days
const NOTIFICATION_ARCHIVE_KEY = 'hidden_notification_ids';

// Add this helper function to get the read status icon
const getReadStatusIcon = (notification: Notification) => {
  if (notification.notification_status === 'read') {
    return 'checkmark-done-outline'; // Double tick for read
  }
  return 'checkmark-outline'; // Single tick for unread
};

// Update the navigation type at the top of the component
type NavigationParams = {
  TaskDetails: { taskId: number };
};

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<NavigationParams>>();
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hiddenNotificationIds, setHiddenNotificationIds] = useState<string[]>([]);
  const [showArchived, setShowArchived] = useState(false);

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

  const handleDelete = async (notificationId: string) => {
    try {
      await axios.delete(`${BASE_URL}/notifications/${parseInt(notificationId)}`);
      setNotifications(prev => prev.filter(n => n.id.toString() !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, notification_status: 'read' }
          : notif
      )
    );
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
        return 'calendar-outline';
      case 'reminder':
        return 'notifications-outline';
      case 'warning':
        return 'warning-outline';
      case 'success':
        return 'checkmark-circle-outline';
      case 'info':
      default:
        return 'information-circle-outline';
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

  // Load hidden notification IDs on mount
  useEffect(() => {
    loadHiddenNotifications();
  }, []);

  const loadHiddenNotifications = async () => {
    try {
      const hidden = await AsyncStorage.getItem(NOTIFICATION_ARCHIVE_KEY);
      if (hidden) {
        setHiddenNotificationIds(JSON.parse(hidden));
      }
    } catch (error) {
      console.error('Error loading hidden notifications:', error);
    }
  };

  const hideNotification = async (notificationId: string) => {
    try {
      const updatedHiddenIds = [...hiddenNotificationIds, notificationId];
      await AsyncStorage.setItem(NOTIFICATION_ARCHIVE_KEY, JSON.stringify(updatedHiddenIds));
      setHiddenNotificationIds(updatedHiddenIds);
    } catch (error) {
      console.error('Error hiding notification:', error);
    }
  };

  // Filter notifications based on date and hidden status
  const getVisibleNotifications = useCallback(() => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - NOTIFICATION_VISIBILITY_DAYS);

    return notifications.filter(notification => {
      const notificationDate = new Date(notification.created_at);
      const isOld = notificationDate < cutoffDate;
      
      // Show old notifications in archive, recent ones in current view
      return showArchived ? isOld : !isOld;
    });
  }, [notifications, showArchived]);

  // Update the filtered notifications to include date filtering
  const filteredNotifications = useMemo(() => {
    const visible = getVisibleNotifications();
    if (!searchQuery) return visible;
    
    return visible.filter(notification =>
      notification.notification_message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, getVisibleNotifications]);

  // Add hide option to swipe actions
  const renderRightActions = useCallback((notificationId: string) => {
    return (
      <View style={styles.swipeActions}>
        <TouchableOpacity
          style={[styles.swipeAction, styles.hideAction]}
          onPress={() => hideNotification(notificationId)}
        >
          <Ionicons name="eye-off-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.swipeAction, styles.deleteAction]}
          onPress={() => handleDelete(notificationId)}
        >
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }, [handleDelete]);

  // Replace existing renderEmpty with enhanced version
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off-outline" size={80} color="#3272A0" />
      <Text style={styles.emptyTitle}>No Notifications Yet</Text>
      <Text style={styles.emptySubtitle}>
        We'll notify you when something important happens
      </Text>
    </View>
  );

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Add toggle function
  const toggleArchiveView = () => {
    setShowArchived(!showArchived);
  };

  const handleNotificationPress = (notification: Notification) => {
    if (notification.notification_status !== 'read') {
      markAsRead(notification.id);
    }

    if (notification.task) {
      navigation.navigate('TaskDetails', { taskId: notification.task });
    }
  };

  // Update the notification card rendering
  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <Card style={[
        styles.card, 
        item.notification_status !== 'read' && styles.unreadCard
      ]}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={getNotificationIcon(item.notification_type)}
              size={24}
              color={getNotificationColor(item.notification_type)}
            />
            {item.notification_status !== 'read' && (
              <View style={styles.unreadDot} />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={[
              styles.title, 
              item.notification_status !== 'read' && styles.unreadText
            ]}>
              {item.notification_message}
            </Text>
            <View style={styles.bottomRow}>
              <Text style={styles.date}>
                {formatDate(item.created_at)}
              </Text>
              <Ionicons
                name={getReadStatusIcon(item)}
                size={16}
                color={item.notification_status === 'read' ? '#3272A0' : '#8E8E93'}
                style={styles.readStatus}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader 
        title="Notifications" 
        showTitle={true} 
        showNotificationIcon={false}
        showSearchIcon={true}
        onSearchPress={toggleSearchBar}
      />

      {/* Add view toggle button */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[
            styles.toggleButton,
            !showArchived && styles.toggleButtonActive
          ]}
          onPress={() => setShowArchived(false)}
        >
          <Text style={[
            styles.toggleText,
            !showArchived && styles.toggleTextActive
          ]}>
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.toggleButton,
            showArchived && styles.toggleButtonActive
          ]}
          onPress={() => setShowArchived(true)}
        >
          <Text style={[
            styles.toggleText,
            showArchived && styles.toggleTextActive
          ]}>
            Archive
          </Text>
        </TouchableOpacity>
      </View>

      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${showArchived ? 'archived' : 'recent'} notifications...`}
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {/* Update empty state message */}
      {filteredNotifications.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={48} color="#666" />
          <Text style={styles.emptyTitle}>
            {showArchived 
              ? 'No Archived Notifications'
              : 'No Recent Notifications'
            }
          </Text>
          <Text style={styles.emptySubtitle}>
            {showArchived
              ? 'Notifications older than 7 days will appear here'
              : 'You\'re all caught up!'
            }
          </Text>
        </View>
      )}

      {/* Add an info banner for archived notifications */}
      {showArchived && filteredNotifications.length > 0 && (
        <View style={styles.archiveInfoBanner}>
          <Ionicons name="information-circle-outline" size={20} color="#8E8E93" />
          <Text style={styles.archiveInfoText}>
            Showing notifications older than 7 days
          </Text>
        </View>
      )}

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
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          contentContainerStyle={
            filteredNotifications.length === 0 ? styles.emptyList : styles.listContent
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
    paddingBottom: 100,
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
    color: '#FFFFFF',
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  searchInput: {
    backgroundColor: '#1D1E23',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#262626',
  },
  swipeActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  hideAction: {
    backgroundColor: '#65779E',
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#1C1C1E',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#2C2C2E',
  },
  toggleText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  archiveInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  archiveInfoText: {
    color: '#8E8E93',
    fontSize: 14,
    marginLeft: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  readStatus: {
    marginLeft: 8,
  },
});

export default React.memo(NotificationScreen);