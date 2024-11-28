// src/screens/WelcomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/welcome-bg.png')}
      style={tw`flex-1 w-full h-full justify-center items-center`}
    >
      {/* Login Button */}
      <View style={[tw`absolute w-full px-6`, { top: 651 }]}>
        <Button
          mode="elevated"
          onPress={handleLogin}
          style={[
            tw`rounded-full self-center`,
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
      </View>

      {/* Create Account Link */}
      <View style={tw`flex-row justify-center top-85`}>
        <Text style={tw`text-white`}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('EnterEmail')}>
          <Text style={tw`text-[#65779E] font-semibold`}>Create One</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default React.memo(WelcomeScreen);