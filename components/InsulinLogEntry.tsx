import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InsulinLogEntry = ({ log }) => {
  return (
    <View key={log.date} style={styles.logEntry}>
      <Text style={styles.text}>Date: {new Date(log.date).toLocaleString()}</Text>
      <Text style={styles.text}>Insulin Dose: {log.insulinDose}</Text>
      <Text style={styles.text}>Glucose: {log.glucose}</Text>
      <Text style={styles.text}>Carbs: {log.carbs}</Text>
      <Text style={styles.text}>Ratio: {log.ratio}</Text>
    </View>
  );
};

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

export default InsulinLogEntry;