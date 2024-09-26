// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/common/FormInput'
import { forgotPassword, registerUser } from '../../services/authService';
import { registerScreenStyles as styles } from '../../styles/registerScreenStyles';
import PasswordInput from '../../components/common/PasswordInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation, route }) => {
  // Validation schema for registration input using Yup
  const registerValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const forgotPssValidationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const initialValues =
    key !== 'ForgotPass'
      ? {
          first_name: '',
          last_name: '',
          username: '',
          password: '',
          confirmPassword: '',
        }
      : {password: '', confirmPassword: ''};

  const {otp, email, key} = route.params;
  const [loading, setLoading] = useState(false);
  const handleRegister = async values => {
    setLoading(true);
    let response = null;
    if (key !== 'ForgotPass') {
      response = await registerUser(
        values.first_name,
        values.last_name,
        values.username,
        values.password,
        otp,
        email,
      );
      if (response.success) {
        // Handle successful registration
        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
        alert('Registration successful');
        // navigation.navigate('MainAppScreen');
      } else {
        // Handle registration failure (show error messages)
        if (response.error.email) {
          alert('Email error:', response.error.email);
        }
      }
    } else {
      response = await forgotPassword(values.password, otp, email);
      if (response.success)
      {
        alert('Password changed successfully');
        navigation.navigate('Login');
      }
      else
      {
        alert(response.error);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {key !== 'ForgotPass' ? 'Register' : 'Setup New Password'}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={(key=== "Register")?registerValidationSchema: forgotPssValidationSchema}
        onSubmit={handleRegister}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {key !== 'ForgotPass' && (
              <>
                <FormInput
                  placeholder="First Name"
                  value={values.first_name}
                  handleChange={handleChange('first_name')}
                  handleBlur={handleBlur('first_name')}
                  error={errors.first_name}
                  touched={touched.first_name}
                />
                <FormInput
                  placeholder="Last Name"
                  value={values.last_name}
                  handleChange={handleChange('last_name')}
                  handleBlur={handleBlur('last_name')}
                  error={errors.last_name}
                  touched={touched.last_name}
                />
                <FormInput
                  placeholder="Username"
                  value={values.username}
                  handleChange={handleChange('username')}
                  handleBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                />
              </>
            )}
            <PasswordInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
            />
            <PasswordInput
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={errors.confirmPassword}
            />
            <Button
              title={key !== 'ForgotPass' ? 'Register' : 'Save'}
              onPress={handleSubmit}
              disabled={loading}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;
