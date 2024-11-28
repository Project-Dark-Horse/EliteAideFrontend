import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ToDoScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Back Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#384766" />
        </TouchableOpacity>
        <Text style={styles.headerText}>To-Do Tasks</Text>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.text}>This is the To-Do Tasks Screen</Text>
        <Text style={styles.subText}>Here you can view all tasks to complete.</Text>
      </View>
    </View>
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
    padding: 16,
    backgroundColor: '#000000', // Updated header background to black
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subText: {
    color: '#979797',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default React.memo(ToDoScreen);