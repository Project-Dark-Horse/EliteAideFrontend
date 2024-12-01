import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { G, Path, Circle, Defs, Line } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { 
  useAnimatedProps, 
  withTiming, 
  useSharedValue, 
  withDelay 
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { Text as SVGText } from 'react-native-svg';
import { LinearGradient as SVGLinearGradient, Stop } from 'react-native-svg';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: string;
  due_date: string;
  type: string;
  created_at: string;
  updated_at: string;
  creator: number;
}

interface TaskCardProps {
  title: string;
  description: string;
  time: string;
  backgroundColor: string;
}

type NavigationProp = NativeStackNavigationProp<any>;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const TaskAnalysis = () => {
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statistics, setStatistics] = React.useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    overdue: 0
  });

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          console.log('🔴 No access token found');
          setLoading(false);
          return;
        }

        console.log('🟢 Token found:', token);
        console.log('📡 Fetching tasks...');

        const response = await fetch('https://api.eliteaide.tech/v1/tasks/user-tasks?page=1&items_per_page=200', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
          console.log('❌ Error response:', response.statusText);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log('📦 API Response Data:', JSON.stringify(data, null, 2));

        if (data.message && data.message.task_details && data.message.task_details.data) {
          console.log('✅ Tasks loaded successfully');
          console.log('📊 Number of tasks:', data.message.task_details.data.length);
          setTasks(data.message.task_details.data);
        } else {
          console.log('⚠️ Unexpected response structure:', data);
        }
      } catch (error) {
        console.log('🔴 Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Memoize the statistics calculation to avoid unnecessary re-renders
  const memoizedStatistics = React.useMemo(() => {
    // Calculate statistics based on tasks
    const stats = {
      total: tasks.length,
      completed: tasks.filter(task => task.status === 'completed').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
      todo: tasks.filter(task => task.status === 'todo').length,
      highPriority: tasks.filter(task => task.priority === 3).length,
      mediumPriority: tasks.filter(task => task.priority === 2).length,
      lowPriority: tasks.filter(task => task.priority === 1).length,
      overdue: tasks.filter(task => new Date(task.due_date) < new Date()).length,
    };
    setStatistics(stats);
    return stats;
  }, [tasks]);

  const pieData = [
    { 
      value: tasks.filter((task) => task.status === 'Pending').length, 
      color: '#FF6B6B',
      gradient: ['#FF8B8B', '#FF4949'],
      key: 'pending' 
    },
    { 
      value: tasks.filter((task) => task.status === 'In Progress').length, 
      color: '#4834D4',
      gradient: ['#786CE9', '#3A24C2'],
      key: 'in progress' 
    },
    { 
      value: tasks.filter((task) => task.status === 'Completed').length, 
      color: '#20BF6B',
      gradient: ['#3DFF98', '#2ECC71'],
      key: 'completed' 
    },
  ];

  const total = pieData.reduce((sum, data) => sum + data.value, 0);

  const CustomPieChart = () => {
    const animation = useSharedValue(0);
    let cumulativeAngle = 0;

    React.useEffect(() => {
      animation.value = withDelay(300, withTiming(1, { duration: 1500 }));
    }, []);

    const createPieSegment = (startAngle: number, sweepAngle: number) => {
      'worklet';
      const radius = 85;
      const x = radius * Math.cos((startAngle * Math.PI) / 180);
      const y = radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = radius * Math.cos(((startAngle + sweepAngle) * Math.PI) / 180);
      const y2 = radius * Math.sin(((startAngle + sweepAngle) * Math.PI) / 180);
      const largeArcFlag = sweepAngle > 180 ? 1 : 0;

      return `M 0 0 L ${x} ${y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    return (
      <View style={styles.container}>
        <View style={styles.chartContainerWrapper}>
          <SVGLinearGradient
            id="linear-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop offset="0%" stopColor="#16213C" />
            <Stop offset="53.57%" stopColor="#3272A0" />
            <Stop offset="107.14%" stopColor="#1E4E8D" />
          </SVGLinearGradient>
          <View style={styles.chartContainerInner}>
            <BlurView
              style={styles.chartGlow}
              blurType="dark"
              blurAmount={10}
            />
            <Svg height={250} width={250}>
              <Defs>
                {pieData.map((item, index) => (
                  <SVGLinearGradient
                    key={`gradient-${index}`}
                    id={`gradient-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor={item.gradient[0]} />
                    <Stop offset="100%" stopColor={item.gradient[1]} />
                  </SVGLinearGradient>
                ))}
              </Defs>
              <G transform="translate(125, 125)">
                {/* Outer glow circle */}
                <Circle r="90" fill="#ffffff10" />
                
                {/* Background circle */}
                <Circle r="85" fill="#000000" opacity={0.5} />
                
                {pieData.map((item, index) => {
                  const sweepAngle = (item.value / total) * 360;
                  const startAngle = cumulativeAngle - 90;
                  cumulativeAngle += sweepAngle;

                  const animatedProps = useAnimatedProps(() => ({
                    d: createPieSegment(startAngle, sweepAngle * animation.value),
                    fillOpacity: animation.value
                  }));

                  return (
                    <React.Fragment key={index}>
                      {/* Shadow layer */}
                      <AnimatedPath
                        animatedProps={animatedProps}
                        fill="#00000060"
                        transform="translate(2, 2)"
                      />
                      {/* Main segment */}
                      <AnimatedPath
                        animatedProps={animatedProps}
                        fill={`url(#gradient-${index})`}
                        stroke="#ffffff15"
                        strokeWidth={1}
                      />
                    </React.Fragment>
                  );
                })}
                
                {/* Inner circles */}
                <Circle r="60" fill="#000000" />
                <Circle r="58" fill="#ffffff05" />
                
                {/* Center content */}
                <SVGText
                  x="0"
                  y="0"
                  fill="#ffffff"
                  fontSize="24"
                  textAnchor="middle"
                  dy="10"
                >
                  {total}
                </SVGText>
                <SVGText
                  x="0"
                  y="25"
                  fill="#ffffff80"
                  fontSize="12"
                  textAnchor="middle"
                >
                  Total Tasks
                </SVGText>
              </G>
            </Svg>
          </View>
        </View>
        
        {/* Updated legend style */}
        <View style={styles.legend}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <SVGLinearGradient
                id={`gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <Stop offset="0%" stopColor={item.gradient[0]} />
                <Stop offset="100%" stopColor={item.gradient[1]} />
              </SVGLinearGradient>
              <Text style={styles.legendText}>
                {item.key} ({item.value})
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const TaskCard = ({ title, description, time, backgroundColor }: TaskCardProps) => (
    <View style={[styles.taskCard, { backgroundColor }]}>
      <View style={styles.taskCardContent}>
        <View style={styles.taskIconContainer}>
          <Icon name="briefcase-outline" size={20} color="#fff" />
        </View>
        <View style={styles.taskTextContainer}>
          <Text style={styles.taskTitle}>{title}</Text>
          <Text style={styles.taskDescription}>{description}</Text>
        </View>
      </View>
      <View style={styles.taskTimeContainer}>
        <Text style={styles.taskTime}>{time}</Text>
        <View style={styles.taskControls}>
          <Icon name="notifications" size={24} color="#fff" style={styles.taskIcon} />
          <Icon name="ellipse" size={16} color="#4CD964" />
        </View>
      </View>
    </View>
  );

  const renderStatistics = () => (
    <View style={styles.statisticsContainer}>
      <Text style={styles.statisticsTitle}>Task Overview</Text>
      
      {/* Status Overview with data validation */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.total || 0}</Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.todo || 0}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.inProgress || 0}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{statistics.completed || 0}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Priority Breakdown with minimum width for segments */}
      <View style={styles.priorityContainer}>
        <Text style={styles.sectionTitle}>Priority Breakdown</Text>
        <View style={styles.priorityBar}>
          {statistics.highPriority > 0 && (
            <View 
              style={[
                styles.prioritySegment, 
                { 
                  flex: statistics.highPriority, 
                  backgroundColor: '#ff4757',
                  minWidth: 20 
                }
              ]} 
            />
          )}
          {statistics.mediumPriority > 0 && (
            <View 
              style={[
                styles.prioritySegment, 
                { 
                  flex: statistics.mediumPriority, 
                  backgroundColor: '#ffa502',
                  minWidth: 20 
                }
              ]} 
            />
          )}
          {statistics.lowPriority > 0 && (
            <View 
              style={[
                styles.prioritySegment, 
                { 
                  flex: statistics.lowPriority, 
                  backgroundColor: '#2ed573',
                  minWidth: 20 
                }
              ]} 
            />
          )}
        </View>
        <View style={styles.priorityLegend}>
          <Text style={styles.priorityLegendItem}>🔴 High Priority: {statistics.highPriority || 0}</Text>
          <Text style={styles.priorityLegendItem}>🟡 Medium: {statistics.mediumPriority || 0}</Text>
          <Text style={styles.priorityLegendItem}>🟢 Low: {statistics.lowPriority || 0}</Text>
        </View>
      </View>

      {/* Overdue Tasks with validation */}
      <View style={styles.overdueContainer}>
        <Text style={styles.sectionTitle}>Overdue Tasks</Text>
        <View style={styles.overdueBox}>
          <Icon name="warning" size={24} color="#ff4757" />
          <Text style={styles.overdueNumber}>{statistics.overdue || 0}</Text>
          <Text style={styles.overdueLabel}>
            {statistics.overdue === 1 ? 'Task Overdue' : 'Tasks Overdue'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress Overview</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Icon name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loadingText} />
        ) : (
          <>
            <View style={styles.chartContainer}>
              <CustomPieChart />
            </View>
            {renderStatistics()}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Pure black background
  },
  content: {
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000000', // Match container background
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 60,
    width: 120,
    height: 120,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  chartCenterPercentage: {
    color: '#3DFF98',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chartCenterText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  chartCenterSubtext: {
    color: '#999999',
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff10',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ffffff15',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  taskCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#1f1f1f',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  taskCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#b0b0b0', // Softer text color for descriptions
    fontSize: 14,
  },
  taskTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  taskTime: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  taskControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    marginRight: 12,
  },
  statisticsContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a', // Slightly lighter than black for contrast
    borderRadius: 12,
    margin: 16,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#111111', // Very dark gray for cards
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  priorityContainer: {
    marginBottom: 24,
  },
  priorityBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#363636',
    marginBottom: 12,
  },
  prioritySegment: {
    height: '100%',
  },
  priorityLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityLegendItem: {
    color: '#fff',
    fontSize: 14,
  },
  overdueBox: {
    backgroundColor: '#111111', // Very dark gray for consistency
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  overdueNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff4757',
    marginVertical: 8,
  },
  overdueLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  overdueContainer: {
    marginTop: 16,
  },
  chartWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    padding: 20,
  },
  chartGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  chartContainerWrapper: {
    borderWidth: 1,
    borderColor: '#3272A0',
    borderRadius: 16,
    padding: 15,
    backgroundColor: '#000000',
    shadowColor: '#3272A0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  chartContainerInner: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#00000090',
  },
});

export default React.memo(TaskAnalysis);