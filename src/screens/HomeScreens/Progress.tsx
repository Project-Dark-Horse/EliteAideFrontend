import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Progress: React.FC = () => {
  return (
    <View style={styles.container}>
   
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
  },
});

export default Progress;
