import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const OTPVerificationScreen = ({ route, navigation }) => {
  const { email } = route.params; // Get email from navigation params
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // Start countdown for resend OTP button
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearInterval(countdown); // Clean up timer on unmount
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerifyOtp = async () => {
    const userOtp = otp.join(''); // Join the OTP digits
    if (userOtp.length === 4) {
      try {
        const response = await fetch('https://your-api.com/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: userOtp }),
        });

        const data = await response.json();

        if (data.success) {
          console.log('OTP verified successfully');
          // Navigate to the Home Screen
          navigation.navigate('Home');
        } else {
          alert('Invalid OTP');
        }
      } catch (error) {
        alert('Failed to verify OTP');
      }
    } else {
      alert('Please enter the 4-digit OTP');
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setTimer(30); // Reset timer to 30 seconds

    try {
      const response = await fetch('https://your-api.com/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert('OTP resent successfully');
      } else {
        alert('Failed to resend OTP');
      }
    } catch (error) {
      alert('Failed to resend OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the 4-digit OTP sent on your Email ID</Text>
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

      <Button title="Verify OTP" onPress={handleVerifyOtp} />

      <TouchableOpacity
        disabled={isResendDisabled}
        onPress={handleResendOtp}
        style={styles.resendButton}
      >
        <Text style={isResendDisabled ? styles.disabledText : styles.resendText}>
          Resend OTP {isResendDisabled && `(${timer}s)`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  resendButton: {
    marginTop: 20,
  },
  resendText: {
    color: 'blue',
  },
  disabledText: {
    color: 'gray',
  },
});

export default OTPVerificationScreen;
