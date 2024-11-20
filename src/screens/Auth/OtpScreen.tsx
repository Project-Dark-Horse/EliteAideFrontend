import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { BlurView } from '@react-native-community/blur';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { OTPRouteProp, OTPNavigationProp } from '../../types/navigation';
import { BASE_URL } from '@env';

// Import the logo image
import LogoImage from '../../assets/vector.png';

type Props = {
  route: OTPRouteProp;
  navigation: OTPNavigationProp;
};

const Otp: React.FC<Props> = ({ route, navigation }) => {
  const { email } = route.params;

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for resend button
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) setIsResendDisabled(false);

    return () => clearInterval(countdown);
  }, [timer]);

  // Function to handle OTP input change
  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid digit',
      });
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    const userOtp = otp.join('');
    console.log('Entered OTP:', userOtp);

    if (userOtp.length === 4) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}v1/users/otp/validate/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: userOtp }),
        });
        const data = await response.json();
        console.log('OTP Verification Response:', data);
        setLoading(false);

        if (data.message?.toLowerCase() === 'otp verified') {
          Toast.show({ type: 'success', text1: 'OTP verified successfully!' });
          navigation.replace('SignUp', { email, otp: userOtp, key: data.key });
        } else if (data.message?.toLowerCase() === 'otp expired') {
          Toast.show({
            type: 'error',
            text1: 'OTP Expired',
            text2: 'Your OTP has expired. Please request a new one.',
          });
        } else {
          Toast.show({ type: 'error', text1: 'Invalid OTP. Please try again.' });
        }
      } catch (error) {
        setLoading(false);
        console.error('Error verifying OTP:', error);
        Toast.show({ type: 'error', text1: 'Network error. Please try again.' });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Incomplete OTP',
        text2: 'Please enter the 4-digit OTP',
      });
    }
  };

  // Function to resend OTP
  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setOtp(['', '', '', '']);
    setTimer(30);
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}v1/users/otp/send/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('OTP Resend Response:', data);
      setLoading(false);

      if (data.success) {
        Toast.show({ type: 'success', text1: 'OTP resent successfully' });
      } else {
        Toast.show({ type: 'error', text1: 'Failed to resend OTP' });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error resending OTP:', error);
      Toast.show({ type: 'error', text1: 'Failed to resend OTP. Please check your connection.' });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <RadialGradient
        style={tw`absolute inset-0`}
        colors={['#4956C7', '#111111', '#111111']}
        center={[330, 99]}
        radius={350}
      />
      <BlurView
        style={tw`absolute inset-1`}
        blurType="extraDark"
        blurAmount={70}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />

      <ScrollView contentContainerStyle={tw`flex-grow px-6 pt-24`}>
        {/* Back button */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={tw`m-4 w-10 h-10 justify-center items-center bg-[#1D1E23] rounded-full`}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={LogoImage}
          style={[
            tw`mb-6`,
            {
              width: 120,
              height: 55,
              transform: [{ rotate: '0.81deg' }],
            }
          ]}
          resizeMode="contain"
        />

        {/* Text content */}
        <Text style={tw`text-white text-2xl font-semibold mb-2`}>
          Enter the 4-digit code sent to
        </Text>
        <Text style={tw`text-[#979797] text-lg mb-1`}>{email}</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#979797]`}>
            Wrong Address? <Text style={tw`text-[#65779E] font-semibold`}>Re-enter</Text>
          </Text>
        </TouchableOpacity>

        {/* OTP Input */}
        <View style={tw`flex-row justify-between mb-8 mt-10`}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                tw`w-16 h-16 bg-[#111111] border border-[#262626] rounded-xl text-center text-white text-xl`,
                digit && tw`border-[#65779E]`
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={(el) => (otpRefs.current[index] = el)}
            />
          ))}
        </View>

        {/* Resend code */}
        <TouchableOpacity 
          onPress={handleResendOtp} 
          disabled={isResendDisabled}
          style={tw`items-center mb-8`}
        >
          <Text style={tw`text-[#65779E]`}>
            {isResendDisabled ? `Resend code in ${timer}s` : 'Resend code'}
          </Text>
        </TouchableOpacity>

        {/* Continue Button with 3D effect */}
        <Button
          mode="contained"
          onPress={handleVerifyOtp}
          disabled={loading}
          style={[
            tw`rounded-xl mb-4`,
            {
              backgroundColor: '#1D1E23',
              transform: [{ translateY: 0 }],
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }
          ]}
          contentStyle={[
            tw`py-2`,
            {
              transform: [{ translateY: -1 }],
            }
          ]}
          labelStyle={[
            tw`text-white font-bold`,
            {
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }
          ]}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : 'Continue'}
        </Button>

        {/* Step indicator */}
        <View style={tw`items-center mb-1`}>
          <Text style={tw`text-[#979797] text-sm`}>
            Step <Text style={tw`text-[#65779E] font-semibold`}>2</Text>/3
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Otp;