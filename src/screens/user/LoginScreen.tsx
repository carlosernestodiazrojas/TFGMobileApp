/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors, globalStyles, loginStyles, spacing } from '../../styles';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        const result = await login(email, password);

        if (!result.success) {
            Alert.alert('Error', result.error);
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={globalStyles.flex1}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={loginStyles.gradient}
            >
                <ScrollView contentContainerStyle={loginStyles.scrollContainer}>

                    <View style={loginStyles.header}>
                        <Ionicons
                            name="storefront"
                            size={80}
                            color={colors.white}
                            style={loginStyles.icon}
                        />
                        <Text style={loginStyles.title}>Hola vecino!</Text>
                        <Text style={loginStyles.subtitle}>Accede para mantenerte al tanto de</Text>
                        <Text style={loginStyles.subtitle}>todas las novedades de tu comunidad </Text>

                    </View>


                    <View style={loginStyles.formContainer}>

                        <View style={globalStyles.inputContainer}>
                            <Ionicons
                                name="mail"
                                size={20}
                                color={colors.primary}
                                style={{ marginLeft: spacing.lg }}
                            />
                            <TextInput
                                style={[globalStyles.input, { paddingHorizontal: spacing.lg }]}
                                placeholder="Correo electrónico"
                                placeholderTextColor={colors.gray400}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>


                        <View style={globalStyles.inputContainer}>
                            <Ionicons
                                name="lock-closed"
                                size={20}
                                color={colors.primary}
                                style={{ marginLeft: spacing.lg }}
                            />
                            <TextInput
                                style={[globalStyles.input, { paddingHorizontal: spacing.lg }]}
                                placeholder="Contraseña"
                                placeholderTextColor={colors.gray400}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={{ paddingHorizontal: spacing.lg }}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity
                            style={[
                                globalStyles.buttonLarge,
                                {
                                    borderRadius: 16,
                                    marginTop: spacing.sm,
                                    shadowColor: colors.primary,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 10,
                                    elevation: 5,
                                },
                                loading && globalStyles.buttonDisabled
                            ]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={globalStyles.buttonText}>
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}
