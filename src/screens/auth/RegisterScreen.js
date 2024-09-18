// RegisterScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/common/FormInput'
import { registerUser } from '../../services/authService';
import { registerScreenStyles as styles } from '../../styles/registerScreenStyles';

// Validation schema for registration input using Yup
const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const RegisterScreen = ({ navigation }) => {
  const handleRegister = async (values) => {
    const success = await registerUser(values.fullName, values.password);

    if (success) {
      console.log('Registration successful');
      // Navigate to Home Screen or another screen
    } else {
      alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Formik
        initialValues={{ fullName: '', password: '', confirmPassword: '' }}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <FormInput
              placeholder="Full Name"
              value={values.fullName}
              handleChange={handleChange('fullName')}
              handleBlur={handleBlur('fullName')}
              error={errors.fullName}
              touched={touched.fullName}
            />
            <FormInput
              placeholder="Password"
              secureTextEntry
              value={values.password}
              handleChange={handleChange('password')}
              handleBlur={handleBlur('password')}
              error={errors.password}
              touched={touched.password}
            />
            <FormInput
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              handleChange={handleChange('confirmPassword')}
              handleBlur={handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <Button title="Register" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;
