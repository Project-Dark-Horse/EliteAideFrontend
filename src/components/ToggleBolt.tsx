import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ToggleBolt = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.toggleContainer}>
      <FontAwesome 
        name="bolt" 
        size={30} 
        color={isEnabled ? '#FFD700' : '#808080'} // Gold when enabled, gray when disabled
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default ToggleBolt;