// OTPVerificationScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import OtpInput from '../../components/OtpInput';
import { verifyOtp, sendOtp } from '../../services/otpService';
import { otpVerificationStyles as styles } from '../../styles/otpVerificationStyles';
import { commonStyles } from '../../styles/commonStyles';

const OTPVerificationScreen = ({ route, navigation }) => {
  const { email, key } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Create refs for each OTP input
  const otpRefs = useRef(Array(4).fill().map(() => React.createRef()));

  useEffect(() => {
    otpRefs.current[0].current.focus();
  }, []);

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
    if (newOtp.join('').length === 4) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleVerifyOtp = async (otp) => {
    const isValid = await verifyOtp(email, otp);
    if (isValid) {
      navigation.navigate('Register', { otp , email, key });
      setErrorMessage(''); // Clear any previous error message
    } else {
      setErrorMessage('Invalid OTP');
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setTimer(30);

    const isResent = await sendOtp(email);
    if (isResent) {
      setErrorMessage(''); // Clear any previous error message
    } else {
      setErrorMessage('Failed to resend OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the 4-digit OTP sent to {email}</Text>

      {errorMessage ? (
        <Text style={commonStyles.errorText}>{errorMessage}</Text> // Display error message
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate('Email', { key })}>
        <Text style={styles.reenterText}>Wrong address? Re-enter</Text>
      </TouchableOpacity>
      
      <OtpInput otp={otp} handleOtpChange={handleOtpChange} otpRefs={otpRefs} />

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
