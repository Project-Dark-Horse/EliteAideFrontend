// src/screens/WelcomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import LoadingScreen from '../components/Loading/LoadingScreen';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/welcome-bg.png')}
      style={tw`flex-1 w-full h-full justify-center items-center`}
    >
      <LoadingScreen loading={loading} />
      {/* Grouped Login Button and Create Account Link */}
      <View style={[tw`absolute w-full px-6`, { top: 650, alignItems: 'center' }]}>
        {/* Login Button */}
        <Button
          mode="elevated"
          onPress={handleLogin}
          style={[
            tw`rounded-full`,
            {
              width: 300,
              height: 48,
              shadowColor: 'grey',
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.25,
              shadowRadius: 2,
              elevation: 2,
            },
          ]}
          contentStyle={tw`py-1`}
          labelStyle={tw`text-sm text-white`}
          buttonColor="#1D1E23"
        >
          Login
        </Button>

        {/* Create Account Link */}
        <View style={tw`flex-row justify-center mt-2`}>
          <Text style={tw`text-white`}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EnterEmail')}>
            <Text style={tw`text-[#65779E] font-semibold`}>Create One</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;