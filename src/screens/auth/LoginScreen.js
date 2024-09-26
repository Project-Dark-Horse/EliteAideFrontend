import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../validation/loginValidation';
import { loginUser } from '../../services/authService';
import InputField from '../../components/common/InputField';
import PasswordInput from '../../components/common/PasswordInput';
import { loginScreenStyles as styles } from '../../styles/loginScreenStyles'; // Import styles for LoginScreen
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values) => {
    setLoading(true);
    const response = await loginUser(values.email, values.password);
    if (response.success) {
      
      // Handle successful login
      await AsyncStorage.setItem('accessToken', response.accessToken);
      await AsyncStorage.setItem('refreshToken', response.refreshToken);
      alert('Login successful');
      // navigation.navigate('MainAppScreen');
    }
    else {
      // Handle login failure (show error messages)
      if (response.error) {
        alert('Login error:', response.error);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.welcomeText}>Welcome back! Ready to be your own boss?</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <InputField
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email}
            />
            <PasswordInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder = {'Password'}
              error={touched.password && errors.password}
            />
              <Button
                title="Login"
                onPress={handleSubmit}
                disabled={loading}
              />
            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Email', { key: 'Register'})}>
                <Text style={styles.signupText}>Create One</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Email', {key: 'ForgotPass'})}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
