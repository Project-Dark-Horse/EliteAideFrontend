// src/screens/PrivacyAndSecurityScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../../components/CommonHeader';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

interface PrivacySetting {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const PrivacyAndSecurityScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const privacySettings: PrivacySetting[] = [
    { id: 1, icon: 'lock-closed', title: 'Password', description: 'Change your account password' },
    { id: 2, icon: 'finger-print', title: 'Two-Factor Authentication', description: 'Enable 2FA for extra security' },
    { id: 3, icon: 'eye-off', title: 'Privacy Settings', description: 'Control who can see your information' },
    { id: 4, icon: 'trash-bin', title: 'Data Deletion', description: 'Request deletion of your data' },
    { id: 5, icon: 'shield-checkmark', title: 'Security Alerts', description: 'Get notified about suspicious activities' },
  ];

  const toggleSearchBar = () => {
    setIsSearchVisible(prev => !prev);
  };

  const filteredSettings = privacySettings.filter(setting =>
    setting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSetting = ({ item }: { item: PrivacySetting }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() => {
        if (item.title === 'Password') {
          setModalVisible(true);
        }
      }}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconBackground}>
          <Ionicons name={item.icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.textContainer}>
          <Title style={styles.title}>{item.title}</Title>
          <Paragraph style={styles.description}>{item.description}</Paragraph>
        </View>
      </Card.Content>
    </TouchableOpacity>
  );

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change logic here
    setModalVisible(false);
    alert('Password changed successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        title="Privacy and Security"
        showTitle={true}
        showNotificationIcon={false}
        onSearchToggle={toggleSearchBar}
        isSearchVisible={isSearchVisible}
      />

      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <FlatList
        data={filteredSettings}
        renderItem={renderSetting}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Password</Text>
          <LinearGradient
            colors={['#16213C', '#3272A0', '#3272A0', '#1E4E8D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientBorder}
          >
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#6F6F6F"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </LinearGradient>
          <LinearGradient
            colors={['#16213C', '#3272A0', '#3272A0', '#1E4E8D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientBorder}
          >
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#6F6F6F"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </LinearGradient>
          <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  list: {
    padding: 10,
  },
  card: {
    marginTop: 15,
    backgroundColor: '#1D1E23',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3272A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#AAAAAA',
    fontSize: 13,
  },
  modalContent: {
    backgroundColor: '#1D1E23',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#111111',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4956C7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  gradientBorder: {
    borderRadius: 8,
    padding: 1,
    marginBottom: 15,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#1D1E23',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#fff',
  },
  iconButton: {
    padding: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
});

export default React.memo(PrivacyAndSecurityScreen);