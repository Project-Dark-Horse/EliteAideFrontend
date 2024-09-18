import { StyleSheet } from 'react-native';

export const loginScreenStyles = StyleSheet.create({
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
  welcomeText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'gray',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});