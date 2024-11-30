// src/screens/PrivacyAndSecurityScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../components/CommonHeader';

interface PrivacySetting {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const PrivacyAndSecurityScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const privacySettings: PrivacySetting[] = [
    { id: 1, icon: 'lock-closed', title: 'Password', description: 'Change your account password' },
    { id: 2, icon: 'finger-print', title: 'Two-Factor Authentication', description: 'Enable 2FA for extra security' },
    { id: 3, icon: 'eye-off', title: 'Privacy Settings', description: 'Control who can see your information' },
    { id: 4, icon: 'trash-bin', title: 'Data Deletion', description: 'Request deletion of your data' },
    { id: 5, icon: 'shield-checkmark', title: 'Security Alerts', description: 'Get notified about suspicious activities' },
  ];

  const renderSetting = ({ item }: { item: PrivacySetting }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconBackground}>
          <Icon name={item.icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.textContainer}>
          <Title style={styles.title}>{item.title}</Title>
          <Paragraph style={styles.description}>{item.description}</Paragraph>
        </View>
      </Card.Content>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy and Security</Text>
        <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1D1E23',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#1D1E23',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#FFFFFF',
  },
  list: {
    padding: 10,
  },
  card: {
    marginTop: 15,
    backgroundColor: '#1D1E23',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
});

export default React.memo(PrivacyAndSecurityScreen);