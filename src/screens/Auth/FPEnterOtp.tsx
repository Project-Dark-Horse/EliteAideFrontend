import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteParams = {
  email: string;
};

// Add type definition for the navigation stack
type AuthStackParamList = {
  FPNewPassword: { email: string; otp: string };
  // Add other screens as needed
};

const FPEnterOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute();
  const { email } = route.params as RouteParams;
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    // Optional: Go to previous input when deleting
    else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the complete 4-digit OTP',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/otp/validate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: otpString,
          type: 'FORGOT_PASSWORD'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'OTP Verified',
          text2: 'Please set your new password',
        });
        navigation.navigate('FPNewPassword', { email, otp: otpString });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid OTP',
          text2: data.message || 'Please try again',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/otp/send/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent',
          text2: 'A new OTP has been sent to your email',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to send OTP. Please try again.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-[#000000]`}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#000000', '#111111']}
        style={tw`absolute inset-0`}
      />

      <View style={tw`flex-1 px-6`}>
        {/* Back button */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={tw`mt-12 w-12 h-12 bg-[#1A1A1A] rounded-full justify-center items-center`}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../../assets/vector.png')}
          style={tw`w-32 h-32 mt-8 mb-8`}
          resizeMode="contain"
        />

        {/* Main content */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-3xl font-semibold mb-2`}>
            Enter the 4-digit code sent to
          </Text>
          <Text style={tw`text-[#979797] text-xl mb-12`}>
            your registered email id
          </Text>

          {/* OTP Input boxes */}
          <View style={tw`flex-row justify-between mb-6`}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={[
                  tw`w-[60px] h-[60px] bg-[#111111] rounded-2xl text-center text-white text-2xl`,
                  {
                    borderWidth: 1,
                    borderColor: digit ? '#3272A0' : '#333333'
                  }
                ]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>

          {/* Resend code */}
          <TouchableOpacity onPress={resendOtp} disabled={loading}>
            <Text style={tw`text-[#3272A0] text-base mb-12`}>
              {loading ? 'Sending...' : 'Resend code'}
            </Text>
          </TouchableOpacity>

          {/* Continue button */}
          <Button
            mode="contained"
            onPress={validateOtp}
            loading={loading}
            disabled={loading}
            style={[
              tw`rounded-full py-2 bg-[#1A1A1A]`,
              {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 8
              }
            ]}
            contentStyle={tw`h-14`}
            labelStyle={tw`text-white text-lg font-medium`}
          >
            {loading ? 'Verifying...' : 'Continue'}
          </Button>

          {/* Footer text */}
          <View style={tw`flex-row justify-center mt-6`}>
            <Text style={tw`text-[#979797] text-base`}>
              Don't have an account?{' '}
              <Text style={tw`text-[#3272A0] font-semibold`}>Create One</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(FPEnterOtp);