import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';

const BottomGradient = () => (
  <LinearGradient
    style={tw`absolute bottom-0 left-0 right-0 h-[15%]`}
    colors={['rgba(17,17,17,0.2)','rgba(73,86,189,0.2)']}
  />
);

export default BottomGradient;