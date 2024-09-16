// OtpInput.js
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const OtpInput = ({ otp, handleOtpChange }) => {
  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleOtpChange(value, index)}
          value={digit}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 50,
    textAlign: 'center',
  },
});

export default OtpInput;
