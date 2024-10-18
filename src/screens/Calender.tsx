/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay()); // Starting with today
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Simulated tasks
  const tasks = [
    { id: 1, time: '10 AM', summary: 'Team Meeting', detail: 'Group discussion for the new product', day: 2 },
    { id: 2, time: '2 PM', summary: 'Client Call', detail: 'Follow-up on the proposal', day: 2 },
  ];

  // Filter tasks for the selected day
  const dailyTasks = tasks.filter(task => task.day === selectedDay);

  return (
    <View style={tw`flex-1 bg-black p-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-xl text-white`}>Today</Text>
        <Button  mode="elevated" buttonColor="#1D1E23" labelStyle={tw`text-sm text-white`}
 onPress={() => {}}>Create task</Button>
      </View>

      <ScrollView horizontal style={tw` `}>
        {tasks.map((task, index) => (
          <Card key={index} style={tw`mx-1 w-60 bg-blue-600`}>
            <Card.Content>
              <Text style={tw`text-white text-sm`}>{task.time}</Text>
              <Text style={tw`text-white`}>{task.summary}</Text>
              <Text style={tw`text-gray-300 text-sm`}>{task.detail}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <ScrollView horizontal style={tw`mt-5 mb-8`}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDay(index)} style={tw`mx-2`}>
            <Text style={tw`text-white text-xl${selectedDay === index ? 'font-bold' : ''}`}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={tw`flex-grow`}>
        {Array.from({ length: 24 }, (_, i) => `${i % 12 || 12} ${i < 12 ? 'AM' : 'PM'}`).map((time, index) => (
          <TouchableOpacity key={index} style={tw`p-2 border-b border-gray-700`}>
            <Text style={tw`text-white`}>{time}</Text>
            {dailyTasks.filter(task => task.time.startsWith(time.split(' ')[0])).map(task => (
              <Text key={task.id} style={tw`text-white text-xl pl-4`}>{task.summary}</Text>
            ))}
          </TouchableOpacity>
        ))}
      </ScrollView>



    </View>
  );
};

export default App;
