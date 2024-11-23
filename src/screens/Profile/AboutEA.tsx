import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonHeader from '../../components/CommonHeader'; // Adjust the path as necessary

const AboutEliteAide = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title="What is Elite Aide?" showTitle={true} showNotificationIcon={false} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.title}>Imagine Task Management as Effortless as Thinking</Text>
          <Text style={styles.content}>
            What if you had an assistant who is intelligent, always ready, and never forgetful—an aide built to understand your needs and evolve with you?
          </Text>
          <Text style={styles.subtitle}>This is the future Elite Aide promises.</Text>
          <Text style={styles.content}>
            Elite Aide is more than just an app. It's your personal guide to organizing life’s chaos, designed for those who demand precision and simplicity. We designed Elite Aide with one core belief:
          </Text>
          <Text style={styles.highlight}>You are the chief executive of your life, and you deserve an assistant.</Text>
        </View>

        <Text style={styles.sectionTitle}>Current features</Text>
        <View style={styles.featuresContainer}>
        <Image source={require('../../assets/phone.png')} style={styles.phoneImage} />
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>Create & Organize Tasks</Text>
            
            <Text style={styles.featureContent}>
              Just add a task, set the priority, due date, and description. Elite Aide takes it from there—organizing, reminding, and auto-completing.
            </Text>
          </View>
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>Stay on Track</Text>
            <Text style={styles.featureContent}>
              Visualize your tasks in an hourly format. This allows you to plan your day ahead, and stay on top of deadlines without feeling overwhelmed.
            </Text>
          </View>
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>Auto-Complete Tasks</Text>
            <Text style={styles.featureContent}>
              Let the app automatically complete routine tasks once certain conditions are met. Automating repetitive actions, save time and focus on what matters.
            </Text>
          </View>
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>Task Progress Tracking</Text>
            <Text style={styles.featureContent}>
              Monitor your task completion rate with progress indicators. Instantly see how many tasks are done and which ones are pending in one place.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingBottom: 50,
    
  },
  contentContainer: {
    padding: 20,
    
  },
  infoBox: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#3272A0',
    borderWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#65779E',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#65779E',
    textAlign: 'center',
    marginVertical: 10,
  },
  content: {
    fontSize: 15,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#65779E',
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 0,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  featuresContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  featureBox: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#3272A0',
    borderWidth: 0.5,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3272A0',
    marginBottom: 5,
  },
  featureContent: {
    fontSize: 15,
    color: '#B0B0B0',
    textAlign: 'center',
    marginTop: 10,
  },
  phoneImage: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default AboutEliteAide;
