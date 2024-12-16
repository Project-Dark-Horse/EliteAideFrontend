import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import the logo image
import LogoImage from '../../assets/vector.png';

// Add type definition for the navigation stack
type AuthStackParamList = {
  FPEnterOtp: { email: string };
  Login: undefined;
};

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .trim(),
});

const FPEnterEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [emailExists, setEmailExists] = useState(true);

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      setEmailExists(true);
      await emailValidationSchema.validate({ email });

      const checkResponse = await fetch(
        `${BASE_URL}v1/users/exists/?email=${encodeURIComponent(email)}`
      );
      
      const checkData = await checkResponse.json();
      console.log('Email check response:', checkData);

      if (!checkData.message.exists) {
        setEmailExists(false);
        setError('No account exists with this email address.');
        return;
      }

      const otpResponse = await fetch(`${BASE_URL}v1/users/otp/send/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpResponse.json();
      console.log('OTP response:', {
        status: otpResponse.status,
        data: otpData
      });

      if (otpResponse.ok) {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent',
          text2: 'Please check your email for the verification code.',
        });
        navigation.navigate('FPEnterOtp', { email });
      } else {
        setError(otpData.message || 'Failed to send verification code.');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-[#000000]`}>
      <LinearGradient
        colors={['rgba(73, 86, 199, 0.2)', '#000000']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        style={tw`absolute inset-0`}
      />

      <View style={tw`flex-1 px-6`}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={tw`mt-8 w-10 h-10 bg-[#1A1A1A]/80 rounded-full justify-center items-center`}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Animated.Image
          source={LogoImage}
          style={[
            tw`w-32 h-32 mt-8 mb-8`,
            { opacity: 0.9 }
          ]}
          resizeMode="contain"
        />

        <Text style={tw`text-white text-3xl font-bold mb-2`}>
          Forgot Password?
        </Text>
        
        <Text style={tw`text-[#979797] text-base mb-6`}>
          Don't worry! It happens. Please enter your registered email address.
        </Text>

        <View style={tw`mb-8`}>
          <TextInput
            style={[
              tw`bg-[#111111] text-white px-5 py-4 rounded-2xl border`,
              {
                fontSize: 16,
                letterSpacing: 0.5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
                borderColor: emailExists ? '#333333' : '#FF0000',
              },
              isFocused && styles.inputFocus,
              error && styles.inputError
            ]}
            placeholder="Enter your email address"
            placeholderTextColor="#6F6F6F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {error && (
            <Text style={tw`text-red-500 text-sm mt-2 ml-2`}>
              {error}
            </Text>
          )}
        </View>

        <LinearGradient
          colors={['#4956C7', '#1D1E23']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`rounded-xl overflow-hidden mb-6`}
        >
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={[
              tw`rounded-xl`,
              {
                backgroundColor: '#1D1E23',
                borderColor: '#323232',
                borderWidth: 1,
                borderRadius: 10,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 8,
              },
            ]}
            contentStyle={tw`h-12`}
            labelStyle={tw`text-white text-base font-medium`}
          >
            {loading ? 'Sending...' : 'Continue'}
          </Button>
        </LinearGradient>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={tw`flex-row justify-center items-center mt-8`}
        >
          <Text style={tw`text-[#979797] text-base`}>
            Remember your password?{' '}
          </Text>
          <Text style={tw`text-[#4956C7] font-semibold text-base`}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFocus: {
    borderColor: '#4956C7',
    borderWidth: 1,
    shadowColor: '#4956C7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  inputError: {
    borderColor: '#FF0000',
    borderWidth: 1,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  }
});

export default React.memo(FPEnterEmail);