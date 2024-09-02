// rnfes
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { CancelIcon } from '../components/navigation/CancelIcon';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [loaded, error] = useFonts({
        "PublicSans-Black": require('../assets/fonts/PublicSans-Black.ttf'),
        "PublicSans-Light": require('../assets/fonts/PublicSans-Light.ttf'),
        "PublicSans-Medium": require('../assets/fonts/PublicSans-Medium.ttf'),
        "PublicSans-Regular": require('../assets/fonts/PublicSans-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Stack>
            {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="screens/logFoodScreen" options={({navigation}) => ({
                headerShown: true, 
                title: 'Log Food',
                headerLeft: () => (
                    <CancelIcon navigation={navigation}/>
                )
            })}/>
        </Stack>
    )
}

export default RootLayout

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})