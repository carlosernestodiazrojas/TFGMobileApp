

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar style="light" />
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}