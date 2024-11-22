import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, FlatList, ListRenderItemInfo, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import completepng from '../../assets/complete.png';
import deletepng from '../../assets/deletearrow.png';
import Icon from 'react-native-vector-icons/Ionicons';
import UpcomingTasksCard from '../../components/HomePage/UpcomingTasksCard';

interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
  iconName: string;
}

interface GreetingPopupProps {
  visible: boolean;
  onClose: () => void;
}

const GreetingPopup: React.FC<GreetingPopupProps> = ({ visible, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([
    // Example tasks or fetched tasks
    { id: '1', title: 'Task 1', description: 'Description 1', time: '10:00 AM', backgroundColor: '#4956C7', iconName: 'briefcase' },
    { id: '2', title: 'Task 2', description: 'Description 2', time: '11:00 AM', backgroundColor: '#3C8FA9', iconName: 'list' },
  ]);

  console.log('GreetingPopup visible:', visible);
  console.log('Tasks:', tasks);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            While you were gone these tasks were marked as autocomplete
          </Text>
          
          {/* Completed Tasks List */}
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <UpcomingTasksCard
                id={item.id}
                title={item.title}
                description={item.description}
                time={item.time}
                backgroundColor={item.backgroundColor}
                iconName={item.iconName}
              />
            )}
            contentContainerStyle={styles.completedTasks}
            showsVerticalScrollIndicator={false}
          />

          <Text style={styles.checkTasksText}>Check your tasks</Text>

          {/* Continue Button */}
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
  completedTasks: {
    marginBottom: 20,
  },
  taskIconContainer: {
    position: 'relative',
  },
  taskContent: {
    flex: 1,
    marginLeft: 12,
  },
  taskRight: {
    alignItems: 'flex-end',
  },
  mainTaskCard: {
    backgroundColor: '#5856D6',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTaskHeader: {
    position: 'relative',
    marginBottom: 10,
  },
  mainTaskTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  mainTaskDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 10,
  },
  mainTaskTime: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  deleteButton: {
    flex: 1,
    marginRight: 10,
  },
  completeButton: {
    flex: 1,
    marginLeft: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    position: 'relative',
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF453A',
  },
  textContent: {
    gap: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
    gap: 4,
  },
  timeText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  checkTasksText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  mainCard: {
    backgroundColor: '#5856D6',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  mainCardHeader: {
    position: 'relative',
    marginBottom: 12,
  },
  mainCardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  mainCardDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 12,
  },
  mainCardTime: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notificationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 6,
  },
});

export default GreetingPopup;