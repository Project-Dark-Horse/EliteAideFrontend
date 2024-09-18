// FormInput.js
import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';

const FormInput = ({ placeholder, secureTextEntry, value, handleChange, handleBlur, error, touched }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FormInput;
