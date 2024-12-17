import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Background from '../../components/Background';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ password: false, confirm: false });
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
    <Background>
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 px-6`}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={tw`mt-12 w-12 h-12 bg-[#1A1A1A]/80 rounded-full justify-center items-center`}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Image
            source={require('../../assets/vector.png')}
            style={tw`w-32 h-32 mt-8 mb-8`}
            resizeMode="contain"
          />

          <Text style={tw`text-white text-3xl font-bold mb-2`}>
            Set New Password
          </Text>
          
          <Text style={tw`text-[#979797] text-base mb-8`}>
            Create a strong password for your account
          </Text>

          <View style={tw`mb-4 relative`}>
            <TextInput
              style={[
                tw`bg-[#111111] text-white px-5 py-4 rounded-2xl border`,
                {
                  borderColor: isFocused.password ? '#4956C7' : '#333333',
                  fontSize: 16,
                  letterSpacing: 0.5,
                }
              ]}
              placeholder="New Password"
              placeholderTextColor="#6F6F6F"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
            />
            <TouchableOpacity 
              style={tw`absolute right-4 top-4`}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#6F6F6F" 
              />
            </TouchableOpacity>
          </View>

          <View style={tw`mb-8 relative`}>
            <TextInput
              style={[
                tw`bg-[#111111] text-white px-5 py-4 rounded-2xl border`,
                {
                  borderColor: isFocused.confirm ? '#4956C7' : '#333333',
                  fontSize: 16,
                  letterSpacing: 0.5,
                }
              ]}
              placeholder="Confirm Password"
              placeholderTextColor="#6F6F6F"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setIsFocused(prev => ({ ...prev, confirm: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, confirm: false }))}
            />
            <TouchableOpacity 
              style={tw`absolute right-4 top-4`}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#6F6F6F" 
              />
            </TouchableOpacity>
          </View>

          {newPassword && (
            <View style={tw`mb-6`}>
              <Text style={tw`text-[#979797] text-sm mb-2`}>Password must contain:</Text>
              <View style={tw`flex-row items-center mb-1`}>
                <Ionicons 
                  name={newPassword.length >= 8 ? "checkmark-circle" : "close-circle"} 
                  size={16} 
                  color={newPassword.length >= 8 ? "#4CAF50" : "#FF5252"} 
                />
                <Text style={tw`text-[#979797] text-sm ml-2`}>At least 8 characters</Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Ionicons 
                  name={/[A-Z]/.test(newPassword) ? "checkmark-circle" : "close-circle"} 
                  size={16} 
                  color={/[A-Z]/.test(newPassword) ? "#4CAF50" : "#FF5252"} 
                />
                <Text style={tw`text-[#979797] text-sm ml-2`}>At least one uppercase letter</Text>
              </View>
            </View>
          )}

          <LinearGradient
            colors={['#4956C7', '#1D1E23']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={tw`rounded-xl overflow-hidden`}
          >
            <Button
              mode="contained"
              onPress={resetPassword}
              loading={loading}
              disabled={loading || !newPassword || !confirmPassword}
              style={[
                tw`rounded-xl`,
                {
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 8,
                },
              ]}
              contentStyle={tw`h-14`}
              labelStyle={tw`text-white text-lg font-medium`}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </LinearGradient>
        </View>
      </View>
    </Background>
  );
};

export default React.memo(FPNewPassword);