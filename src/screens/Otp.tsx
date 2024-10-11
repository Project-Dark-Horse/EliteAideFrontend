import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { BlurView } from '@react-native-community/blur';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
//import { RootStackParamList } from '../types/navigation';




const BASE_URL = "https://api.eliteaide.tech/";

type RootStackParamList = {
  OTPVerification: { email: string };
  SignUp: { email: string; otp: string; key: string }; // key is part of response
  Register: undefined;
};
type OTPVerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTPVerification'>;
type OTPVerificationScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

type Props = {
  route: OTPVerificationScreenRouteProp;
};

const OTPVerificationScreen: React.FC<Props> = ({ route }) => {
  const { email } = route.params;
  console.log(email);
  const navigation = useNavigation<OTPVerificationScreenNavigationProp>();

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const otpRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
      if (!value && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }

      setErrorMessage('');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid digit',
      });
    }
  };

  const handleVerifyOtp = async () => {
    const userOtp = otp.join(''); // Combine the OTP array into a string
    console.log(userOtp);
    console.log("Request Body:", JSON.stringify({ email, otp: userOtp }));

    if (userOtp.length === 4) {
      setLoading(true);
      setErrorMessage('');
      try {
        const response = await fetch(`${BASE_URL}v1/users/otp/validate/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: userOtp }),
        });

        const data = await response.json();
        console.log('OTP Verification Response:', data);

        setLoading(false);

        if (data.message && data.message.toLowerCase() === 'otp verified') {
          Toast.show({
            type: 'success',
            text1: 'OTP verified successfully!',
          });

          // Navigate to SignUp screen, passing email, otp, and the key from response
          navigation.replace('SignUp', {
            email,           // Pass the email
            otp: userOtp,    // Pass the OTP
            key: data.key    // Assuming `data.key` is part of the response
          });
        } else {
          setErrorMessage('Invalid OTP. Please try again.');
        }
      } catch (error) {
        setLoading(false);
        console.log('OTP Verification Error:', error);
        Toast.show({
          type: 'error',
          text1: 'Network error. Please try again.',
        });
      }
    } else {
      setErrorMessage('Please enter the 4-digit OTP');
    }
  };




  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setOtp(['', '', '', '']);
    setTimer(30);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/otp/send/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),

      });

      const data = await response.json();
      setLoading(false);
      if (data.success) {
        Toast.show({
          type: 'success',
          text1: 'OTP resent successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to resend OTP',
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to resend OTP. Please check your connection.',
      });
    }
  };

  return (
    <View style={tw`flex-1`}>
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

      <View style={tw`flex-1 justify-center px-6 bg-transparent mt-5`}>
        <View>
          <TouchableOpacity
            style={tw`w-10 h-10 justify-center items-center top--39 bg-[#1D1E23] rounded-2xl`}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={tw`text-white text-2xl mt-4`}>Enter the 4-digit code sent to</Text>
          <Text style={tw`text-white text-lg mt-4`}>{email}</Text>

          <TouchableOpacity>
            <Text style={tw`text-[#979797] mt-3`}>Wrong Address? Re-enter</Text>
          </TouchableOpacity>

          <View style={tw`flex-row justify-start w-full mb-5 mt-10`}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={tw`w-17 h-17 border border-blue-400 rounded-md text-center text-white text-xl mx-2`}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
                ref={(el) => (otpRefs.current[index] = el)}
                accessibilityLabel={`OTP digit ${index + 1}`}
              />
            ))}
          </View>

          {errorMessage ? (
            <Text style={tw`text-red-500 mb-3`}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity onPress={handleResendOtp} disabled={isResendDisabled}>
            <Text style={tw`text-blue-400 mb-7`}>
              {isResendDisabled ? `Resend code in ${timer}s` : 'Resend code'}
            </Text>
          </TouchableOpacity>

          <Button
            mode="elevated"
            onPress={handleVerifyOtp}
            disabled={loading}
            style={[tw`rounded-2xl top-20`, {
              shadowColor: 'grey',
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.15,
              shadowRadius: 0.5,
              elevation: 2,
              overflow: 'visible'
            }]}
            contentStyle={tw`py-1`}
            labelStyle={tw`text-sm text-white`}
            buttonColor="#1D1E23"
          >
            {loading ? <ActivityIndicator size="small" color="#fff" /> : 'Continue'}
          </Button>
        </View>
      </View>

      <LinearGradient
        style={tw`absolute bottom-0 left-0 right-0 h-[10%]`}
        colors={['rgba(17,17,17,0.2)', 'rgba(73,86,189,0.2)']}
      />

      <Toast />
    </View>
  );
};

export default OTPVerificationScreen;
