import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  calendarContainer: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthYearText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekDayText: {
    color: '#A1A1A4',
    fontSize: 13,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 4,
  },
  dayText: {
    color: '#D1D1D4',
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#0A84FF',
    borderRadius: 12,
    padding: 8,
  },
  selectedDayText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#333336',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    color: '#FFF',
    fontSize: 15,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },
});