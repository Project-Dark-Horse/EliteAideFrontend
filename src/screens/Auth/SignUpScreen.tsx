import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import RadialGradient from 'react-native-radial-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import CheckBox from '@react-native-community/checkbox';
import { SignUpScreenNavigationProp } from '../../types/navigation';
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

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}v1/users/check-email/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.ok;
};

const sendOtp = async (email: string): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}v1/users/send-otp/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.ok;
};

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
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    number: false,
    specialChar: false,
  });
  const [passwordStrength, setPasswordStrength] = useState('Weak');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const calculatePasswordStrength = (password: string): string => {
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*]/.test(password);

    const criteriaMet = [lengthCriteria, numberCriteria, specialCharCriteria].filter(Boolean).length;

    if (criteriaMet === 3) return 'Strong';
    if (criteriaMet === 2) return 'Moderate';
    return 'Weak';
  };

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
          { 
            text: 'OK', 
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          },
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
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        Toast.show({
          type: 'error',
          text1: 'Email already exists',
          text2: 'Please use a different email address'
        });
        return;
      }

      // Step 2: Send OTP
      const otpSent = await sendOtp(email);
      if (otpSent) {
        navigation.navigate('Otp', { email });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to send OTP',
          text2: 'Please try again'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: error instanceof Error ? error.message : 'Please enter a valid email'
      });
    }
  };

  const handleOtpNavigation = () => {
    navigation.navigate('Otp', { email });
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });

    // Update password criteria
    setPasswordCriteria({
      length: password.length >= 8,
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });

    // Calculate password strength
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);

    if (formData.confirmPassword && password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setFormData({ ...formData, confirmPassword });
    if (formData.password && formData.password !== confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <RadialGradient
        style={tw`absolute inset-0`}
        colors={['#4956C7', '#000000']}
        center={[330, 90]}
        radius={350}
      />
      <BlurView
        style={tw`absolute inset-1`}
        blurType="extraDark"
        blurAmount={100}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />
      
      <View style={tw`flex-1 px-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-8 h-8 justify-center items-center bg-[#1D1E23] rounded-xl mt-4`}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={tw`text-[#FFFFFF] text-2xl font-semibold mt-10`}>Sign Up</Text>
        <Text style={tw`text-[#979797] mt-1 text-sm`}>Ready to be your own boss?</Text>

        <View style={tw`flex-row mt-4`}>
          <TextInput
            style={tw`flex-1 text-[#FFFFFF] p-2 rounded-lg border border-[#555555] mr-1`}
            placeholder="First Name"
            placeholderTextColor="#979797"
            value={formData.first_name}
            onChangeText={(text) => setFormData({ ...formData, first_name: text })}
          />
          <TextInput
            style={tw`flex-1 text-[#FFFFFF] p-2 rounded-lg border border-[#555555] ml-1`}
            placeholder="Last Name"
            placeholderTextColor="#979797"
            value={formData.last_name}
            onChangeText={(text) => setFormData({ ...formData, last_name: text })}
          />
        </View>

        <TextInput
          style={tw`text-[#FFFFFF] p-2 rounded-lg border border-[#555555] mt-3`}
          placeholder="Username"
          placeholderTextColor="#979797"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
        />

        <TextInput
          style={tw`text-[#FFFFFF] p-2 rounded-lg border border-[#555555] mt-3`}
          placeholder="Mobile Number (Optional)"
          placeholderTextColor="#979797"
          value={formData.mobile_number}
          onChangeText={(text) => setFormData({ ...formData, mobile_number: text })}
        />

        <View style={tw`flex-row items-center mt-3`}>
          <TextInput
            style={tw`flex-1 text-[#FFFFFF] p-2 rounded-lg border border-[#555555]`}
            placeholder="Set a Password"
            placeholderTextColor="#979797"
            secureTextEntry={!isPasswordVisible}
            value={formData.password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={tw`absolute right-3`}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#979797"
            />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={tw`text-[#C23333] text-xs mt-1`}>{errors.password}</Text>}

        {/* Password Guide */}
        <View style={tw`mt-1`}>
          <Text style={tw`text-[#979797] text-xs`}>
            Password must contain:
          </Text>
          <Text style={tw`text-xs ${passwordCriteria.length ? 'text-[#3272A0]' : 'text-[#C23333]'}`}>
            - At least 8 characters
          </Text>
          <Text style={tw`text-xs ${passwordCriteria.number ? 'text-[#3272A0]' : 'text-[#C23333]'}`}>
            - At least one number
          </Text>
          <Text style={tw`text-xs ${passwordCriteria.specialChar ? 'text-[#3272A0]' : 'text-[#C23333]'}`}>
            - At least one special character (!@#$%^&*)
          </Text>
        </View>

        <TextInput
          style={tw`text-[#FFFFFF] p-2 rounded-lg border border-[#555555] mt-3`}
          placeholder="Re-enter Password"
          placeholderTextColor="#979797"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {errors.confirmPassword && <Text style={tw`text-[#C23333] text-xs mt-1`}>{errors.confirmPassword}</Text>}

        {/* Password Strength Indicator */}
        <Text style={tw`text-xs mt-1 ${passwordStrength === 'Weak' ? 'text-[#C23333]' : passwordStrength === 'Moderate' ? 'text-[#FFA500]' : passwordStrength === 'Strong' ? 'text-[#3272A0]' : 'text-[#00FF00]'}`}>
          Password Strength: {passwordStrength}
        </Text>

        <View style={tw`flex-row items-center mt-4`}>
          <CheckBox
            value={agreeTerms}
            onValueChange={() => setAgreeTerms(!agreeTerms)}
            tintColors={{ true: '#65779E', false: '#979797' }}
          />
          <Text style={tw`text-[#FFFFFF] ml-2 text-xs`}>
            I agree to all the <Text style={tw`text-[#65779E]`}>Terms</Text> and <Text style={tw`text-[#65779E]`}>Privacy Policies</Text>
          </Text>
        </View>
        {errors.terms && <Text style={tw`text-[#C23333] text-xs mt-1`}>{errors.terms}</Text>}

        <Button
          mode="contained"
          onPress={signUpUser}
          style={[
            tw`rounded-md mt-10`,
            {
              backgroundColor: '#1D1E23',
              borderWidth: 1,
              borderColor: '#555555',
              shadowColor: '#fff',
              shadowOffset: { width: 3, height: 4 },
              shadowOpacity: 0.9,
              shadowRadius: 9,
              elevation: 5, // For Android
            },
          ]}
          contentStyle={tw`py-1.5`}
          labelStyle={[tw`text-base`, { color: '#FFFFFF' }]}
        >
          {isLoading ? <ActivityIndicator color="#FFFFFF" /> : 'Sign Up'}
        </Button>

        <View style={tw`flex-row justify-center mt-1`}>
          <Text style={tw`text-[#FFFFFF] text-xs`}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-[#65779E] font-semibold text-xs`}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Step indicator */}
        <View style={tw`items-center mb-1 mt-5`}>
          <Text style={tw`text-[#979797] text-xs`}>
            Step <Text style={tw`text-[#65779E] font-semibold`}>3</Text>/3
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SignUpScreen);