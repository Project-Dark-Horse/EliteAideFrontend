import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const OtpInput = ({ otp, handleOtpChange, otpRefs }) => {
  const handleChange = (value, index) => {
    handleOtpChange(value, index);

    // Move focus to the next input if value is entered
    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleChange(value, index)}
          value={digit}
          ref={otpRefs.current[index]} // Attach ref to the input
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
