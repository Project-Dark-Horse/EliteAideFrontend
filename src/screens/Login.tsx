import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://elite-aide-git-v1-testing-elite-aide-backends-projects.vercel.app/v1/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Store the token securely using AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);

        console.log('Login successful, JWT token stored');
        navigation.navigate('MainAppScreen');
      } else {
        const errorData = await response.json();
        Alert.alert('Login failed', errorData.message || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Login failed', 'An error occurred');
      console.error('Login error:', error);
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
              onChangeText={setEmail}
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
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={tw`absolute right-4 top-4`}
            >
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#979797" />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={tw`text-[#1D79BC] text-sm mt-3`}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            mode="elevated"
            onPress={handleLogin}
            style={[
              tw`rounded-2xl top-20`,
              {
                shadowColor: 'grey',
                shadowOffset: { width: 0, height: 0.5 },
                shadowOpacity: 0.15,
                shadowRadius: 0.5,
                elevation: 2,
                overflow: 'visible',
              },
            ]}
            contentStyle={tw`py-1`}
            labelStyle={tw`text-sm text-white`}
            buttonColor="#1D1E23"
          >
            Login
          </Button>

          {/* Create Account Link */}
          <View style={tw`flex-row justify-center top-25`}>
            <Text style={tw`text-white`}>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EnterEmail');
              }}
            >
              <Text style={tw`text-[#65779E] font-semibold`}>Create One</Text>
            </TouchableOpacity>
          </View>
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
