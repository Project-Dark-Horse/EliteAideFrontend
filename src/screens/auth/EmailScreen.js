import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import { Formik } from 'formik';
import { emailValidationSchema } from '../../validation/emailValidation';
import { checkEmailExists, sendOtp } from '../../services/emailService';
import { emailScreenStyles as styles } from '../../styles/emailScreenStyles';
import { debounce } from 'lodash';

const EmailScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  // Debounced function to check email existence
  const debouncedCheckEmailExists = debounce(async (email) => {
    if (emailValidationSchema.isValidSync({ email })) {
      const exists = await checkEmailExists(email);
      setEmailExists(exists);
    } else {
      setEmailExists(false); // Reset if email is empty
    }
  }, 300); // Adjust delay as needed

  const handleSubmit = async (values) => {
    setLoading(true);
    if (!emailExists) {
      const otpSent = await sendOtp(values.email);
      setLoading(false);
      if (otpSent) {
        navigation.navigate('OTPVerification', { email: values.email });
      } else {
        alert('Failed to send OTP');
      }
    } else {
      setLoading(false);
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
            onChangeText={(text) => {
              handleChange('email')(text);
              debouncedCheckEmailExists(text); // Call the debounced function
            }}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          {emailExists && <Text style={styles.errorText}>Email ID already exists</Text>}

          <Button title="Next" onPress={handleSubmit} disabled={loading || emailExists} />
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
