import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox, Button } from 'react-native-paper';
import RadialGradient from 'react-native-radial-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';  // Import Yup for validation

import tw from 'twrnc';

// Validation schema for registration input using Yup
const registerValidationSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  // For displaying errors

  const navigation = useNavigation();
  const route = useRoute();
  const { otp, email } = route.params || {};  // Destructure otp and email from the route params

  const screenHeight = Dimensions.get('window').height;
  const topSpacing = Math.min(screenHeight * 0.18, 144);

  // Function to register the user by making an API call
  const registerUser = async (email, otp, username, firstName, lastName, password) => {
      console.log(email,otp);
    try {
      const response = await fetch("https://elite-aide-git-v1-testing-elite-aide-backends-projects.vercel.app/v1/users/register/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
          username,
          first_name: firstName,
          last_name: lastName,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      return data;  // Assuming the API returns { success: true, accessToken, refreshToken }
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, error: error.message };
    }
  };

  // Handle registration process
  const handleRegister = async () => {
    setLoading(true);
    setError('');

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions.');
      setLoading(false);
      return;
    }

    try {
      // Validate the form data
      const values = { first_name: firstName, last_name: lastName, username, password, confirmPassword };
      await registerValidationSchema.validate(values, { abortEarly: false });

      // Register User
      const response = await registerUser(email, otp, username, firstName, lastName, password);

      if (response.success) {
        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
        alert('Registration successful');
        navigation.navigate('MainAppScreen');  // Navigate to the main screen
      } else {
        setError(response.error || 'Registration failed.');
      }
    } catch (validationError) {
      // Handle form validation errors
      setError(validationError.errors ? validationError.errors.join(', ') : validationError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-900`}>
      {/* UI components */}
      <View style={{ height: topSpacing }} />

      <View style={tw`px-3 flex-1`}>
        <TouchableOpacity style={tw`w-10 h-10 justify-center items-center top--20 bg-[#1D1E23] rounded-2xl`} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={tw`text-white text-3xl font-bold mb-3`}>Sign Up</Text>
        <Text style={tw`text-gray-400 mb-8`}>Ready to be your own boss?</Text>

        <View style={tw`flex-row mb-6`}>
          <TextInput
            style={tw`flex-1 text-white p-3 rounded-2xl mr-2 border border-gray-600`}
            placeholder="First Name"
            placeholderTextColor="#979797"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={tw`flex-1 text-white p-3 rounded-2xl ml-2 border border-gray-600`}
            placeholder="Last Name"
            placeholderTextColor="#979797"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
          placeholder="Username"
          placeholderTextColor="#979797"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={tw`text-white p-3 rounded-2xl mb-1 border border-gray-600`}
          placeholder="Set a Password"
          placeholderTextColor="#979797"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={tw`text-red-500 text-xs mb-4`}>
          Password should contain at least 8 characters, a number or symbol
        </Text>

        <TextInput
          style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
          placeholder="Re-enter Password"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={tw`flex-row items-center mb-4`}>
          <Checkbox
            status={agreeTerms ? 'checked' : 'unchecked'}
            onPress={() => setAgreeTerms(!agreeTerms)}
            color="#3b82f6"
          />
          <Text style={tw`text-white ml-2`}>
            I agree to all the <Text style={tw`text-[#65779E]`}>Terms</Text> and <Text style={tw`text-[#65779E]`}>Privacy Policies</Text>
          </Text>
        </View>

        {error ? <Text style={tw`text-red-500 text-xs mb-4`}>{error}</Text> : null}

        <Button
          mode="elevated"
          onPress={handleRegister}
          loading={loading}
          style={[tw`rounded-2xl top-5`, {
            shadowColor: 'grey',
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.15,
            shadowRadius: 0.5,
            elevation: 2,
            overflow: 'visible',
          }]}
          contentStyle={tw`py-1`}
          labelStyle={tw`text-sm text-white`}
          buttonColor="#1D1E23"
          elevation={5}
        >
          Sign Up
        </Button>

        <View style={tw`flex-row justify-center mt-8`}>
          <Text style={tw`text-white `}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-blue-500`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
