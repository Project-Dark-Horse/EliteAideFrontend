import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import PhotoComponent from './PhotoComponent';
import NotificationsComponent from '../UpperNavBar/NotificationComponent';

const TopNavBar: React.FC = () => {
  return (
    <View style={tw`w-full h-10 flex-row justify-between items-center bg-[#111111] px-2.5 mt-7`}>
      <PhotoComponent />
      <NotificationsComponent />
    </View>
  );
};

export default TopNavBar;
