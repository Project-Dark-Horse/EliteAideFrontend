import { BlurView } from '@react-native-community/blur';
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox, Button } from 'react-native-paper';
import RadialGradient from 'react-native-radial-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';
import tw from 'twrnc';

const API_URL = 'https://api.eliteaide.tech/v1/users/register/';

interface RouteParams {
  email: string;
  otp: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp = () => {
  // State management
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirmPassword: '' // Added for password confirmation
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Navigation and route
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute();
  const { email, otp } = route.params as RouteParams;

  useEffect(() => {
    if (email && otp) {
      setFormData(prev => ({
        ...prev,
        email,
        otp
      }));
    }
  }, [email, otp]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number and one symbol';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API call function
  const signUpUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password
        })
      });
      const result = await response.json();
      return { success: response.ok, data: result };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (!agreeTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Privacy Policy');
      return;
    }

    if (!validateForm()) {
      Alert.alert('Error', 'Please fix the form errors');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await signUpUser();
      
      if (response.success) {
        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-900`}>
      <RadialGradient
        style={tw`absolute inset-0`}
        colors={['#4956C7', '#111111', '#111111']}
        center={[330, 99]}
        radius={350}
      />

      <BlurView
        style={tw`absolute inset-1`}
        blurType="extraDark"
        blurAmount={100}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />
      <View style={tw`px-3 flex-1`}>
        <TouchableOpacity 
          style={tw`w-10 h-10 justify-center items-center bg-[#1D1E23] rounded-2xl mb-4`}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={tw`text-white text-3xl font-bold mb-3`}>Sign Up</Text>
        <Text style={tw`text-gray-400 mb-8`}>Ready to be your own boss?</Text>

        <View style={tw`flex-row mb-6`}>
          <TextInput
            style={tw`flex-1 text-white p-3 rounded-2xl mr-2 border border-gray-600`}
            placeholder="First Name"
            placeholderTextColor="#979797"
            value={formData.first_name}
            onChangeText={text => setFormData({ ...formData, first_name: text })}
          />
          <TextInput
            style={tw`flex-1 text-white p-3 rounded-2xl ml-2 border border-gray-600`}
            placeholder="Last Name"
            placeholderTextColor="#979797"
            value={formData.last_name}
            onChangeText={text => setFormData({ ...formData, last_name: text })}
          />
        </View>

        <TextInput
          style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
          placeholder="Username"
          placeholderTextColor="#979797"
          value={formData.username}
          onChangeText={text => setFormData({ ...formData, username: text })}
        />

        <TextInput
          style={tw`text-white p-3 rounded-2xl mb-1 border border-gray-600`}
          placeholder="Set a Password"
          placeholderTextColor="#979797"
          secureTextEntry
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
        />

        <Text style={tw`text-red-500 text-xs mb-4`}>
          Password should contain at least 8 characters, a number or symbol
        </Text>

        <TextInput
          style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
          placeholder="Re-enter Password"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={text => setFormData({ ...formData, confirmPassword: text })}
        />

        {errors.confirmPassword && (
          <Text style={tw`text-red-500 text-xs mb-4`}>
            {errors.confirmPassword}
          </Text>
        )}

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

        <Button
          mode="elevated"
          onPress={handleSignUp}
          style={tw`rounded-2xl mb-4`}
          labelStyle={tw`text-sm text-white`}
          buttonColor="#1D1E23"
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : 'Create Account'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
