import React from 'react';
import { Appbar, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon library

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <Appbar.Header style={[styles.header, { marginTop: insets.top }]}>
      <View style={styles.titleContainer}>
        <Appbar.Content 
          title="Today" 
          titleStyle={styles.title} 
        />
        <MaterialCommunityIcons name="chevron-down" size={24} color="white" /> {/* Updated with icon component */}
      </View>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={() => console.log('Create task')}
        accessibilityLabel="Create a new task"
      >
        Create task
      </Button>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#111111',
    elevation: 0,
    shadowOpacity: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#1D1E23',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});