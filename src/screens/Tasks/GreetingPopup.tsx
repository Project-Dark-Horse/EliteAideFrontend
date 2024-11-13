import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import completepng from '../../assets/complete.png';
import deletepng from '../../assets/deletearrow.png';

interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
}

const tasks: Task[] = [
  { id: '1', title: 'Team Meeting', description: 'Group discussion for the new product', time: '8-9 AM' },
  { id: '2', title: 'Client Call', description: 'Monthly check-in with the client', time: '10-11 AM' },
];

interface GreetingPopupProps {
  visible: boolean;
  onClose: () => void;
}

const GreetingPopup: React.FC<GreetingPopupProps> = ({ visible, onClose }) => {
  const renderTask = ({ item }: ListRenderItemInfo<Task>) => (
    <View style={styles.taskItem}>
      <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
      <Text style={styles.taskTime}>{item.time}</Text>
      <FontAwesome name="check-circle" size={20} color="#3DCCBB" />
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>While you were gone, these tasks were marked as autocomplete</Text>
          
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            style={styles.taskList}
          />
          
          <Text style={styles.subtitle}>Check your tasks</Text>
          
          <View style={styles.taskCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
              <Text style={styles.cardTitle}>Team Meeting</Text>
              <View style={styles.notificationDot} />
            </View>
            <Text style={styles.cardDescription}>Group discussion for the new product</Text>
            <Text style={styles.cardTime}>10 AM</Text>
          </View>

          <View style={styles.pagination}>
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionItem}>
              <Image source={deletepng} style={styles.actionIcon} />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Image source={completepng} style={styles.actionIcon} />
              <Text style={styles.completeText}>Complete</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.continueButton} onPress={onClose}>
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
    width: 342,
    height: 560,
    backgroundColor: '#1D1E23',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito',
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  taskList: {
    marginBottom: 15,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Nunito',
  },
  taskDescription: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Nunito',
  },
  taskTime: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Nunito',
    marginRight: 8,
  },
  subtitle: {
    color: '#979797',
    fontSize: 14,
    fontFamily: 'Nunito',
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: '#5560C4',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Nunito',
    marginLeft: 8,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C23333',
    marginLeft: 5,
  },
  cardDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Nunito',
    marginTop: 5,
    textAlign: 'center',
  },
  cardTime: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    marginTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 30,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  deleteText: {
    color: '#C23333',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  completeText: {
    color: '#3DCCBB',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  continueButton: {
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginVertical: 10,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#65779E',
  },
  inactiveDot: {
    backgroundColor: '#333333',
  },
  checkCircleBackground: {
    backgroundColor: '#3DCCBB',
    borderRadius: 20,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GreetingPopup;