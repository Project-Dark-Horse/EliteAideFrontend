import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
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
    isLoading: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo, isLoading }) => {
    if (isLoading || !userInfo) {
        return <ActivityIndicator size="small" color="#4956C7" />;
    }

    const userData = userInfo.message.user_data;
    
    return (
        <View style={tw`w-full p-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
                {userData.first_name} {userData.last_name}
            </Text>
            <Text style={tw`text-gray-400`}>{userData.email}</Text>
            <Text style={tw`text-gray-400`}>{userData.mobile_number}</Text>
        </View>
    );
};

export default UserInfo;