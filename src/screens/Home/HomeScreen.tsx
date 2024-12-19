import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Text, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import CustomMessageComponent from '../../components/HomePage/message';
import Tile from '../../components/HomePage/Tile';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../types/navigation';
import UpcomingTasksComponent from '../../components/HomePage/UpcomingTasks';
import PinnedTasks from '../../components/HomePage/PinnedTasks';
import TopNavBar from '../../components/UpperNavBar/TopNavBar';
// import GreetingPopup from './GreetingPopup';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import TodoImage from '../../assets/todo.png';
import ProgressImage from '../../assets/progress.png';
import DoneImage from '../../assets/done.png';
import BotImage from '../../assets/bot.png';
import { BaseTask, FormattedTask } from '../../types/Task';
import { getIconName } from '../../utils/taskUtils';

interface TaskStatistics {
  total: number;
  pending: number;
  completed: number;
}

interface Task extends BaseTask {
  status: string;
  due_date: string;
  type: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);
  const [showProgressOverlay, setShowProgressOverlay] = useState(false);
  const [taskStats, setTaskStats] = useState<TaskStatistics>({
    total: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) return;

        // Get current date and time
        const now = new Date();
        
        
        // Set end date to 7 days from now
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 12);

        const startDate = now.toISOString().split('T')[0];
        const endDate = nextWeek.toISOString().split('T')[0];

        // Properly append query parameters to URL
        const url = `${BASE_URL}v1/tasks/range?start_date=${startDate}&end_date=${endDate}`;
        
        console.log('Fetching tasks from:', url);

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);

          if (data.message?.task_details?.data) {
            const fetchedTasks = data.message.task_details.data.filter(task => {
              const taskDateTime = new Date(task.due_date);
              return taskDateTime > now;
            });
            
            console.log('Filtered tasks:', fetchedTasks);
            
            setTasks(fetchedTasks);
            const stats = {
              total: fetchedTasks.length,
              pending: fetchedTasks.filter((task: Task) => task.status === 'Pending').length,
              completed: fetchedTasks.filter((task: Task) => task.status === 'Completed').length,
            };
            setTaskStats(stats);
          }
        } else {
          console.error('Failed to fetch tasks:', response.status);
        }
      } catch (error) {
        console.error('Error fetching task statistics:', error);
      }
    };

    fetchTaskStats();
  }, []);

  const progress = taskStats.total > 0
    ? Math.round((taskStats.completed / taskStats.total) * 100)
    : 0;

  const handleShowGreeting = () => {
    setIsGreetingVisible(true);
  };

  const handleCloseGreeting = () => {
    setIsGreetingVisible(false);
  };

  const ProgressClock = () => {
    const size = 32;
    const strokeWidth = 3;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={tw`absolute right-4 top-20`}>
        <TouchableOpacity
          onPress={() => setShowProgressOverlay(true)}
          style={tw`relative`}
        >
          <Svg width={size} height={size}>
            <Circle
              stroke="#384766"
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke="#36AAB9"
              fill="none"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
          </Svg>
          <View style={tw`absolute inset-0 items-center justify-center`}>
            <Image source={BotImage} style={{ width: 20, height: 20 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const formatTasks = (tasks: Task[]): FormattedTask[] => {
    return tasks.map((task) => {
      const dueDate = new Date(task.due_date);
      return {
        ...task,
        time: dueDate.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        day: dueDate.toLocaleDateString('en-US', {
          weekday: 'long',
        }),
        backgroundColor: '#1E1E1E',
        iconName: getIconName(task.type),
      };
    });
  };

  const filteredTasks = formatTasks(tasks);

  return (
    <View style={tw`flex-1 bg-[#111111] p-4 px-2 pb-15`}>
      <TopNavBar navigation={undefined} />
      <ProgressClock />
      <CustomMessageComponent />

      {/* Task category tiles */}
      <View style={tw`flex-row justify-between mt-2`}>
        <Tile
          title="To-do"
          onPress={() => navigation.navigate('ToDo')}
          image={TodoImage}
          backgroundColor=""
        />
        <Tile
          title="Progress"
          onPress={() => navigation.navigate('Progress')}
          image={ProgressImage}
          backgroundColor=""
        />
        <Tile
          title="Done"
          onPress={() => navigation.navigate('Done')}
          image={DoneImage}
          backgroundColor=""
        />
      </View>

      <TouchableOpacity onPress={handleShowGreeting}>
        <UpcomingTasksComponent tasks={filteredTasks} />
      </TouchableOpacity>

      <PinnedTasks tasks={filteredTasks} />

      {/* Progress Overlay */}
      <Modal
        visible={showProgressOverlay}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProgressOverlay(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 bg-black/50 justify-center items-center`}
          activeOpacity={1}
          onPress={() => setShowProgressOverlay(false)}
        >
          <View style={tw`bg-[#1D1E23] p-6 rounded-2xl w-80`}>
            <View style={tw`items-center`}>
              <Svg width={120} height={120}>
                <Circle
                  stroke="#384766"
                  fill="none"
                  cx={60}
                  cy={60}
                  r={54}
                  strokeWidth={8}
                />
                <Circle
                  stroke="#36AAB9"
                  fill="none"
                  cx={60}
                  cy={60}
                  r={54}
                  strokeWidth={8}
                  strokeDasharray={`${339.292} ${339.292}`}
                  strokeDashoffset={339.292 - (progress / 100) * 339.292}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </Svg>

              <Text style={tw`text-white text-3xl font-bold mt-4`}>
                {progress}%
              </Text>
              <Text style={tw`text-[#979797] text-lg mt-2`}>
                Total Progress
              </Text>

              <View style={tw`flex-row justify-between w-full mt-4`}>
                <View style={tw`items-center`}>
                  <Text style={tw`text-[#979797]`}>Total</Text>
                  <Text style={tw`text-white text-lg`}>{taskStats.total}</Text>
                </View>
                <View style={tw`items-center`}>
                  <Text style={tw`text-[#979797]`}>Pending</Text>
                  <Text style={tw`text-white text-lg`}>{taskStats.pending}</Text>
                </View>
                <View style={tw`items-center`}>
                  <Text style={tw`text-[#979797]`}>Completed</Text>
                  <Text style={tw`text-white text-lg`}>{taskStats.completed}</Text>
                </View>
              </View>
            </View>

            <View style={tw`mt-6 border-t border-[#384766] pt-4`}>
              <Text style={tw`text-[#F8F8F8] text-sm text-center`}>
                {progress < 30
                  ? 'Just getting started! Keep going!'
                  : progress < 70
                  ? "Great progress! You're on track!"
                  : 'Almost there! Finish strong!'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default React.memo(Home);