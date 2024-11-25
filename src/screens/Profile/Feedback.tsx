import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadialGradient } from 'react-native-gradients';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const FeedBackScreen: React.FC = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const colorList = [
    { offset: '0%', color: '#4956C7', opacity: '1' },
    { offset: '70%', color: '#111111', opacity: '1' },
    { offset: '100%', color: '#111111', opacity: '1' },
  ];

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback before submitting');
      return;
    }

    setLoading(true);
    try {
      const subject = encodeURIComponent('App Feedback');
      const body = encodeURIComponent(feedback);
      const mailtoUrl = `mailto:eliteaideio@gmail.com?subject=${subject}&body=${body}`;
      
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
        Alert.alert(
          'Thank you!',
          'Your email client has been opened with the feedback.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Error', 'Could not open email client');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open email client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`absolute inset-0`}>
        <RadialGradient
          colorList={colorList}
          x="50%"
          y="50%"
          rx="50%"
          ry="50%"
        />
      </View>

      <View style={tw`absolute inset-1 bg-[#000000] opacity-70`} />

      <TouchableOpacity
        style={tw`w-10 h-10 justify-center items-center mt-5 ml-5 bg-[#1D1E23] rounded-2xl`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={tw`text-white text-2xl font-semibold mt-[90px] text-center`}>Feedback</Text>
      <Text style={tw`text-[#979797] text-center mt-3 px-6`}>
        We value your feedback! Let us know how we can improve your experience.
      </Text>

      <View style={tw`mt-6 px-6`}>
        <TextInput
          style={[
            tw`bg-[#111111] text-white p-3 rounded-2xl border-[#6F6F6F] min-h-[120px]`,
            { borderWidth: 0.5 },
          ]}
          placeholder="Enter your feedback here..."
          placeholderTextColor="#6F6F6F"
          multiline
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[
          tw`bg-[#1D1E23] rounded-2xl mx-6 mt-6 py-3 items-center`,
          loading && tw`opacity-50`
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={tw`text-white text-base font-semibold`}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedBackScreen;