import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  titleInput: {
    fontSize: 18,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 10,
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    marginRight: 10,
  },
  timeContainer: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 10,
  },
  timeInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 10,
  },
  dateTimeText: {
    color: '#fff',
    fontSize: 16,
  },
  descriptionInput: {
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 10,
    marginBottom: 20,
    minHeight: 60,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  selectedCategory: {
    borderWidth: 1,
    borderColor: '#4169E1',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  priorityContainer: {
    marginBottom: 20,
  },
  prioritySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 16,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },// ... existing styles ...
  priorityDropdown: {
    backgroundColor: '#fff', // Example background color
    borderRadius: 5,
    padding: 10,

  },
  autocompleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // ... existing styles ...
icon: {
  width: 20, // Example width
  height: 20, // Example height
  // Add any other styles you need
},
// Add this style definition to your styles object
priorityDropdownItem: {
  padding: 10,
  backgroundColor: '#fff', // Adjust as needed
  borderRadius: 5,
  // Add any other styles you need
},
});