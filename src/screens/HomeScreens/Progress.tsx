import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  ToDo: undefined;
  Progress: undefined;
  Done: undefined;
  TaskAnalysis: undefined;
};

type ProgressScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Progress'>;

const Progress: React.FC = () => {
  const navigation = useNavigation<ProgressScreenNavigationProp>();

  const handleNavigateToTaskAnalysis = () => {
    navigation.navigate('TaskAnalysis');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Progress Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToTaskAnalysis}
      >
        <Text style={styles.buttonText}>View Task Analysis</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4e54c8',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Progress;