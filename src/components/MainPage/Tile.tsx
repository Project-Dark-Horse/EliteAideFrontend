import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from 'twrnc'; // Assuming you are using this for styling

interface TileComponentProp {
    title: string;
    onPress: () => void;
    image:any;
}


const Tile: React.FC<TileComponentProp> = ({ title, onPress , image}) => {
    return (
        <TouchableOpacity 
            style={tw`bg-[#1D1E23] rounded-xl  border-[0.10] border-[#4B6890] py-3 flex-1 items-center justify-center m-5`}
            onPress={onPress}
        >
            <View style={tw`items-center`}>
            <Image
                source={image} // Corrected path
                style={tw`w-8 h-10`}
              />
                 <Text style={tw`text-white text-sm mt-2`}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Tile;
