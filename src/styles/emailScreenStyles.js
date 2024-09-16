import { StyleSheet } from 'react-native';

export const emailScreenStyles = StyleSheet.create({
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
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: 'gray',
  },
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
