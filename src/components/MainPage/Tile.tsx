import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from 'twrnc'; // Assuming you are using this for styling

interface TileComponentProp {
    title: string;
    onPress: () => void;
}

const Tile: React.FC<TileComponentProp> = ({ title, onPress }) => {
    return (
        <TouchableOpacity 
            style={tw`bg-[#1E1E1E] rounded-xl  border-[0.15] border-[#4B6890] py-4 flex-1 items-center justify-center m-5`}
            onPress={onPress}
        >
            <View style={tw`items-center`}>
                <Ionicons name="clipboard" size={24} color="#4F46E5" />
                <Text style={tw`text-white text-sm mt-2`}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Tile;
