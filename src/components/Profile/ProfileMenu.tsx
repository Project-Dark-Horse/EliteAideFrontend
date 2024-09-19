import React from 'react';
import { View, Text, TouchableOpacity ,Dimensions} from 'react-native';
import tw  from 'twrnc'; // Ensure this import is correct based on your setup
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { Card, IconButton } from 'react-native-paper';

const { width } = Dimensions.get('window');


interface Menu {
    title: string;
    iconName: string; // Icon name as a string
    onPress: () => void; // Define an onPress callback function
}

const ProfileMenu: React.FC<Menu> = ({ title, iconName, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}style={tw`my-2`} >
         <Card style={[tw`rounded-2xl`, { width: width * 0.9, height: width * 0.125, backgroundColor: '#1e1e1e' }]}>
            <Card.Content style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                <Ionicons name={iconName} size={20} color="#979797" />
                
                <Text style={tw`text-[#979797] text-sm ml-3`}>
                    {title}
                </Text>
                </View>
                
                <Ionicons
                name="chevron-forward"
                size={15}
                color="F8F8F8"
                onPress={() => {
                    // Add navigation or action handler here
                    console.log(`${title} button pressed`);
                }}
                />
            </Card.Content>
    </Card>
      </TouchableOpacity>
    );
};

export default ProfileMenu;
