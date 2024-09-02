import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ingredient } from '../app/types';

interface FoodDiaryEntryProps {
  log: Ingredient;
  onDelete: (log: Ingredient) => void;
}

const FoodDiaryEntry: React.FC<FoodDiaryEntryProps> = ({ log, onDelete }) => {
  return (
    <View style={styles.logEntry}>
      {log.date ? (<Text style={styles.text}>Entry date: {new Date(log.date).toDateString()}</Text>) : null}
      <Text style={styles.text}>Food name: {log.foodName}</Text>
      <Text style={styles.text}>Portion (g): {log.portionSize}</Text>
      <Text style={styles.text}>Carbs: {log.carbs}</Text>
      <Text style={styles.text}>Notes: {log.notes}</Text>
      <Button title="x" onPress={() => onDelete(log)} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PublicSans-Regular',
    fontSize: 15,
    color: 'black',
    padding: 20,
  },
  logEntry: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default FoodDiaryEntry