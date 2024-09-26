import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox, Button } from 'react-native-paper';
import RadialGradient from 'react-native-radial-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';

import tw from 'twrnc';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenHeight = Dimensions.get('window').height;
  const topSpacing = Math.min(screenHeight * 0.18, 144); 
  const [pressed, setPressed] = useState(false)


  const handleSignUp = () => {
    // Implement sign up logic here
    console.log('Sign up attempt');
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

        <View style={tw`px-3 flex-1`}>

        <TouchableOpacity style={tw`w-10 h-10 justify-center items-center top--20 bg-[#1D1E23] rounded-2xl`}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

          <Text style={tw`text-white text-3xl font-bold mb-3`}>Sign Up</Text>
          <Text style={tw`text-gray-400 mb-8`}>Ready to be your own boss?</Text>
          
          <View style={tw`flex-row mb-6`}>
            <TextInput
              style={tw`flex-1 text-white p-3 rounded-2xl mr-2 border border-gray-600`}
              placeholder="First Name"
              placeholderTextColor="#979797"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={tw`flex-1 text-white p-3 rounded-2xl ml-2 border border-gray-600`}
              placeholder="Last Name"
              placeholderTextColor="#979797"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          
          <TextInput
            style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
            placeholder="Username"
            placeholderTextColor="#979797"
            value={username}
            onChangeText={setUsername}
          />
          
          <TextInput
            style={tw`text-white p-3 rounded-2xl mb-1 border border-gray-600`}
            placeholder="Set a Password"
            placeholderTextColor="#979797"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <Text style={tw`text-red-500 text-xs mb-4`}>
            Password should contain at least 8 characters, a number or symbol
          </Text>
          
          <TextInput
            style={tw`text-white p-3 rounded-2xl mb-4 border border-gray-600`}
            placeholder="Re-enter Password"
            placeholderTextColor="#6b7280"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          
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
              onPress={() => {
              console.log('hello');
              navigation.navigate('EnterEmail')
              setPressed(!pressed);
              // Add any navigation logic here
            }}
            style={[tw`rounded-2xl top-5`, { 

                shadowColor: 'grey', 
                shadowOffset: { width: 0, height: 0.5 }, 
                shadowOpacity: 0.15, 
                shadowRadius: 0.5, 
                elevation: 2,
                overflow:'visible'
              }]}
            contentStyle={tw`py-1`}
            labelStyle={tw`text-sm text-white`}
            buttonColor="#1D1E23"
            elevation={5}
          >
           Sign Up 
          </Button>
          
          <View style={tw`flex-row justify-center mt-8`}>
            <Text style={tw`text-white `}>Already have an account? </Text>
            <TouchableOpacity onPress={() => {
              console.log('hello');
              navigation.navigate('EnterEmail')
              setPressed(!pressed);
              // Add any navigation logic here
            }}>
              <Text style={tw`text-blue-500`}>Login</Text>
            </TouchableOpacity>
          </View>
         

        </View>
        <LinearGradient
        style={tw`absolute bottom-0 left-0 right-0 h-[10%]`} // Subtle bottom gradient height (10% of screen)
        colors={['rgba(17,17,17,0.2)','rgba(73,86,189,0.2)']} // Reduced opacity with RGBA values
      />
    </SafeAreaView>
  );
};

export default SignUp;