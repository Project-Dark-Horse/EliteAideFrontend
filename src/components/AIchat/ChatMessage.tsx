import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ChatMessageProps {
  message: string;
  isAI?: boolean;
}

const ChatMessage = ({message, isAI = true}: ChatMessageProps) => {
  return (
    <View style={[styles.container, !isAI && styles.userContainer]}>
      {isAI && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🤖</Text>
        </View>
      )}
      <View style={[styles.messageBox, !isAI && styles.userMessageBox]}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontSize: 20,
  },
  messageBox: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 12,
    maxWidth: '80%',
  },
  userMessageBox: {
    backgroundColor: '#0A84FF',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default ChatMessage;