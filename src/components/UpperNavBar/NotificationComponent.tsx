import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { HomeScreenNavigationProp } from '../../types/navigation';

const NotificationsComponent: React.FC = () => {
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={tw`flex-row justify-end items-center`}>
      <TouchableOpacity
        onPress={() => {
          console.log('Navigating to Notification');
          navigation.navigate('Notification');
          setPressed(!pressed);
        }}
      >
        <Icon name="notifications" size={24} color="#646464" />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsComponent;