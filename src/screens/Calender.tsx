import { View } from "react-native";
import Header from "../components/calendar/Header"
import tw from 'twrnc';
import DaySelector from "../components/calendar/DateSelector";
import React from "react";

const Calender = () => {
  return (
    <View style={tw`bg-[#111111]`}>
          <Header/>
          <DaySelector/>


    </View>
  )
}

export default Calender;
