import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderProps {
  onCalendarPress: () => void;
  onCreateTaskPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCalendarPress, onCreateTaskPress }) => (
  <View
    style={[
      tw`flex-row justify-between items-center mb-4 py-4 px-4 rounded-lg`,
      {
        backgroundColor: '#2C2C2E', // Dark background for header container
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
    ]}
  >
    {/* Date Section */}
    <TouchableOpacity onPress={onCalendarPress} style={tw`flex-row items-center`}>
      <Text style={tw`text-2xl text-white font-semibold`}>Today</Text>
      <Icon name="chevron-down" size={26} color="white" style={tw`ml-1`} />
    </TouchableOpacity>

    {/* Create Task Button with dual-tone gradient background */}
    <TouchableOpacity onPress={onCreateTaskPress}>
      <LinearGradient
        colors={['#4C669F', '#3B5998']}
        style={[
          tw`rounded-lg px-4 py-1 flex-row items-center`,
          {
            borderColor: '#3B5998', // Slightly darker shade for border
            borderWidth: 1,
          },
        ]}
      >
        <Text style={tw`text-sm font-semibold text-white`}>Create Task</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

export default React.memo(Header);