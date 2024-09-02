import { View, Text, TextInput, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ingredient } from '../app/types';

export default function AddFoodItemModal({ isVisible, onClose, currentFoodLog, setCurrentFoodLog }) {
    const [name, setName] = useState<string>('');
    const [portionSize, setPortionSize] = useState<string>('');
    const [carbs, setCarbs] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [error, setError] = useState<string>('');

    const LogIngredientEntry = async () => {
        try {
            const parsedPortionSize = parseFloat(portionSize);
            const parsedCarbs = parseFloat(carbs);

            if (isNaN(parsedPortionSize) || isNaN(parsedCarbs)) {
                setError('Please enter valid numbers for portion size and carbs.');
                return;
            }

            // add food entry to food logs
            const newFoodEntry: Ingredient = {
                date: new Date(),
                foodName: name,
                portionSize: parsedPortionSize,
                carbs: parsedCarbs,
                notes: notes
            };
            setName('');
            setPortionSize('');
            setCarbs('');
            setNotes('');
            setError('');
            
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
                <Pressable onPress={onClose}>
                    <MaterialIcons name="close" color="#000" size={22} />
                </Pressable>
                <View style={styles.titleContainer}>
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
                        value={portionSize}
                        onChangeText={(text) => {
                            setPortionSize(text);
                        }}
                    />
                    <Text style={styles.text}>Carbs</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                        value={carbs}
                        onChangeText={(text) => {
                            setCarbs(text);
                        }}
                    />
                    <Text style={styles.text}>Notes</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
        height: '65%',
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
        justifyContent: 'space-between'
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        fontFamily: 'PublicSans',
        color: 'white',
        fontSize: 18,
        fontWeight: 'medium',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});