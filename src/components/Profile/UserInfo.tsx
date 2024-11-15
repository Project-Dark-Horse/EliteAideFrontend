import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';

const avatarr = require('../../assets/ManAvatar.png');

interface UserInfoProps {
    userInfo: {
        message: {
            user_data: {
                email: string;
                username: string;
                first_name: string;
                last_name: string;
                mobile_number: string;
            };
        };
    };
    isLoading?: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo, isLoading }) => {
    if (isLoading) {
        return (
            <LinearGradient
                colors={['#16213c', '#1d1e23', '#0b0c10']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`w-full max-w-[90%] rounded-xl p-5 my-3 border border-[#1E4E8D] ml-0 shadow-lg shadow-white`}
            >
                <Text style={tw`text-white text-center`}>Loading profile...</Text>
            </LinearGradient>
        );
    }

    const userData = userInfo?.message?.user_data;

    if (!userData) {
        return (
            <LinearGradient
                colors={['#16213c', '#1d1e23', '#0b0c10']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`w-full max-w-[90%] rounded-xl p-5 my-3 border border-[#1E4E8D] ml-0 shadow-lg shadow-white`}
            >
                <Text style={tw`text-white text-center`}>No profile data available</Text>
            </LinearGradient>
        );
    }

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
                    <Text style={tw`text-white text-lg`}>
                        {`${userData.first_name} ${userData.last_name}`}
                    </Text>
                    <Text style={tw`text-[#979797] text-sm`}>{userData.email}</Text>
                    <Text style={tw`text-[#979797] text-sm`}>{userData.username}</Text>
                    <Text style={tw`text-[#979797] text-sm`}>{userData.mobile_number}</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

export default UserInfo;