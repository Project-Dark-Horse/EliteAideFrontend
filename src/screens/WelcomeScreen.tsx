import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';

const WelcomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [pressed, setPressed] = useState(false);

  return (
    <ImageBackground
      // eslint-disable-next-line no-undef
      source={require('../assets/welcome-bg.png')} // Replace with your background image path
      style={styles.container}
    >
      {/* Welcome Text Section (commented out if not used) */}
      {/* <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to Elite Aide</Text>
        <Text style={styles.descriptionText}>
          Where your tasks find order, and productivity meets ease.
        </Text>
      </View> */}

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BottomTabNavigator');
            setPressed(!pressed);
          }}
          style={[tw`rounded-2xl`, styles.loginButton]}
        >
          <Text style={tw`text-sm text-white text-center`}>Login</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <View style={tw`flex-row justify-center mt-4`}>
          <Text style={tw`text-white`}>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              
              navigation.navigate('EnterEmail');
              setPressed(!pressed);
            }}
          >
            <Text style={tw`text-[#65779E] font-semibold`}>Create One</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '20%', // Adjust this value to control vertical positioning
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#1D1E23',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  welcomeSection: {
    position: 'absolute',
    top: '30%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#979797',
    textAlign: 'center',
  },
});

export default WelcomeScreen;