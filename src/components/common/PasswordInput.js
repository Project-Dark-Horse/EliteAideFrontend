import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { commonStyles as styles } from '../../styles/commonStyles'; // Import common styles

const PasswordInput = ({ onChangeText, onBlur, value, error }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View>
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        secureTextEntry={!passwordVisible}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={24} color="gray" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PasswordInput;
