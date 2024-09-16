// registerScreenStyles.js
import { StyleSheet } from 'react-native';

export const registerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
