import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import RadialGradient from 'react-native-radial-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import CheckBox from '@react-native-community/checkbox';
import { SignUpScreenNavigationProp } from '../types/navigation';
import { BASE_URL } from '@env';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

type SignUpRouteProp = RouteProp<{ SignUp: { email: string; otp: string } }, 'SignUp'>;

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  mobile_number: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const route = useRoute<SignUpRouteProp>();

  const { email, otp } = route.params;

  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    username: '',
    mobile_number: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.password.length < 8 || !/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password should contain at least 8 characters, a number or symbol';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signUpUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          mobile_number: formData.mobile_number || null,
        }),
      });

      const result = await response.json();
      setIsLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to connect to server. Please try again later.');
    }
  };

  const handleSubmit = async () => {
    try {
      await emailValidationSchema.validate({ email });
  
      // Step 1: Check if the email already exists
      const emailExists = await emailExists(email);
  
      if (emailExists) {
        // If the email exists, prompt the user to log in and navigate to the Login screen
        Toast.show({
          type: 'info',
          text1: 'Email Exists',
          text2: 'This email is already registered. Please log in.',
        });
        navigation.navigate('Login'); // Navigate to the login screen if email exists
      } else {
        // Step 2: Send OTP only if the email does not exist
        const otpSent = await sendOtp(email);
        if (otpSent) {
          Toast.show({
            type: 'success',
            text1: 'OTP Sent',
            text2: 'A verification code has been sent to your email.',
          });
          handleOtpNavigation();
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: error instanceof Yup.ValidationError ? error.message : 'An unknown error occurred',
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <RadialGradient
        style={tw`absolute inset-0`}
        colors={['#4956C7', '#000000']}
        center={[330, 99]}
        radius={350}
      />
      <BlurView
        style={tw`absolute inset-1`}
        blurType="extraDark"
        blurAmount={100}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />
      
      <View style={tw`flex-1 px-5`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-10 h-10 justify-center items-center bg-[#1D1E23] rounded-2xl mt-5`}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={tw`text-[#FFFFFF] text-3xl font-semibold mt-25`}>Sign Up</Text>
        <Text style={tw`text-[#979797] mt-2`}>Ready to be your own boss?</Text>

        <View style={tw`flex-row mt-6`}>
          <TextInput
            style={tw`flex-1 text-[#FFFFFF] p-3 rounded-lg border border-[#555555] mr-2`}
            placeholder="First Name"
            placeholderTextColor="#979797"
            value={formData.first_name}
            onChangeText={(text) => setFormData({ ...formData, first_name: text })}
          />
          <TextInput
            style={tw`flex-1 text-[#FFFFFF] p-3 rounded-lg border border-[#555555] ml-2`}
            placeholder="Last Name"
            placeholderTextColor="#979797"
            value={formData.last_name}
            onChangeText={(text) => setFormData({ ...formData, last_name: text })}
          />
        </View>

        <TextInput
          style={tw`text-[#FFFFFF] p-3 rounded-lg border border-[#555555] mt-4`}
          placeholder="Username"
          placeholderTextColor="#979797"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
        />

        <TextInput
          style={tw`text-[#FFFFFF] p-3 rounded-lg border border-[#555555] mt-4`}
          placeholder="Mobile Number (Optional)"
          placeholderTextColor="#979797"
          value={formData.mobile_number}
          onChangeText={(text) => setFormData({ ...formData, mobile_number: text })}
        />

        <TextInput
          style={tw`text-[#FFFFFF] p-3 rounded-lg border border-[#555555] mt-4`}
          placeholder="Set a Password"
          placeholderTextColor="#979797"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        {errors.password && <Text style={tw`text-[#C23333] text-xs mt-1`}>{errors.password}</Text>}

        <TextInput
          style={tw`text-[#FFFFFF] p-3 rounded-lg border border-[#555555] mt-4`}
          placeholder="Re-enter Password"
          placeholderTextColor="#979797"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        />
        {errors.confirmPassword && <Text style={tw`text-[#C23333] text-xs mt-1`}>{errors.confirmPassword}</Text>}

        <View style={tw`flex-row items-center mt-6`}>
          <CheckBox
            value={agreeTerms}
            onValueChange={() => setAgreeTerms(!agreeTerms)}
            tintColors={{ true: '#65779E', false: '#979797' }}
          />
          <Text style={tw`text-[#FFFFFF] ml-2`}>
            I agree to all the <Text style={tw`text-[#65779E]`}>Terms</Text> and <Text style={tw`text-[#65779E]`}>Privacy Policies</Text>
          </Text>
        </View>
        {errors.terms && <Text style={tw`text-[#C23333] text-xs mt-1`}>{errors.terms}</Text>}

        <Button
          mode="contained"
          onPress={handleSignUp}
          style={[tw`rounded-lg mt-6`, { backgroundColor: '#1D1E23'  }]}
          contentStyle={tw`py-2`}
          labelStyle={[tw`text-lg`, { color: '#FFFFFF' }]}
        >
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : 'Sign Up'}
        </Button>

        <View style={tw`flex-row justify-center mt-8`}>
          <Text style={tw`text-[#FFFFFF]`}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-[#65779E] font-semibold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;