import React from 'react'
import { StyleSheet , Text, View } from 'react-native'
import BottomTabNavigator from '../components/BottomTabNavigator';

const Calender = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}> Calender</Text>

    </View>
  );
};

export default Calender;

const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#000000',
        
      
    },
    text:{
      color:'white',
      fontSize:50
    }

});
