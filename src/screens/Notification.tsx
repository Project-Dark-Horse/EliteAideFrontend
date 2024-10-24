// screens/NotificationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import tw from 'twrnc';
import NotificationCard from '../components/NotificationCard'


// Sample notifications data
const notificationsData = [
  { id: '1', message: "⏳ Your task ‘Submit monthly report’ is due in 1 hour! Don’t forget!" },
  { id: '2', message: "📦 Your order has been shipped and is on the way!" },
  { id: '3', message: "🔔 Reminder: Meeting at 3 PM" },
  // Add more notifications as needed
];

const NotificationScreen: React.FC = () => {
  const handleNotificationPress = (message: string) => {
    console.log("Notification pressed:", message);
  };

  const renderNotification = ({ item }: { item: { message: string; id: string } }) => (
    <NotificationCard message={item.message} onPress={() => handleNotificationPress(item.message)} />
  );

  return (
    <View style={styles.container}>
     
      <FlatList
        data={notificationsData}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={tw`h-4`} />} // Adds a 16px gap between items
        ListHeaderComponent={<View style={tw`h-10`} />} // Adds a 40px space at the top

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111', // Background color for the screen
    padding: 16,
  },
});

export default NotificationScreen;
