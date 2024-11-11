import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';

interface TileProps {
  title: string;
  onPress: () => void;
  image: ImageSourcePropType; // Use ImageSourcePropType for images
  backgroundColor: string;
}

const Tile: React.FC<TileProps> = ({ title, onPress, image, backgroundColor }) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[
      tw`flex-col items-center justify-center m-2 p-3 rounded-lg`,
      { width: 80, height: 78, backgroundColor },
    ]}
  >
    <View style={[
      tw`items-center justify-center rounded-lg p-2`,
      { borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderRadius: 10 }
    ]}>
      <Image source={image} style={tw`w-10 h-10`} resizeMode="contain" />
    </View>
    <Text style={tw`text-white text-xs font-semibold mt-2`}>{title}</Text>
  </TouchableOpacity>
);

export default Tile;