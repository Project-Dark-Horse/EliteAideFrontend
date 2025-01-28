import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';

const { width } = Dimensions.get('window');

interface Menu {
    title: string;
    iconName: string;
    onPress: () => void;
}

const ProfileMenu: React.FC<Menu> = ({ title, iconName, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={tw`my-2`}>
            <Card style={[tw`rounded-2xl px-4 py-2`, { width: width * 0.9, backgroundColor: '#1e1e1e', elevation: 2 }]}>
                <Card.Content style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row items-center`}>
                        <Ionicons name={iconName} size={22} color="#979797" />
                        <Text style={tw`text-[#F8F8F8] text-sm ml-3`}>{title}</Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#F8F8F8"
                    />
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

export default ProfileMenu;