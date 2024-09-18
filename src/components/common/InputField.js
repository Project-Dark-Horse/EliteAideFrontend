import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { commonStyles as styles } from '../../styles/commonStyles'; // Import common styles

const InputField = ({ placeholder, onChangeText, onBlur, value, error }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;
