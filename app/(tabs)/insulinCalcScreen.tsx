import { ScrollView, StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const insulinCalcScreen = () => {
  const [insulinDose, setInsulinDose] = useState<number>(0);
  const [glucose, setGlucose] = useState<string>('0');
  const [carbs, setCarbs] = useState<string>('0');
  const [ratio, setRatio] = useState<string>('0');

  const calculateInsulinDoseAndLogEntry = async () => {
    try {
      // sample numbers
      let target: number = 6;
      const correctionFactor: number = 2;
      const negativeCorrectionFactor: number = 2;
      const hasNegativieCorrFactor: boolean = true;
  
      // calculate insulin dose
      let initialValue: number = parseFloat(carbs) / parseFloat(ratio); // account for carbs
      // account for blood glucose
      let withGlucoseCorrection: number = initialValue; // no correction
      if ((parseFloat(glucose) - target) > 0) { // positive correction, blood glucose above target
        withGlucoseCorrection = initialValue + (parseFloat(glucose) - target) / correctionFactor;
      } else if (parseFloat(glucose) - target < 0 && hasNegativieCorrFactor) { // negative correction, glucose below target
        withGlucoseCorrection = initialValue + (parseFloat(glucose) - target) / negativeCorrectionFactor;
      }

      setInsulinDose(withGlucoseCorrection);
      
      // add insulin dose entry to asyncstorage
      const newInsulinLogEntry = {
        date: Date.now(),
        insulinDose: withGlucoseCorrection,
        glucose: parseFloat(glucose),
        carbs: parseFloat(carbs),
        ratio: parseFloat(ratio)
      };
      const existingLogs = await AsyncStorage.getItem('insulinLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(newInsulinLogEntry);
      await AsyncStorage.setItem('insulinLogs', JSON.stringify(logs));
      console.log('current insulin logs:', logs);
    } catch (error) {
      console.error('Error saving insulinLogs:', error);
    }
  };

  // CURRENT ISSUE: cannot enter decimals
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.view}>
        <Text style={styles.text}>Blood glucose</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={glucose}
            onChangeText={(text) => setGlucose(text)}
          />
          <Text style={styles.text}>Carbs</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={carbs}
            onChangeText={(text) => setCarbs(text)}
          />
          <Text style={styles.text}>Ratio</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={ratio}
            onChangeText={(text) => setRatio(text)}
          />
          <TouchableOpacity onPress={() => router.push('/screens/logFoodScreen')}>
            <Text style={styles.text}>Log food (optional)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calculateInsulinDoseAndLogEntry}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Calculated value: {insulinDose}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default insulinCalcScreen;

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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#FE726B',
    paddingVertical: 10,
    paddingHorizontal: 26,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontFamily: 'PublicSans',
    color: 'white',
    fontSize: 24,
    fontWeight: 'medium',
  },
});