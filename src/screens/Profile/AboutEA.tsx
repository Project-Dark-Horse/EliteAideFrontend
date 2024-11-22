import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonHeader from '../../components/CommonHeader'; // Adjust the path as necessary

const AboutEliteAide = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title="About Elite Aide" showTitle={true} showNotificationIcon={false} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.title}>About Elite Aide</Text> */}
        <Text style={styles.content}>
          Elite Aide simplifies task management, enabling users to efficiently organize daily routines, professional commitments, and long-term plans, ensuring productivity and seamless organization for a streamlined, efficient lifestyle.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
});

export default AboutEliteAide;
