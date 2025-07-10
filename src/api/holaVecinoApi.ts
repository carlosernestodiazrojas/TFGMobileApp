/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import axios from 'axios';
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL =
    process.env.EXPO_PUBLIC_STAGE === 'production' ?
        process.env.EXPO_PUBLIC_API_URL :
        Platform.OS === 'ios' ?
            process.env.EXPO_PUBLIC_API_URL_IOS :
            process.env.EXPO_PUBLIC_API_URL_ANDROID;

const holaVecinoApi = axios.create({
    baseURL: API_BASE_URL,
})

holaVecinoApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);

export { holaVecinoApi };

