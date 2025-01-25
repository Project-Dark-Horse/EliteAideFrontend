import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import tw from 'twrnc';

interface DeleteTaskPopupProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskPopup: React.FC<DeleteTaskPopupProps> = ({ visible, onClose, onDelete }) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          <Text style={styles.modalTitle}>Delete this task?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yesButton} onPress={onDelete}>
              <Text style={styles.yesText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
    width: '80%',
    maxWidth: 400,
    borderRadius: 10,
    padding: 24,
    backgroundColor: '#1D1E23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  yesButton: {
    flex: 1,
    marginLeft: 10,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  yesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default DeleteTaskPopup;