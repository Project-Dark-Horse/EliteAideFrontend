import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Validation schema using Yup
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility

  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/v1/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Store the token securely using AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);

        console.log('Login successful, JWT token stored');
        // Navigate to your main app screen or dashboard
        navigation.navigate('MainAppScreen'); // Adjust to your main app screen
      } else {
        const errorData = await response.json();
        Alert.alert('Login failed', errorData.message || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Login failed', 'An error occurred');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elite Aide Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Email Field */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password Field with Eye Icon */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                secureTextEntry={!passwordVisible} // Toggles secure entry based on state
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon
                  name={passwordVisible ? 'visibility' : 'visibility-off'} // Toggles between eye and eye-off icon
                  size={24}
                  color="gray"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <Button title="Login" onPress={handleSubmit} />

            {/* "Don't have an account? Register" Text */}
            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Email')}>
                <Text style={styles.signupText}>Register</Text>
              </TouchableOpacity>
            </View>

            {/* "Forgot Password?" Text */}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Email')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
