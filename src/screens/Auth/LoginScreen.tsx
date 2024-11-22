import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

import LogoImage from '../../assets/vector.png';

import { StackNavigationProp } from '@react-navigation/stack';

// Define your navigation stack type
type AuthStackParamList = {
  BottomTabNavigator: undefined; // Add other routes as needed
  ForgotPassword: undefined;
  EnterEmail: undefined;
};

// Update the component to use the typed navigation prop
const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debugMessage, setDebugMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email/Username and Password cannot be blank.');
      return; // Prevent login attempt if fields are empty
    }

    try {
      console.log(`Requesting login at: ${BASE_URL}v1/users/login/`);

      const response = await fetch(`${BASE_URL}v1/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_or_username: email, password }),
      });

      console.log(`Response status: ${response.status}`);
      

      const data = await response.json();
      console.log('Response data:', data);
      

      if (response.ok && data.message?.access) {
        const { access, refresh } = data.message;

        await AsyncStorage.setItem('access_token', access);
        console.log('Access token stored:', access);

        await AsyncStorage.setItem('refresh_token', refresh);
        console.log('Refresh token stored:', refresh);

        navigation.reset({ index: 0, routes: [{ name: 'BottomTabNavigator' }] });
      } else {
        console.error('Login failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error);
        setDebugMessage(`Login error: ${error.message}`);
      } else {
        console.error('Login error:', error);
        setDebugMessage('Login error: An unknown error occurred');
      }
      Alert.alert('Login failed', 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <RadialGradient
        style={styles.radialGradient}
        colors={['#4956C7', '#111111', '#111111']}
        center={[330, 99]}
        radius={350}
      />
      <BlurView
        style={styles.blurView}
        blurType="extraDark"
        blurAmount={70}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />

      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logoImage} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back! Ready to be your own boss?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username or Email address"
            placeholderTextColor="#6F6F6F"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#6F6F6F"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#979797" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => {
          console.log('Navigating to ForgotPassword');
          navigation.navigate('ForgotPassword');
        }}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          mode="elevated"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          buttonColor="#1D1E23"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        {debugMessage ? (
          <Text style={styles.debugMessage}>Debug: {debugMessage}</Text>
        ) : null}

        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EnterEmail')}>
            <Text style={styles.createAccountLink}>Create One</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        style={styles.bottomGradient}
        colors={['rgba(17,17,17,0.2)', 'rgba(73,86,189,0.2)']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radialGradient: {
    ...tw`absolute inset-0`,
  },
  blurView: {
    ...tw`absolute inset-1`,
  },
  logoImage: {
    width: 120,
    height: 55,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  content: {
    ...tw`flex-1 justify-center px-6 bg-transparent mt-5`,
  },
  backButton: {
    ...tw`w-10 h-10 justify-center items-center top--39 bg-[#1D1E23] rounded-2xl`,
  },
  title: {
    ...tw`text-white text-2xl font-semibold mt-4`,
  },
  subtitle: {
    ...tw`text-[#979797] mt-3`,
  },
  inputContainer: {
    ...tw`mt-6`,
  },
  input: {
    ...tw`bg-[#111111] text-sm text-white p-3 rounded-2xl border-[#6F6F6F]`,
    borderWidth: 0.5,
  },
  eyeIcon: {
    ...tw`absolute right-4 top-4`,
  },
  forgotPassword: {
    ...tw`text-[#1D79BC] text-sm mt-3`,
  },
  loginButton: {
    ...tw`rounded-2xl top-20`,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    elevation: 2,
  },
  buttonContent: {
    ...tw`py-1`,
  },
  buttonLabel: {
    ...tw`text-sm text-white`,
  },
  debugMessage: {
    ...tw`text-red-500 text-xs mt-4`,
  },
  createAccountContainer: {
    ...tw`flex-row justify-center top-25`,
  },
  createAccountText: {
    ...tw`text-white`,
  },
  createAccountLink: {
    ...tw`text-[#65779E] font-semibold`,
  },
  bottomGradient: {
    ...tw`absolute bottom-0 left-0 right-0 h-[10%]`,
  },
});

export default LoginScreen;