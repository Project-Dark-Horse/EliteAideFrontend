import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, KeyboardAvoidingView, Platform, Keyboard, ScrollView, Animated } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '@env';

// Import the logo image
import LogoImage from '../../assets/vector.png';

// Add Background import
import Background from '../../components/Background';

type EmailScreenNavigationProp = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

// ... existing imports ...
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Define your navigation stack type
type AuthStackParamList = {
  Otp: { email: string }; // Add other routes as needed
  Login: undefined;
  CreateAccount: undefined; // Ensure this is defined
};

const EnterEmail: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/exists/?email=${email}`);
      const data = await response.json();
      console.log('Check Email Exists Response:', data);
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
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
      const data = await response.json();
      console.log('Send OTP Response:', data);

      if (data.otp) {
        console.log('Received OTP:', data.otp);
      }

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
      console.error('Error sending OTP:', error);
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
          navigation.navigate('Otp', { email }); // Navigate to OTP screen
        }
      } else {
        Toast.show({
          type: 'info',
          text1: 'Email Exists',
          text2: 'The email ID already exists. Please try another email or log in.',
        });
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
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={tw`flex-grow px-6 pt-24`}>
          {/* Back button */}
          <TouchableOpacity 
            onPress={navigation.goBack} 
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
          <Text style={tw`text-[#979797] text-base mb-2`}>
            Welcome to <Text style={tw`text-[#65779E]`}>Elite Aide</Text>!
          </Text>
          
          <Text style={tw`text-white text-2xl font-semibold mb-2`}>
            Enter your email address
          </Text>
          
          <Text style={tw`text-[#979797] text-base mb-6`}>
            You will need to verify your email in the next step
          </Text>

          {/* Email Input */}
          <TextInput
            style={tw`bg-[#111111] text-white px-4 py-4 rounded-xl mb-4 border border-[#262626]`}
            placeholder="Enter your email address....."
            placeholderTextColor="#6F6F6F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Continue Button with 3D effect */}
          <Button
            mode="contained"
            onPress={handleSubmit}
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
                transform: [{ translateY: -1 }], // Slight lift for text
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
            onPressIn={() => {
              // Optional: Add press animation
              if (Platform.OS === 'ios') {
                Animated.spring(pressAnim, {
                  toValue: 0.95,
                  useNativeDriver: true,
                }).start();
              }
            }}
            onPressOut={() => {
              if (Platform.OS === 'ios') {
                Animated.spring(pressAnim, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start();
              }
            }}
          >
            Continue
          </Button>

          {/* Login link */}
          <TouchableOpacity 
            style={tw`items-center mb-4`}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={tw`text-[#979797]`}>
              Already have an account? <Text style={tw`text-[#65779E] font-semibold`}>Login</Text>
            </Text>
          </TouchableOpacity>

          {/* Step indicator */}
          <View style={tw`items-center mb-1`}>
            <Text style={tw`text-[#979797] text-sm`}>
              Step <Text style={tw`text-[#65779E] font-semibold`}>1</Text>/3
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
};

export default React.memo(EnterEmail);