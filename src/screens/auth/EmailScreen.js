import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import { Formik } from 'formik';
import { emailValidationSchema } from '../../validation/emailValidation';
import { checkEmailExists, sendOtp } from '../../services/emailService';
import { emailScreenStyles as styles } from '../../styles/emailScreenStyles'; // Import styles

const EmailScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); // State to track loading

  const handleSubmit = async (values) => {
    setLoading(true);
    const emailExists = await checkEmailExists(values.email);
    setLoading(false);
    if (!emailExists) {
      const otpSent = await sendOtp(values.email);
      if (otpSent) {
        navigation.navigate('OTPVerification', { email: values.email });
      } else {
        alert('Failed to send OTP');
      }
    } else {
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
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Button title="Next" onPress={handleSubmit} disabled={loading} />
            <View style={styles.loginContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EmailScreen;
