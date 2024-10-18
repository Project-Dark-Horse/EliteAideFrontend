import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import  tw  from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';

const Ai: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '']);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <LinearGradient
        colors={['#000', '#1c1c1c', '#0d0d0d']}
        style={tw`absolute inset-0`}
      />
      <TouchableOpacity style={tw`mt-12 ml-5`}>
        <Text style={tw`text-white text-3xl`}>{'<'}</Text>
      </TouchableOpacity>
      <View style={tw`flex-1 justify-center items-center px-5`}>
        <Text style={tw`text-white text-base text-center mb-2`}>
          Enter the 4-digit code sent to demo@gmail.com
        </Text>
        <TouchableOpacity>
          <Text style={tw`text-blue-400 text-sm underline mb-7`}>Wrong address? Re-enter</Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-between w-[80%] mb-5`}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={tw`w-12 h-12 border border-blue-400 rounded-md text-center text-white text-xl`}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        <TouchableOpacity>
          <Text style={tw`text-blue-400 mb-7 text-center`}>Resend code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-[80%] bg-gray-800 rounded-full h-12 justify-center mb-5`}>
          <Text style={tw`text-white text-center text-lg`}>Continue</Text>
        </TouchableOpacity>
        <View style={tw`flex-row`}>
          <Text style={tw`text-gray-500 text-sm`}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={tw`text-blue-400 text-sm`}>Create One</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Ai;