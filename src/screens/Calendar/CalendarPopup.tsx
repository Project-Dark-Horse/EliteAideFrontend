import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

interface CalendarPopupProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({ selectedDate, setSelectedDate, setIsCalendarVisible }) => {
  const onDayPress = (day: DateData) => {
    setSelectedDate(new Date(day.timestamp));
    setIsCalendarVisible(false);
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const markedDates = selectedDate
    ? { [formatDate(selectedDate)]: { selected: true, selectedColor: '#3a4d7c' } }
    : {};

  return (
    <View style={styles.calendarContainer} accessible accessibilityLabel="Calendar Popup">
      <Calendar
        current={formatDate(selectedDate)}
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#1c1c1e',
          calendarBackground: '#1c1c1e',
          textSectionTitleColor: '#8e8e93',
          selectedDayBackgroundColor: '#3a4d7c',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#3a4d7c',
          dayTextColor: '#ffffff',
          textDisabledColor: '#4c4c4e',
          dotColor: '#3a4d7c',
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
        }}
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

export default React.memo(CalendarPopup);