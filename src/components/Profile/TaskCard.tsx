import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ColorValue } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

interface TaskCardProps {
    task: Task;
    total: number;
    pending: number;
    done: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, total, pending, done }) => {
    return (
        <TouchableOpacity style={[tw`bg-[#1e1e1e] rounded-2xl mx-4 my-2`, { width: width * 0.9, height: width * 0.23 }]}>
            <View style={tw`px-4 py-2 flex-row justify-between items-center`}>
                <Text style={tw`text-[#979797] text-sm`}>Your tasks</Text>
                <Icon name="chevron-forward" size={15} color="white" />
            </View>
            <View style={tw`flex-row justify-evenly`}>
                {renderTaskIndicator('flash', '#4C9EFF', total, 'Total')}
                {renderTaskIndicator('alarm', '#C7643A', pending, 'Pending')}
                {renderTaskIndicator('checkmark-done', '#26BE2C', done, 'Done')}
            </View>
        </TouchableOpacity>
    );
};

const renderTaskIndicator = (
    iconName: string,
    iconColor: ColorValue,
    count: number,
    label: string
) => (
    <View style={tw`items-center`}>
        <View style={tw`flex-row items-center`}>
            <LinearGradient colors={gradientColors} style={styles.gradientCircle}>
                <Icon name={iconName} size={20} color={iconColor} />
            </LinearGradient>
            <View style={tw`ml-2`}>
                <Text style={tw`text-white text-sm`}>{count}</Text>
                <Text style={tw`text-[#979797] text-xs`}>{label}</Text>
            </View>
        </View>
    </View>
);

const gradientColors = ['#215490', '#1d3461', '#032871'];

const styles = StyleSheet.create({
    gradientCircle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TaskCard;