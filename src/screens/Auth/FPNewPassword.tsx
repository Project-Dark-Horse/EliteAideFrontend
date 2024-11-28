import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteParams = {
  email: string;
  otp: string;
};

type AuthStackParamList = {
  Login: undefined;
};

const FPNewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute();
  const { email, otp } = route.params as RouteParams;

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'New password and confirm password must match',
      });
      return;
    }

    if (newPassword.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password',
        text2: 'Password must be at least 8 characters long',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}v1/users/forgot-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password has been reset successfully',
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.message || 'Failed to reset password',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-[#000000] p-6`}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={tw`mt-12 w-12 h-12 bg-[#1A1A1A] rounded-full justify-center items-center`}
      >
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={tw`text-white text-3xl font-semibold mt-12 mb-2`}>
        Set New Password
      </Text>
      
      <Text style={tw`text-[#979797] text-base mb-8`}>
        Please enter your new password
      </Text>

      <TextInput
        style={tw`bg-[#111111] text-white px-4 py-4 rounded-xl mb-4 border border-[#333333]`}
        placeholder="New Password"
        placeholderTextColor="#6F6F6F"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={tw`bg-[#111111] text-white px-4 py-4 rounded-xl mb-8 border border-[#333333]`}
        placeholder="Confirm Password"
        placeholderTextColor="#6F6F6F"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        mode="contained"
        onPress={resetPassword}
        loading={loading}
        disabled={loading}
        style={tw`rounded-full bg-[#1A1A1A]`}
        contentStyle={tw`h-14`}
        labelStyle={tw`text-white text-lg font-medium`}
      >
        {loading ? 'Resetting Password...' : 'Reset Password'}
      </Button>
    </View>
  );
};

export default React.memo(FPNewPassword);