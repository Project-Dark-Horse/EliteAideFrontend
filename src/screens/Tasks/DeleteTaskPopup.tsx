import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';

interface DeleteTaskPopupProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskPopup: React.FC<DeleteTaskPopupProps> = ({ visible, onClose, onDelete }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, tw`bg-[rgba(255,255,255,0.08)]`]}>
          <Text style={[styles.modalTitle, tw`text-white`]}>Delete this task?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.cancelButton, tw`border border-blue-500`]} onPress={onClose}>
              <Text style={[styles.cancelText, tw`text-white`]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.yesButton, tw`bg-[#1D1E23]`]} onPress={onDelete}>
              <Text style={[styles.yesText, tw`text-white`]}>Yes</Text>
            </TouchableOpacity>
          </View>
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
    width: 326,
    height: 124,
    borderRadius: 10,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Nunito',
    fontWeight: '400',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  cancelButton: {
    width: 125,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    width: 125,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  yesText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeleteTaskPopup;