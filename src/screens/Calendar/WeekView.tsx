import React, { useRef, useEffect, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

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
            <TouchableOpacity
              key={index}
              onPress={() => onSelectDate(date)}
              style={tw`items-center justify-center w-14 h-20 mx-1
                ${isSelected ? 'bg-[#1C1C1E] rounded-3xl border-2 border-[#0A84FF]' : ''}`}
            >
              <Text style={tw`text-[#86868B] text-xs ${isSelected ? 'text-white' : ''}`}>
                {daysOfWeek[date.getDay()]}
              </Text>
              <Text style={tw`text-white text-xl font-bold mt-1`}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default React.memo(WeekView);