import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodDiaryEntry from '../../components/FoodDiaryEntry';
import { useFocusEffect } from '@react-navigation/native';
import { Ingredient } from '../types';

const FoodDiaryScreen = () => {
  const [foodLogs, setFoodLogs] = useState<Ingredient[]>([]);

  const fetchFoodLogs = async () => {
    try {
      const existingLogs = await AsyncStorage.getItem('foodLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      setFoodLogs(logs);
      console.log('Fetched food logs:', logs);
    } catch (error) {
      console.error('Error fetching food logs:', error);
    }
  };

  const deleteFoodLog = async (deleteLog) => {
    try {
      const updatedLogs = foodLogs.filter(log => log !== deleteLog);
      setFoodLogs(updatedLogs);
      await AsyncStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
      console.log('Deleted food log:', deleteLog);
    } catch (error) {
      console.error('Error deleting food log:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFoodLogs();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.view}>
          <Text style={styles.text}>Food logs</Text>
          {foodLogs.map((log, index) => (
            <FoodDiaryEntry key={index} log={log} onDelete={deleteFoodLog}/>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodDiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 4,
  },
  text: {
    fontFamily: 'PublicSans-Regular',
    fontSize: 15,
    color: 'black',
    padding: 20,
  },
});