import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { BlurView } from '@react-native-community/blur';
import tw from 'twrnc';
import profilePic from '../../assets/ManAvatar.png';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ label, value, onChangeText, keyboardType }) => {
  return (
    <View style={{ 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingVertical: 12,
      paddingHorizontal: 16,
      width: 343,
      height: 72,
      backgroundColor: '#111111',
      borderColor: '#979797',
      borderWidth: 0.2,
      borderRadius: 16,
      marginBottom: 16,
    }}>
      <Text style={{ color: '#888888', fontSize: 12, marginBottom: 4 }}>{label}</Text>
      <TextInput
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          width: '100%',
          padding: 0,
        }}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#888888"
      />
    </View>
  );
};

const EditProfile: React.FC = () => {
  const [name, setName] = useState('Arush Kumar');
  const [username, setUsername] = useState('Arush');
  const [occupation, setOccupation] = useState('Marketing Manager');
  const [email, setEmail] = useState('arushkumardemo12@gmail.com');
  const [phone, setPhone] = useState('+91 99999 99999');

  return (
    <View style={[tw`flex-1`, { backgroundColor: '#111111' }]}>
      {/* Top-Right Gradient */}
      <RadialGradient
        style={tw`absolute inset-0`}
        colors={['#4956C7', '#111111', '#111111']}
        center={[330, 99]}
        radius={350}
      />

      {/* Main Blur effect over the entire background */}
      <BlurView
        style={tw`absolute inset-1`}
        blurType="extraDark"
        blurAmount={70}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.3)"
      />

      {/* Profile Picture Section with Two Placeholders */}
      <View style={tw`items-center mt-5`}>
        <View style={tw`flex-row items-center justify-center space-x-4 p-5`}>
          {/* Current Profile Image */}
          <Image source={profilePic} style={tw`w-16 h-16 rounded-full`} />
          
          {/* Second Placeholder (for edit/add option) */}
          <View style={tw`w-16 h-16 rounded-full bg-[#555555]`} />
        </View>
        <TouchableOpacity style={tw`mt-3`}>
          <Text style={tw`text-[#65779E] text-sm`}>Edit picture or avatar</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={tw`px-6 mt-5`}>
        <TextInputField label="Name" value={name} onChangeText={setName} />
        <TextInputField label="Username" value={username} onChangeText={setUsername} />
        <TextInputField label="Occupation" value={occupation} onChangeText={setOccupation} />
        <TextInputField label="Email id" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInputField label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      </View>
    </View>
  );
};

export default EditProfile;