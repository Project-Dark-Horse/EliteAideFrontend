interface TaskSummaryProps {
    taskName: string;
    taskDescription: string;
    selectedDate: Date;
    selectedTime: Date;
    onSave: () => void;
  }
  
  const TaskSummary: React.FC<TaskSummaryProps> = ({
    taskName,
    taskDescription,
    selectedDate,
    selectedTime,
    onSave
  }) => {
    return (
      <View style={styles.taskSummary}>
        <View style={styles.taskSummaryHeader}>
          <Text style={styles.taskSummaryTitle}>{taskName}</Text>
        </View>
        <Text style={styles.taskSummaryDesc}>{taskDescription}</Text>
        <Text style={styles.taskSummaryTime}>
          {selectedDate.toLocaleDateString()} {selectedTime.toLocaleTimeString()}
        </Text>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default TaskSummary;