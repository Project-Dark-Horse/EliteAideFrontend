import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000033',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1D1E23',
    borderRadius: 16,
    padding: 20,
    width: width * 0.9,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#384766',
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F8F8F8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#333333',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#384766',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#F8F8F8',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginVertical: 12,
    color: '#F8F8F8',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
  },
  selectedCategory: {
    backgroundColor: '#384766',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: width * 0.25,
    alignItems: 'center',
  },
  selectedPriority: {
    backgroundColor: '#384766',
  },
  priorityText: {
    fontWeight: '500',
    fontSize: 15,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#333333',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#384766',
  },
  timeText: {
    marginLeft: 12,
    color: '#F8F8F8',
    fontSize: 16,
  },
  reminderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#333333',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#384766',
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderText: {
    marginLeft: 12,
    color: '#F8F8F8',
    fontSize: 16,
  },
  toggleButton: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#333333',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#36AAB9',
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F8F8F8',
  },
  toggleCircleActive: {
    transform: [{ translateX: 18 }],
  },
  createButton: {
    backgroundColor: '#36AAB9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#F8F8F8',
    fontWeight: '600',
    fontSize: 17,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userMessageWrapper: {
    flexDirection: 'row-reverse',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  userAvatar: {
    // Any specific user avatar styles
  },
  messageBox: {
    padding: 10,
    borderRadius: 12,
  },
  aiMessageBox: {
    backgroundColor: '#F0F0F0', // or your preferred AI message background color
  },
  userMessageBox: {
    backgroundColor: 'transparent', // or your preferred user message background color
  },
  messageText: {
    color: '#000',
  },
  userMessageText: {
    color: '#fff',
  },
  chatTail: {
    width: 0,
    height: 0,
    position: 'absolute',
    borderStyle: 'solid',
  },
  aiChatTail: {
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: '#E8E8E8', // Match your AI message background color
    left: -8,
    bottom: 8,
  },
  userChatTail: {
    borderTopWidth: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderLeftColor: '#007AFF', // Match your user message background color
    right: -8,
    bottom: 8,
  },
  spacer: {
    width: 40, // Adjust this value based on your layout needs
  },
});