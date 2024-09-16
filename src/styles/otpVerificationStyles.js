// otpVerificationStyles.js
import { StyleSheet } from 'react-native';

export const otpVerificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  resendButton: {
    marginTop: 20,
  },
  resendText: {
    color: 'blue',
  },
  disabledText: {
    color: 'gray',
  },
  reenterText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  }
});
