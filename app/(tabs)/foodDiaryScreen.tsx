import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import FoodDiaryDay from '../../components/FoodDiaryDay';

/*
foodEntries
*/
const FoodDiaryScreen = ({ foodEntries }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.view}>
          <Text style={styles.text}>
            Food Diary
          </Text>
          {/* for each entry in foodentries, map out to a fooddiaryday component */}
          <FoodDiaryDay/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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