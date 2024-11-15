import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GradientBorder from '../../../components/GradientBorder';
import styles from './styles';

interface QuickRepliesProps {
  onActionSelect: (action: string) => void;
}

const QuickReplies = ({ onActionSelect }: QuickRepliesProps) => (
  <View style={styles.quickReplies}>
    {['Create task', 'Set a goal', 'Roast me', 'Show my day', 'Pending tasks'].map((action) => (
      <GradientBorder key={action}>
        <TouchableOpacity 
          style={styles.quickReplyButton}
          onPress={() => onActionSelect(action)}
        >
          <Text style={styles.quickReplyText}>{action}</Text>
        </TouchableOpacity>
      </GradientBorder>
    ))}
  </View>
);

export default QuickReplies; 