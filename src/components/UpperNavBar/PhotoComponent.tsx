import React from 'react';
import { View, Image } from 'react-native';
import tw from 'twrnc';

const avatarr = require('../../assets/ManAvatar.png');

const PhotoComponent: React.FC = () => {
  return (
    <View style={tw`flex-row justify-end items-center`}>
      <Image
        source={avatarr} // Corrected path
        style={tw`w-10 h-10 rounded-full ml-2.5`}
      />
    </View>
  );
};

export default PhotoComponent;
