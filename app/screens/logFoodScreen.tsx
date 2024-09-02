import { ScrollView, StyleSheet, Text, View, Button, Pressable } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddFoodItemModal from '../../components/AddFoodItemModal';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodDiaryEntry from '../../components/FoodDiaryEntry';
import { Ingredient } from '../types';

const LogFoodScreen = () => {
  const [currentFoodLogs, setCurrentFoodLogs] = useState<Ingredient[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false)
  const navigation = useNavigation();

  const onAddItem = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onAddItem}>
          <MaterialIcons name="add" color="#000" size={22} />
        </Pressable>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    console.log(currentFoodLogs);
  }, [currentFoodLogs]);

  const deleteFoodLog = async (deleteLog) => {
    try {
      const updatedLogs = currentFoodLogs.filter(log => log !== deleteLog);
      setCurrentFoodLogs(updatedLogs);
      await AsyncStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
      console.log('Deleted food log:', deleteLog);
    } catch (error) {
      console.error('Error deleting food log:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.view}>
          <AddFoodItemModal isVisible={isModalVisible} onClose={onModalClose} currentFoodLog={currentFoodLogs} setCurrentFoodLog={setCurrentFoodLogs}/>
          <Text style={styles.text}>Current food logs:</Text>
          {currentFoodLogs.map((log, index) => (
            <FoodDiaryEntry key={index} log={log} onDelete={deleteFoodLog}/>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LogFoodScreen;

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
    flexDirection: 'column',
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