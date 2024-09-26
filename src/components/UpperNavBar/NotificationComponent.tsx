import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const NotificationsComponent: React.FC = () => {
  return (
    <View style={tw`flex-row justify-end items-center`}>
      <View style={tw`w-6 h-6 justify-center items-center mx-0`}>
        <Icon name="search" size={24} color="#646464" />
      </View>
      <View style={tw`w-6 h-6 justify-center items-center mx-5`}>
        <Icon name="notifications" size={24} color="#646464" />
      </View>
    </View>
  );
};

export default NotificationsComponent;
