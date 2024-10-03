import React from 'react';
import { View, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import tw from 'twrnc';

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr','Sat','Sun'];

const DaySelector = () => {
  return (
    <View style={tw`flex-row justify-around p-4`}>
      {days.map((day, index) => (
        <View key={index} style={tw`items-center`}>
          <Text style={tw`text-gray-400`}>{index + 1}</Text>
          <Chip
            mode="outlined"
            selected={day === 'Tu'}
            style={tw`bg-${day === 'Tu' ? 'blue-500' : 'gray-600'}`}
            textStyle={tw`text-white`}
          >
            {day}
          </Chip>
        </View>
      ))}
    </View>
  );
};

export default DaySelector;
