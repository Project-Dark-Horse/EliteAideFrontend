import React from 'react';
import { View, Text, Image } from 'react-native';
import GradientBorder from '../../../components/GradientBorder';
import { styles } from '../../Calendar/styles';
import BotAvatar from '../../../assets/bot.png';
import UserAvatar from '../../../assets/ManAvatar.png';

interface MessageBubbleProps {
  message: string;
  isAI: boolean;
}

const MessageBubble = ({ message, isAI }: MessageBubbleProps) => (
  <View style={[styles.messageWrapper, !isAI && styles.userMessageWrapper]}>
    {isAI ? (
      <Image source={BotAvatar} style={styles.aiAvatar} />
    ) : (
      <Image source={UserAvatar} style={[styles.aiAvatar, styles.userAvatar]} />
    )}
    <GradientBorder style={{ flex: 1, maxWidth: '80%' }} isUser={!isAI}>
      <View style={[styles.messageBox, isAI ? styles.aiMessageBox : styles.userMessageBox]}>
        <Text style={[styles.messageText, !isAI && styles.userMessageText]}>{message}</Text>
      </View>
      <View style={[styles.chatTail, isAI ? styles.aiChatTail : styles.userChatTail]} />
    </GradientBorder>
    {!isAI && <View style={styles.spacer} />}
  </View>
);

export default MessageBubble;