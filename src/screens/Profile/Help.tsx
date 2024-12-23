import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadialGradient } from 'react-native-gradients';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const HelpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleContactSupport = () => {
    setModalContent(
      <View>
        <Text style={styles.modalText}>You can reach us at:</Text>
        <TouchableOpacity onPress={openEmail}>
          <Text style={styles.emailLink}>eliteaideio@gmail.com</Text>
        </TouchableOpacity>
      </View>
    );
    setModalVisible(true);
  };

  const handleVisitFAQ = () => {
    setModalContent(
      <View>
        <Text style={styles.question}>1. How do I add a task?</Text>
        <Text style={styles.answer}>
          - You can add a task by tapping the 'Create Task' button, selecting the type (daily, weekly, or monthly), entering details, and saving it.
        </Text>
        <Text style={styles.question}>2. Can I categorize tasks?</Text>
        <Text style={styles.answer}>
          - Yes, tasks can be categorized using personal, work, health, travel, finance, and shopping for better organization.
        </Text>
        <Text style={styles.question}>3. How do I mark a task as completed?</Text>
        <Text style={styles.answer}>
          - Simply tap on the task and select the 'Mark as Complete' option.
        </Text>
        <Text style={styles.question}>4. Can I edit or delete a task?</Text>
        <Text style={styles.answer}>
          - Yes, you can edit or delete tasks by selecting the task and using the respective options.
        </Text>
        <Text style={styles.question}>5. Does the app sync across devices?</Text>
        <Text style={styles.answer}>
          - Yes, tasks and settings are synced across devices if you’re logged into the same account.
        </Text>
      </View>
    );
    setModalVisible(true);
  };

  const openEmail = () => {
    Linking.openURL('mailto:eliteaideio@gmail.com').catch(err => console.error('Error opening email:', err));
  };

  return (
    <View style={tw`flex-1 bg-[#111111]`}>
      {/* Background Gradient */}
      <View style={tw`absolute inset-0`}>
        <RadialGradient
          colorList={[
            { offset: '0%', color: '#4956C7', opacity: '1' },
            { offset: '70%', color: '#111111', opacity: '1' },
            { offset: '100%', color: '#111111', opacity: '1' },
          ]}
          x="50%"
          y="50%"
          rx="50%"
          ry="50%"
        />
      </View>
      <View style={tw`absolute inset-1 bg-[#000000] opacity-70`} />

      {/* Header */}
      <TouchableOpacity
        style={tw`w-10 h-10 justify-center items-center mt-5 ml-5 bg-[#1D1E23] rounded-2xl`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-white text-3xl font-semibold mb-4 text-center`}>Help & Support</Text>
        <Text style={tw`text-[#979797] text-center text-lg mb-8`}>
          If you have any questions or need assistance, feel free to reach out to our support team or visit our FAQ.
        </Text>

        {/* Action Buttons */}
        <TouchableOpacity
          style={tw`bg-[#65779E] rounded-2xl py-3 px-6 mb-4 w-4/5 items-center shadow-lg`}
          onPress={handleContactSupport}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-[#1D1E23] rounded-2xl py-3 px-6 w-4/5 items-center shadow-lg`}
          onPress={handleVisitFAQ}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Visit FAQ</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.modalContent}>
          {modalContent}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#1D1E23',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  answer: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'left',
  },
  emailLink: {
    color: '#3272A0',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  closeButton: {
    backgroundColor: '#65779E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default React.memo(HelpScreen);