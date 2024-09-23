// OTPVerificationScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import OtpInput from '../../components/OtpInput';
import { verifyOtp, resendOtp } from '../../services/otpService';
import { otpVerificationStyles as styles } from '../../styles/otpVerificationStyles';

const OTPVerificationScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerifyOtp = async () => {
    const userOtp = otp.join('');
    if (userOtp.length === 6) {
      const isValid = await verifyOtp(email, userOtp);
      if (isValid) {
        navigation.navigate('Register');
      } else {
        alert('Invalid OTP');
      }
    } else {
      alert('Please enter the 4-digit OTP');
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setTimer(30);

    const isResent = await resendOtp(email);
    if (isResent) {
      alert('OTP resent successfully');
    } else {
      alert('Failed to resend OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the 6-digit OTP sent to {email}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Email')}>
        <Text style={styles.reenterText}>Wrong address? Re-enter</Text>
      </TouchableOpacity>
      
      <OtpInput otp={otp} handleOtpChange={handleOtpChange} />

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

export default OTPVerificationScreen;
