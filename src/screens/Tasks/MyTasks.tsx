import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DeleteTaskPopup from './DeleteTaskPopup';

const MyTasks = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleDeleteTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (selectedTaskId) {
      try {
        // Add your delete API call here
        // await deleteTask(selectedTaskId);
        setIsDeleteModalVisible(false);
        setSelectedTaskId(null);
        // Refresh your tasks list here
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <View style={tw`flex-1`}>
      {/* Your existing MyTasks content */}
      
      <DeleteTaskPopup 
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={confirmDelete}
      />
    </View>
  );
};

export default MyTasks; 