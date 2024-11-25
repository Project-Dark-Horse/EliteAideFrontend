export const getIconName = (type: string): string => {
  switch (type) {
    case 'Work/Professional Tasks':
      return 'briefcase';
    case 'Meeting':
      return 'people';
    case 'Discussion':
      return 'chatbubble';
    case 'Review':
      return 'document-text';
    case 'Personal Tasks':
      return 'person';
    case 'Errands':
      return 'list';
    default:
      return 'notifications';
  }
};

export const getBackgroundColor = (type: string): string => {
  switch (type) {
    case 'Work/Professional Tasks':
      return '#4956C7';
    case 'Errands':
      return '#3C8FA9';
    default:
      return '#3D83AA';
  }
}; 