import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ingredient } from '../app/types';

const FoodDiaryEntry = (log: Ingredient) => {
  return (
    <View style={styles.logEntry}>
      {log.date ? (<Text style={styles.text}>Entry date: {log.date.toLocaleString()}</Text>) : null}
      <Text style={styles.text}>Food name: {log.foodName}</Text>
      <Text style={styles.text}>Portion (g): {log.portionSize}</Text>
      <Text style={styles.text}>Carbs: {log.carbs}</Text>
      <Text style={styles.text}>Notes: {log.notes}</Text>
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