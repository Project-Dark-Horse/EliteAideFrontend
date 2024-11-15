import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

const AIScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handlePromptChange = (newPrompt: string) => {
    setPrompt((prevPrompt) => prevPrompt + ' ' + newPrompt);
  };

  const handleSubmit = async () => {
    // Check if all details are present
    if (!taskDetails.title || !taskDetails.dueDate) {
      console.error('Missing title or due date');
      return;
    }

    try {
      const token = await getAccessToken();
      const response = await axios.post(
        `${BASE_URL}/v1/tasks/prompts/`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Task created:', response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <View>
      <Text>Enter your task prompt:</Text>
      <TextInput
        value={prompt}
        onChangeText={handlePromptChange}
        placeholder="e.g., remind me to..."
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AIScreen; 