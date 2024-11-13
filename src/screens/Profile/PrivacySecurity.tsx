// src/screens/PrivacyAndSecurityScreen.tsx
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../../components/CommonHeader';

interface PrivacySetting {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const PrivacyAndSecurityScreen: React.FC = () => {
  const privacySettings: PrivacySetting[] = [
    { id: 1, icon: 'lock-closed', title: 'Password', description: 'Change your account password' },
    { id: 2, icon: 'finger-print', title: 'Two-Factor Authentication', description: 'Enable 2FA for extra security' },
    { id: 3, icon: 'eye-off', title: 'Privacy Settings', description: 'Control who can see your information' },
    { id: 4, icon: 'trash-bin', title: 'Data Deletion', description: 'Request deletion of your data' },
    { id: 5, icon: 'shield-checkmark', title: 'Security Alerts', description: 'Get notified about suspicious activities' },
  ];

  const renderSetting = ({ item }: { item: PrivacySetting }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconBackground}>
          <Icon name={item.icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.textContainer}>
          <Title style={styles.title}>{item.title}</Title>
          <Paragraph style={styles.description}>{item.description}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Common Header */}
      <CommonHeader title="Privacy and Security" showTitle={true} showNotificationIcon={false} />

      {/* Privacy and Security Settings List */}
      <FlatList
        data={privacySettings}
        renderItem={renderSetting}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111', // Black background
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
    backgroundColor: '#3272A0', // Icon background color
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
});

export default PrivacyAndSecurityScreen;