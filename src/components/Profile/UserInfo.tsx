import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';

const avatarr = require('../../assets/ManAvatar.png');

const UserInfo: React.FC = () => {
    return (
        <LinearGradient
            colors={['#16213c', '#1d1e23', '#0b0c10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`w-full max-w-[90%] rounded-xl p-5 my-3 border border-[#1E4E8D] ml-0 shadow-lg shadow-white`}
        >
            <View style={tw`flex-row items-center`}>
                <Image
                    source={avatarr}
                    style={tw`w-16 h-16 rounded-full`}
                />
                <View style={tw`ml-7 flex-1`}>
                    <Text style={tw`text-white text-lg`}>Arush Gupta</Text>
                    <Text style={tw`text-[#979797] text-sm`}>arushguptaa12gmail.com</Text>
                    <Text style={tw`text-[#979797] text-sm`}>Marketing Manager</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

export default UserInfo;
