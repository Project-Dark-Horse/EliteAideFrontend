import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { HomeScreenNavigationProp } from '../../types/navigation';


const NotificationsComponent: React.FC = () => {
  const [pressed, setPressed] = useState(false)

  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  return (
    <View style={tw`flex-row justify-end items-center`}>
      <View style={tw`w-6 h-6 justify-center items-center mx-0`}>
        <Icon name="search" size={24} color="#646464" />
      </View>
      <View style={tw`w-6 h-6 justify-center items-center mx-5`}>
        <TouchableOpacity 
              onPress={() => {
                console.log('hello');
                navigation.navigate('Notifications')
                setPressed(!pressed);
                // Add any navigation logic here
              }}
        >
             <Icon name="notifications" size={24} color="#646464" />

        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationsComponent;