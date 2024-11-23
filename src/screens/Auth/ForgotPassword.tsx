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
import { toast } from 'react-hot-toast';

type ForgotPasswordScreenProps = {
  route: RouteProp<RootStackParamList, 'ForgotPassword'>;
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

const OTP_LENGTH = 4;
const RESEND_TIMER = 30;
const INITIAL_OTP = Array(OTP_LENGTH).fill('');

const ForgotPassword: React.FC<ForgotPasswordScreenProps> = ({ route, navigation }) => {
  const email = route.params?.email;
  
  if (!email) {
    useEffect(() => { navigation.goBack(); }, []);
    return null;
  }

  const [otp, setOtp] = useState<string[]>(INITIAL_OTP);
  const [timer, setTimer] = useState(RESEND_TIMER);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const makeApiCall = async (endpoint: string, payload: object) => {
    try {
      const response = await fetch(`${BASE_URL}v1/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      return { success: false, error };
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    
    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setIsResendDisabled(true);
    setTimer(RESEND_TIMER);
    setOtp(INITIAL_OTP);

    const { success } = await makeApiCall('resend-otp', { email });
    if (success) {
        toast.success('OTP Resent');
    }
    setIsLoading(false);
  };

  const handleContinue = async () => {
    const otpString = otp.join('');
    if (otpString.length !== OTP_LENGTH) return;

    setIsLoading(true);
    const { success } = await makeApiCall('verify-otp', { email, otp: otpString });
    
    if (success) {
      navigation.navigate('ResetPassword', { email, otp: otpString });
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle key press logic here if needed
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

export default ForgotPassword;