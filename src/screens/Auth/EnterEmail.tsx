import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { BlurView } from '@react-native-community/blur';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '@env';

// Import the logo image
import LogoImage from '../assets/vector.png';

type EmailScreenNavigationProp = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const EnterEmail: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<EmailScreenNavigationProp>();

  const checkEmailExists = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/exists/?email=${email}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Unable to check email. Please try again later.',
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/otp/send/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.status === 404 ? 'Email not found.' : 'Failed to send OTP. Try again later.',
        });
        return false;
      }
      return true;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network error. Please check your connection.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    emailValidationSchema
      .validate({ email })
      .then(() => setEmailError(null))
      .catch((error) => setEmailError(error.message));
  };

  const handleSubmit = async () => {
    try {
      await emailValidationSchema.validate({ email });
      const emailExists = await checkEmailExists(email);
  
      if (!emailExists) {
        const otpSent = await sendOtp(email);
        if (otpSent) {
          Toast.show({
            type: 'success',
            text1: 'OTP Sent',
            text2: 'A verification code has been sent to your email.',
          });
          handleOtpNavigation();
        }
      } else {
        Toast.show({
          type: 'info',
          text1: 'Email Exists',
          text2: 'The email ID already exists. Please log in.',
        });
        navigation.navigate('Login'); // Navigate to the login screen if email exists
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: error instanceof Yup.ValidationError ? error.message : 'An unknown error occurred',
      });
    }
  };

  const handleOtpNavigation = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigation.navigate('Otp', { email });
    setLoading(false);
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

      {/* Logo Image at specified position */}
      <Image
        source={LogoImage}
        style={{
          position: 'absolute',
          top: 201.09, // Position from the top
          left: 20, // Position from the left
          width: 119.96, // Width as per design
          height: 54.53, // Height as per design
          transform: [{ rotate: '0.81deg' }], // Slight rotation if needed
        }}
      />

      <View style={tw`flex-1 justify-center px-6 bg-transparent mt-5`}>
        <TouchableOpacity 
          onPress={navigation.goBack} 
          style={tw`w-10 h-10 justify-center items-center top--39 bg-[#1D1E23] rounded-2xl`}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
          accessibilityHint="Navigates to the previous screen"
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={tw`text-[#979797]`}>
          Welcome to <Text style={tw`text-[#65779E] font-semibold`}>Elite Aide</Text>!
        </Text>
        <Text style={tw`text-white text-2xl mt-4`}>Enter your email address</Text>
        <Text style={tw`text-[#979797] mt-3`}>You will need to verify your email in the next step.</Text>

        <TextInput
          style={[
            tw`bg-[#111111] text-sm text-white p-3 rounded-lg border-[#6F6F6F]`,
            { borderWidth: 0.5 },
            emailError ? tw`border-red-500` : {},
          ]}
          placeholder="Enter your email address"
          placeholderTextColor="#6F6F6F"
          value={email}
          onChangeText={handleEmailChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="go"
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email address to proceed"
        />
        {emailError && <Text style={tw`text-red-500 mt-2`}>{emailError}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={tw`text-[#1D79BC] text-sm mt-3`}>Already have an account?</Text>
        </TouchableOpacity>

        <Button
          mode="elevated"
          onPress={handleSubmit}
          disabled={loading || !email}
          style={[tw`rounded-2xl top-20`, { 
            shadowColor: 'grey', 
            shadowOffset: { width: 0, height: 0.5 }, 
            shadowOpacity: 0.15, 
            shadowRadius: 0.5, 
            elevation: 2,
          }]}
          contentStyle={tw`py-1`}
          labelStyle={tw`text-sm text-white`}
          buttonColor="#1D1E23"
          accessibilityRole="button"
          accessibilityLabel="Continue button"
          accessibilityHint="Submit email and proceed to OTP verification"
        >
          {loading ? <ActivityIndicator color="#fff" /> : 'Continue'}
        </Button>

        <LinearGradient
          style={tw`absolute bottom-0 left-0 right-0 h-[10%]`}
          colors={['rgba(17,17,17,0.2)', 'rgba(73,86,189,0.2)']}
        />
      </View>
    </View>
  );
};

export default EnterEmail;