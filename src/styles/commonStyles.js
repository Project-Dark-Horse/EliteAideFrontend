import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    padding: 8,
  },
});
