import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema for email input using Yup
const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const EmailScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); // State to track loading

  // Function to check if the email already exists
  const checkEmailExists = async (email) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`http://localhost:8080/api/users/exists/?email=${email}`);
      const data = await response.json();
      
      // Return true if email exists, false otherwise
      return ;
    } catch (error) {
      console.log('Error checking email:', error);
      return false; // Consider the email as not existing in case of an error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to send OTP
  const sendOtp = async (email) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://localhost:8080/api/users/otp/send/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.status === 200) {
        return true; // OTP sent successfully
      } else {
        console.log('Failed to send OTP');
        return false; // Failed to send OTP
      }
    } catch (error) {
      console.log('Error sending OTP:', error);
      return false; // Consider OTP sending as failed in case of an error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = async (values) => {
    const emailExists = await checkEmailExists(values.email);

    if (!emailExists) {
      // Send OTP if email does not exist
      const otpSent = await sendOtp(values.email);

      if (otpSent) {
        // Navigate to the OTP Verification screen if OTP is sent successfully
        navigation.navigate('OTPVerification', { email: values.email });
      } else {
        alert('Failed to send OTP');
      }
    } else {
      // Show validation error if email already exists
      alert('Email ID already exists');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your email address</Text>
      <Text style={styles.subtitle}>You will need to verify your email in the next step</Text>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={emailValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Email Input Field */}
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Disable button if loading */}
            <Button
              title="Next"
              onPress={handleSubmit}
              disabled={loading} // Disable the button if loading
            />

            {/* Already have an account? Login */}
            <View style={styles.loginContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>Login</Text>
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
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default EmailScreen;
