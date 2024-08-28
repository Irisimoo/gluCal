import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import { TabBarIcon } from '../../components/navigation/TabBarIcon';

const TabLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#FE726B'
            }}>
                <Tabs.Screen
                    name="insulinCalcScreen"
                    options={{
                        title: 'Calculator',
                        headerTitle: 'Insulin Calculator',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'calculator' : 'calculator-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="insulinLogScreen"
                    options={{
                        title: 'Insulin Log',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="foodDiaryScreen"
                    options={{
                        title: 'Food Diary',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'bookmark' : 'bookmark-outline'} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="settingsScreen"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabLayout

const styles = StyleSheet.create({})