import React from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../validation/loginValidation';
import { loginUser } from '../../services/authService';
import InputField from '../../components/common/InputField';
import PasswordInput from '../../components/common/PasswordInput';
import { loginScreenStyles as styles } from '../../styles/loginScreenStyles'; // Import styles for LoginScreen

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (values) => {
    const response = await loginUser(values.email, values.password);
    if (response.success) {
      navigation.navigate('MainAppScreen');
    } else {
      Alert.alert('Login failed', response.message);
    }
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
              error={touched.password && errors.password}
            />

            <Button title="Login" onPress={handleSubmit} />

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Email')}>
                <Text style={styles.signupText}>Create One</Text>
              </TouchableOpacity>
            </View>

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

export default LoginScreen;
