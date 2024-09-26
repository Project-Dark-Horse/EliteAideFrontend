import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import { Formik } from 'formik';
import { emailValidationSchema } from '../../validation/emailValidation';
import { checkEmailExists } from '../../services/emailService';
import { emailScreenStyles as styles } from '../../styles/emailScreenStyles';
import { debounce } from 'lodash';
import { sendOtp } from '../../services/otpService';

const EmailScreen = ({ navigation, route }) => {
  const { key } = route.params;
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  // Debounced function to check email existence
  const debouncedCheckEmailExists = debounce(async (email) => {
    if (emailValidationSchema.isValidSync({ email })) {
      setLoading(true);
      const exists = await checkEmailExists(email);
      setEmailExists(exists);
      setEmailChecked(true);
      setLoading(false);
    } else {
      setEmailExists(false); // Reset if email is empty
      setEmailChecked(false);
    }
  }, 300); // Adjust delay as needed

  const handleSubmit = async (values) => {
    setLoading(true);
    if (!emailExists && key === 'Register' || emailExists && key === 'ForgotPass') {
      const otpSent = await sendOtp(values.email);
      setLoading(false);
      if (otpSent) {
        navigation.navigate('OTPVerification', { email: values.email, key });
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
      <Text style={styles.subtitle}>
        You will need to verify your email in the next step
      </Text>

      <Formik
        initialValues={{email: ''}}
        validationSchema={emailValidationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              onChangeText={text => {
                handleChange('email')(text);
                debouncedCheckEmailExists(text); // Call the debounced function
              }}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            {key === 'Register' && emailChecked && emailExists && (
              <Text style={styles.errorText}>Email ID already exists</Text>
            )}

            {key === 'ForgotPass' && emailChecked && !emailExists && (
              <Text style={styles.errorText}>Email ID doesn't exist</Text>
            )}
            <Button
              title="Next"
              onPress={handleSubmit}
              disabled={
                loading ||
                (key === 'Register' && emailChecked && emailExists) ||
                (key === 'ForgotPass' && emailChecked && !emailExists)
              }
            />
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
