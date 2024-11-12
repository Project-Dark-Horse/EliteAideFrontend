import React from 'react';
import { Appbar, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <Appbar.Header style={[styles.header, { marginTop: insets.top }]}>
      <Appbar.Content 
        title="Today" 
        titleStyle={styles.title} 
      />
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log('Create task')}
      >
        Create task
      </Button>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111111',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  button: {
    marginRight: 8,
    backgroundColor: '#1D1E23',
    paddingHorizontal: 16,
  },
  buttonLabel: {
    color: 'white',
  },
});