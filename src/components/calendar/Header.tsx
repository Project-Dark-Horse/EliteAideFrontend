import React from 'react';
import { Appbar, Button } from 'react-native-paper';
import { View } from 'react-native';
import tw from 'twrnc';

const Header = () => {
  return (
    <Appbar.Header style={tw`bg-[#111111] mt-4`}>
      <Appbar.Content title="Today" titleStyle={tw`text-white text-lg`} />
      <Button
        mode="elevated"
        dark
        style={tw`mr-2 bg-[#1D1E23] px-4` }
        onPress={() => console.log('Create task')}
      >
        Create task
      </Button>
    </Appbar.Header>
  );
};

export default Header;
