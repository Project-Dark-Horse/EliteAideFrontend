import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const tasks = [
  { id: '1', title: 'Team Meeting', description: 'Group discussion for the new product', time: '8-9 AM' },
  { id: '2', title: 'Team Meeting', description: 'Group discussion for the new product', time: '8-9 AM' },
];

const GreetingPopup = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Ionicons name="calendar-outline" size={24} color="#fff" />
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
      <Text style={styles.taskTime}>{item.time}</Text>
      <FontAwesome name="check-circle" size={20} color="#4CAF50" />
    </View>
  );

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>While you were gone these tasks were marked as autocomplete</Text>
          
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            style={styles.taskList}
          />
          
          <Text style={styles.subtitle}>Check your tasks</Text>
          
          {/* Task Card */}
          <View style={styles.taskCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="calendar-outline" size={24} color="#fff" />
              <Text style={styles.cardTitle}>Team Meeting</Text>
              <View style={styles.notificationDot} />
            </View>
            <Text style={styles.cardDescription}>Group discussion for the new product</Text>
            <Text style={styles.cardTime}>10 AM</Text>
          </View>
          
          <View style={styles.actionRow}>
            <TouchableOpacity>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.completeText}>Complete</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.continueButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#2E2E2E',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  taskList: {
    marginBottom: 15,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  taskTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskDescription: {
    color: '#888888',
    fontSize: 12,
  },
  taskTime: {
    color: '#888888',
    fontSize: 12,
    marginRight: 8,
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: '#5A67D8',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginLeft: 5,
  },
  cardDescription: {
    color: '#cfcfcf',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  cardTime: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 30,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
  },
  completeText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GreetingPopup;