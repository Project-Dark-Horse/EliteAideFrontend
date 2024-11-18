import React, { useRef, useEffect, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';

interface WeekViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ selectedDate, onSelectDate }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const dates = useMemo(() => {
    const startDate = new Date(selectedDate);
    startDate.setDate(startDate.getDate() - 15);
    return Array.from({ length: 31 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return date;
    });
  }, [selectedDate]);

  useEffect(() => {
    if (scrollViewRef.current) {
      const index = dates.findIndex(date => date.toDateString() === selectedDate.toDateString());
      scrollViewRef.current.scrollTo({ x: 58 * index, animated: true });
    }
  }, [selectedDate, dates]);

  return (
    <View style={tw`py-4`}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-2`}
      >
        {dates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <View key={index} style={tw`mx-1 ${isSelected ? 'rounded-3xl overflow-hidden' : ''}`}>
              {isSelected ? (
                <LinearGradient
                  colors={['#16213C', '#3272A0', '#3272A0', '#3272A0', '#1E4E8D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={tw`w-14 h-20 justify-center items-center`}
                >
                  <View style={tw`bg-[#1C1C1E] w-12 h-18 rounded-3xl justify-center items-center`}>
                    <Text style={tw`text-white text-xs`}>
                      {daysOfWeek[date.getDay()]}
                    </Text>
                    <Text style={tw`text-white text-xl font-bold mt-1`}>
                      {date.getDate()}
                    </Text>
                  </View>
                </LinearGradient>
              ) : (
                <TouchableOpacity
                  onPress={() => onSelectDate(date)}
                  style={tw`items-center justify-center w-14 h-20`}
                >
                  <Text style={tw`text-[#86868B] text-xs`}>
                    {daysOfWeek[date.getDay()]}
                  </Text>
                  <Text style={tw`text-white text-xl font-bold mt-1`}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default React.memo(WeekView);