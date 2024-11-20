import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import avatarr from '../../assets/user.jpg';
import ProfileScreen from '../../screens/Profile/ProfileScreen';

type ProfileScreenNavigationProp = StackNavigationProp<{
  ProfileScreen: undefined;
}>;

const PhotoComponent: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={tw`flex-row justify-end items-center`}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Image
          source={avatarr} 
          style={tw`w-10 h-10 rounded-full ml-2.5`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PhotoComponent;
