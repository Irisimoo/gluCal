import { View, Text, TextInput, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Ingredient = {
    foodName: string,
    portionSize: number, // choose a standardized unit and convert all inputs to it (i.e. g)
    carbs: number, // whaat unit??
    notes: string
}

export default function AddFoodItemModal({ isVisible, onClose, currentFoodLog, setCurrentFoodLog }) {
    const [name, setName] = useState<string>('');
    const [portionSize, setPortionSize] = useState<number>(0);
    const [carbs, setCarbs] = useState<number>(0);
    const [notes, setNotes] = useState<string>('');

    const LogIngredientEntry = async () => {
        try {
            // add food entry to food logs
            const newFoodEntry: Ingredient = {
                foodName: name,
                portionSize: portionSize,
                carbs: carbs,
                notes: notes
            };
            setName('');
            setPortionSize(0);
            setCarbs(0);
            setNotes('');
            
            const updatedLogs = [...currentFoodLog, newFoodEntry];
            setCurrentFoodLog(updatedLogs);
            
            // get list of all foods
            const existingLogs = await AsyncStorage.getItem('foodLogs'); 
            const logs = existingLogs ? JSON.parse(existingLogs) : [];
            logs.push(newFoodEntry);
            await AsyncStorage.setItem('foodLogs', JSON.stringify(logs));
            console.log('current foodLogs:', logs);
            onClose();
        } catch (error) {
            console.error('Error saving ingredient:', error);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <View style={styles.topComponent}>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" color="#000" size={22} />
                        </Pressable>
                    </View>
                    <Text style={styles.text}>Food Name</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <Text style={styles.text}>Portion Size</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                        value={portionSize.toString()}
                        onChangeText={(text) => setPortionSize(parseFloat(text))}
                    />
                    <Text style={styles.text}>Carbs</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                        value={carbs.toString()}
                        onChangeText={(text) => setCarbs(parseFloat(text))}
                    />
                    <Text style={styles.text}>Notes</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={LogIngredientEntry}>
                        <Text style={styles.buttonText}>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContent: {
        height: '60%',
        width: '90%',
        backgroundColor: '#f7f7f7',
        position: 'absolute',
        top: '20%',
        left: '5%',
        borderRadius: 20,
        padding: 20,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#f7f7f7',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topComponent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    title: {
        color: '#000',
        fontSize: 16,
    },
    text: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 15,
        color: 'black',
        padding: 5,
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
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        fontFamily: 'PublicSans',
        color: 'white',
        fontSize: 12,
        fontWeight: 'medium',
    },
});