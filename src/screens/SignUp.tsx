import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, Dimensions } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import * as Yup from 'yup'; // For form validation
import { Formik } from 'formik'; // For form state management
import tw from 'twrnc'; // Tailwind for styling
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing tokens

const BASE_URL = "https://elite-aide-git-v1-testing-elite-aide-backends-projects.vercel.app/";

interface RouteParams {
  otp: string;
  email: string;
  key: string;
}

interface SignUpValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

type RootStackParamList = {
  Home: undefined;
  SignUp: RouteParams;
};

const SignUp = ({ route }: { route: RouteProp<RootStackParamList, 'SignUp'> }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'SignUp'>>();
  const screenHeight = Dimensions.get('window').height;
  const topSpacing = Math.min(screenHeight * 0.18, 144);
  const [loading, setLoading] = useState(false);

  const { otp, email, key } = route.params || {};

  useEffect(() => {
    if (!otp || !email || !key) {
      Alert.alert('Error', 'Missing required parameters for sign-up');
      navigation.goBack();
    }
  }, [otp, email, key]);

  // Validation schema for input fields
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Please confirm your password'),
    agreeTerms: Yup.bool().oneOf([true], 'You must agree to the terms and conditions'),
  });

  const handleSignUp = async (values: SignUpValues) => {
    setLoading(true);
    let response;
    try {
      const payload = {
        ...values,
        otp,
        email,
      };

      response = await fetch(`${BASE_URL}v1/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await AsyncStorage.setItem('accessToken', data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.refreshToken);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Home'); // Navigate to Home screen on success
      } else {
        Alert.alert('Error', data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
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
      <View style={{ height: topSpacing }} />

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <ScrollView style={tw`px-3 flex-1`}>
            <TouchableOpacity style={tw`w-10 h-10 justify-center items-center top--20 bg-[#1D1E23] rounded-2xl`} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>

            <Text style={tw`text-white text-3xl font-bold mb-3`}>Sign Up</Text>
            <Text style={tw`text-gray-400 mb-8`}>Ready to be your own boss?</Text>

            {/* First Name & Last Name */}
            <View style={tw`flex-row mb-6`}>
              <View style={tw`flex-1 mr-2`}>
                <TextInput
                  style={tw`text-white p-3 rounded-2xl border border-gray-600`}
                  placeholder="First Name"
                  placeholderTextColor="#979797"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                />
                {touched.firstName && errors.firstName && <Text style={tw`text-red-500 text-xs`}>{errors.firstName}</Text>}
              </View>
              <View style={tw`flex-1 ml-2`}>
                <TextInput
                  style={tw`text-white p-3 rounded-2xl border border-gray-600`}
                  placeholder="Last Name"
                  placeholderTextColor="#979797"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                />
                {touched.lastName && errors.lastName && <Text style={tw`text-red-500 text-xs`}>{errors.lastName}</Text>}
              </View>
            </View>

            {/* Username */}
            <TextInput
              style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
              placeholder="Username"
              placeholderTextColor="#979797"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
            {touched.username && errors.username && <Text style={tw`text-red-500 text-xs`}>{errors.username}</Text>}

            {/* Password */}
            <TextInput
              style={tw`text-white p-3 rounded-2xl mb-1 border border-gray-600`}
              placeholder="Password"
              placeholderTextColor="#979797"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && <Text style={tw`text-red-500 text-xs`}>{errors.password}</Text>}

            {/* Confirm Password */}
            <TextInput
              style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
              placeholder="Confirm Password"
              placeholderTextColor="#979797"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && <Text style={tw`text-red-500 text-xs`}>{errors.confirmPassword}</Text>}

            {/* Terms and Conditions */}
            <View style={tw`flex-row items-center mb-4`}>
              <Checkbox
                status={values.agreeTerms ? 'checked' : 'unchecked'}
                onPress={() => setFieldValue('agreeTerms', !values.agreeTerms)}
                color="#3b82f6"
              />
              <Text style={tw`text-white ml-2`}>
                I agree to all the <Text style={tw`text-blue-400`}>Terms</Text> and <Text style={tw`text-blue-400`}>Privacy Policies</Text>
              </Text>
            </View>
            {touched.agreeTerms && errors.agreeTerms && <Text style={tw`text-red-500 text-xs`}>{errors.agreeTerms}</Text>}

            {/* Submit Button */}
            <Button
              mode="elevated"
              onPress={() => handleSubmit()}
              style={tw`rounded-2xl top-5`}
              contentStyle={tw`py-1`}
              labelStyle={tw`text-sm text-white`}
              buttonColor="#1D1E23"
              elevation={5}
              loading={loading}
            >
              Sign Up
            </Button>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUp;
