import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InsulinLogEntry from '../../components/InsulinLogEntry';
import { useFocusEffect } from '@react-navigation/native';

const InsulinLogScreen = () => {
  const [insulinLogs, setInsulinLogs] = useState([]);

  const fetchInsulinLogs = async () => {
    try {
      const existingLogs = await AsyncStorage.getItem('insulinLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      setInsulinLogs(logs);
      console.log('Fetched insulin logs:', logs);
    } catch (error) {
      console.error('Error fetching insulin logs:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInsulinLogs();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.view}>
          <Text style={styles.text}>Insulin Logs</Text>
          {insulinLogs.map((log) => (
            <InsulinLogEntry key={log.date} log={log} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsulinLogScreen;

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