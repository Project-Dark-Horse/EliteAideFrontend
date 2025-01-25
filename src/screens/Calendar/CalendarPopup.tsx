// Assuming your CalendarPopup.tsx is in the src/components folder
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import formatDate from '../../utils/formatDate'; // Adjust the relative path as necessary
import { MarkedDates } from 'react-native-calendars/src/types';

interface CalendarPopupProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setIsCalendarVisible: (visible: boolean) => void;
  markedDates: Record<string, any>;
  theme?: any;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  selectedDate,
  setSelectedDate,
  setIsCalendarVisible,
  markedDates,
  theme = defaultTheme,
}) => {
  const onDayPress = (day: DateData) => {
    setSelectedDate(new Date(day.timestamp));
    setIsCalendarVisible(false);
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        current={formatDate(selectedDate)}
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType="dot"
        theme={theme}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  calendar: {
    borderRadius: 10,
  },
});

// Default theme
const defaultTheme = {
  backgroundColor: '#1c1c1e',
  calendarBackground: '#1c1c1e',
  textSectionTitleColor: '#8e8e93',
  selectedDayBackgroundColor: '#3a4d7c',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#3a4d7c',
  dayTextColor: '#ffffff',
  textDisabledColor: '#4c4c4e',
  dotColor: '#3272A0',
  selectedDotColor: '#ffffff',
  arrowColor: '#3a4d7c',
  monthTextColor: '#ffffff',
  textDayFontFamily: 'System',
  textMonthFontFamily: 'System',
  textDayHeaderFontFamily: 'System',
  textDayFontWeight: '400',
  textMonthFontWeight: '600',
  textDayHeaderFontWeight: '400',
  textDayFontSize: 16,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 13,
};

export default React.memo(CalendarPopup);