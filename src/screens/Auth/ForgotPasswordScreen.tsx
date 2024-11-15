import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { RadialGradient } from 'react-native-gradients';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { BASE_URL } from '@env';

type ForgotPasswordScreenProps = {
  route: RouteProp<RootStackParamList, 'ForgotPassword'>;
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ route, navigation }) => {
  const email = route.params?.email || '';
  if (!route.params?.email) {
    navigation.goBack();
    return null;
  }
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else {
        setIsResendDisabled(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    setIsResendDisabled(true);
    setTimer(30);
    setOtp(['', '', '', '']);
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/v1/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle success
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/v1/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: otpString }),
        });

        const data = await response.json();
        if (response.ok) {
          navigation.navigate('ResetPassword', { email, otp: otpString });
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <RadialGradient
        colorList={[
          { offset: '0%', color: '#4956C7', opacity: '1' },
          { offset: '100%', color: '#000000', opacity: '1' },
        ]}
        x="50%"
        y="50%"
        rx="50%"
        ry="50%"
      />
      <LinearGradient
        style={[StyleSheet.absoluteFill, { height: '50%' }]}
        colors={['#16213C', '#3272A0', '#3272A0', '#1E4E8D']}
        locations={[0, 0.4, 0.47, 1]}
      />

      <TouchableOpacity
        style={tw`w-12 h-12 m-4 justify-center items-center bg-[#1D1E23] rounded-full`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image source={require('../../assets/vector.png')} style={tw`w-20 h-20 self-center mt-8`} resizeMode="contain" />

      <View style={tw`px-6 mt-12`}>
        <Text style={tw`text-white text-3xl font-normal`}>Enter the 4-digit code sent to your registered email id</Text>

        <View style={tw`flex-row justify-between mt-12 px-4`}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={tw`border-b-2 border-[#3272A0] w-12 text-center text-2xl text-white`}
              keyboardType="number-pad"
              maxLength={1}
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleResendCode} disabled={isResendDisabled} style={tw`mt-4`}>
          <Text style={tw`text-[#3272A0] text-base`}>
            {isResendDisabled ? `Resend code in ${timer}s` : 'Resend code'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`absolute bottom-8 w-full px-6`}>
        <TouchableOpacity
          style={tw`bg-[#3272A0] py-3 rounded-lg`}
          onPress={handleContinue}
          disabled={isLoading || otp.some((digit) => !digit)}
        >
          <Text style={tw`text-white text-center text-lg font-medium`}>
            {isLoading ? 'Verifying...' : 'Continue'}
          </Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center mt-4`}>
          <Text style={tw`text-[#666] text-base`}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EnterEmail')}>
            <Text style={tw`text-[#3272A0] text-base font-semibold`}>Create One</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default ForgotPasswordScreen;