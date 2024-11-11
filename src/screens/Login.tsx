import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';
import { BASE_URL } from '@env';

import LogoImage from '../assets/vector.png';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debugMessage, setDebugMessage] = useState('');

  // const handleLogin = async () => {
  //   setIsLoading(true);
  //   setDebugMessage('Starting login process...');

  //   try {
  //     // Log the request URL for debugging
  //     console.log(`Requesting login at: ${BASE_URL}v1/users/login/`);
  //     setDebugMessage(`Requesting login at: ${BASE_URL}v1/users/login/`);

  //     const response = await fetch(`${BASE_URL}v1/users/login/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email_or_username: email, password }),
  //     });

  //     // Log the response status
  //     console.log(`Response status: ${response.status}`);
  //     setDebugMessage(`Response status: ${response.status}`);

  //     const data = await response.json();
  //     console.log('Response data:', data);
  //     setDebugMessage(`Response data: ${JSON.stringify(data)}`);

  //     if (response.ok && data.message?.access) {
  //       const { access, refresh } = data.message;

  //       // Store the tokens in AsyncStorage
  //       await AsyncStorage.setItem('accessToken', access);
  //       await AsyncStorage.setItem('refreshToken', refresh);

  //       // Log success message and navigate
  //       console.log('Login successful, tokens stored.');
  //       setDebugMessage('Login successful, navigating to main screen...');
        
  //       navigation.navigate('BottomTabNavigator');
  //     } else {
  //       const errorMessage = data.message || 'An error occurred';
  //       console.error('Login failed:', errorMessage);
  //       setDebugMessage(`Login failed: ${errorMessage}`);
  //       Alert.alert('Login failed', errorMessage);
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setDebugMessage(`Login error: ${error.message}`);
  //     Alert.alert('Login failed', 'An error occurred');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleLogin = async () => {
    setIsLoading(true);
    setDebugMessage('Simulating login process...');
  
    try {
      // Simulated API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Mock data for successful login
      const mockResponse = {
        message: {
          access: 'mock_access_token',
          refresh: 'mock_refresh_token',
        },
      };
  
      console.log('Response data:', mockResponse);
      setDebugMessage(`Response data: ${JSON.stringify(mockResponse)}`);
  
      if (mockResponse.message?.access) {
        const { access, refresh } = mockResponse.message;
  
        // Store the tokens in AsyncStorage
        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
  
        // Log success message and navigate
        console.log('Login successful, tokens stored.');
        setDebugMessage('Login successful, navigating to main screen...');
        
        navigation.navigate('BottomTabNavigator');
      } else {
        const errorMessage = 'Simulated login failed: No access token';
        console.error(errorMessage);
        setDebugMessage(errorMessage);
        Alert.alert('Login failed', errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      setDebugMessage(`Login error: ${error.message}`);
      Alert.alert('Login failed', 'An error occurred');
    } finally {
      setIsLoading(false);
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

      {/* Logo Image */}
      <Image
        source={LogoImage}
        style={{
          position: 'absolute',
          top: 201.09,
          left: 20,
          width: 119.96,
          height: 54.53,
          transform: [{ rotate: '0.81deg' }],
        }}
      />

      <View style={tw`flex-1 justify-center px-6 bg-transparent mt-5`}>
        <TouchableOpacity
          style={tw`w-10 h-10 justify-center items-center top--39 bg-[#1D1E23] rounded-2xl`}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={tw`text-white text-2xl font-semibold mt-[90px]`}>Login</Text>
        <Text style={tw`text-[#979797] mt-3`}>Welcome back! Ready to be your own boss?</Text>

        {/* Email Input */}
        <View style={tw`mt-6`}>
          <TextInput
            style={[
              tw`bg-[#111111] text-sm text-white p-3 rounded-2xl border-[#6F6F6F]`,
              { borderWidth: 0.5 },
            ]}
            placeholder="Username or Email address"
            placeholderTextColor="#6F6F6F"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password Input */}
        <View style={tw`mt-4 relative`}>
          <TextInput
            style={[
              tw`bg-[#111111] text-white p-3 rounded-2xl border-[#6F6F6F]`,
              { borderWidth: 0.5 },
            ]}
            placeholder="Enter Password"
            placeholderTextColor="#6F6F6F"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={tw`absolute right-4 top-4`}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#979797" />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={tw`text-[#1D79BC] text-sm mt-3`}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button
          mode="elevated"
          onPress={handleLogin}
          loading={isLoading}
          style={[
            tw`rounded-2xl top-20`,
            {
              shadowColor: 'grey',
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.15,
              shadowRadius: 0.5,
              elevation: 2,
            },
          ]}
          contentStyle={tw`py-1`}
          labelStyle={tw`text-sm text-white`}
          buttonColor="#1D1E23"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        {/* Debug Message */}
        {debugMessage ? (
          <Text style={tw`text-red-500 text-xs mt-4`}>Debug: {debugMessage}</Text>
        ) : null}

        {/* Create Account Link */}
        <View style={tw`flex-row justify-center top-25`}>
          <Text style={tw`text-white`}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EnterEmail')}>
            <Text style={tw`text-[#65779E] font-semibold`}>Create One</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Gradient */}
      <LinearGradient
        style={tw`absolute bottom-0 left-0 right-0 h-[10%]`}
        colors={['rgba(17,17,17,0.2)', 'rgba(73,86,189,0.2)']}
      />
    </View>
  );
};

export default LoginScreen;