import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import LogoImage from '../../assets/vector.png';

// Define your navigation stack type
type AuthStackParamList = {
  BottomTabNavigator: undefined;
  FPEnterEmail: undefined;
  EnterEmail: undefined;
  LoginScreen: undefined;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and Password cannot be blank.');
      return;
    }
  
    setLoading(true);
    try {
      console.log(`Requesting login at: ${BASE_URL}v1/users/login/`);
  
      const response = await fetch(`${BASE_URL}v1/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_or_username: email, password }),
      });
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok && data.message?.access) {
        const { access, refresh } = data.message;
  
        await AsyncStorage.setItem('access_token', access);
        await AsyncStorage.setItem('refresh_token', refresh);
  
        navigation.reset({ index: 0, routes: [{ name: 'BottomTabNavigator' }] });
      } else if (data.message === 'Token is blacklisted') {
        console.warn('Token is blacklisted. Clearing local tokens.');
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        Alert.alert('Session Expired', 'Please log in again.');
        navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation]);

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
        <TouchableOpacity
    onPress={() => {
      console.log('Navigating to ForgotPassword');
      navigation.navigate('FPEnterEmail');
    }}
    style={tw`mt-2`}
  >
    <Text style={tw`text-blue-300 text-left`}>Forgot Password?</Text>
  </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <LinearGradient
            colors={['#1D1E23', '#1D1E23']}
            style={[styles.buttonContent, styles.button3DEffect]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonLabel}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        

        <TouchableOpacity onPress={() => navigation.navigate('EnterEmail')} style={styles.linkContainer}>
        <Text style={tw`text-[#979797] mt-0`}>
            Don't have an account? <Text style={tw`text-[#65779E] font-semibold `}>Create One</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
  loginButton: {
    ...tw`rounded-xl mt-6`,
  },
  buttonContent: {
    ...tw`py-4 items-center`,
    borderRadius: 10,
  },
  button3DEffect: {
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  buttonLabel: {
    ...tw`text-sm text-white font-semibold`,
  },
  linkContainer: {
    ...tw`mt-0 items-center`,
  },
  linkText: {
    ...tw`text-blue-500 text-left`,
  },
});

export default React.memo(LoginScreen);