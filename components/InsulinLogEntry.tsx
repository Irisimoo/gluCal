import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const InsulinLogEntry = ({ log, onDelete }) => {
  return (
    <View key={log.date} style={styles.logEntry}>
      <Text style={styles.text}>Date: {new Date(log.date).toDateString()}</Text>
      <Text style={styles.text}>Insulin Dose: {log.insulinDose}</Text>
      <Text style={styles.text}>Glucose: {log.glucose}</Text>
      <Text style={styles.text}>Carbs: {log.carbs}</Text>
      <Text style={styles.text}>Ratio: {log.ratio}</Text>
      <Button title="x" onPress={() => onDelete(log)} />
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