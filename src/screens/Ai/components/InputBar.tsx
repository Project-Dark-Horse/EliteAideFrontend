import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

interface InputBarProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: (text: string) => void;
  isLoading?: boolean;
}

const InputBar = ({ value, onChange, onSubmit, isLoading }: InputBarProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Type a message..."
        placeholderTextColor="#666"
        multiline
      />
      <TouchableOpacity
        style={[styles.sendButton, !value && styles.sendButtonDisabled]}
        disabled={!value || isLoading}
        onPress={() => onSubmit(value)}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <IconIonicons name="send" size={20} color="#FFFFFF" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  input: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#0A84FF',
  },
  sendButtonDisabled: {
    backgroundColor: '#2C2C2E',
  },
});

export default InputBar; 