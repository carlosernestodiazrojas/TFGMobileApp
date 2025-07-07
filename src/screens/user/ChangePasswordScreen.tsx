
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { colors, formStyles, globalStyles, spacing } from '../../styles';

export default function ChangePasswordScreen() {
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { changePassword } = useAuth();

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        const result = await changePassword(currentPassword, newPassword);

        if (result.success) {
            Alert.alert('Éxito', 'Contraseña cambiada exitosamente', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } else {
            Alert.alert('Error', result.error);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView
                style={globalStyles.flex1}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <View style={[globalStyles.flexRow, globalStyles.header]}>
                    <TouchableOpacity
                        style={{ padding: spacing.sm, marginRight: spacing.lg }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={globalStyles.headerSubtitle}>Cambiar Contraseña</Text>
                </View>

                <ScrollView style={[globalStyles.flex1, globalStyles.screenPadding]}>
                    <View style={formStyles.formContainer}>
                        <Text style={formStyles.formTitle}>Nueva Contraseña</Text>


                        <View style={formStyles.fieldContainer}>
                            <Text style={formStyles.fieldLabel}>Contraseña Actual</Text>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons
                                    name="lock-closed"
                                    size={20}
                                    color={colors.primary}
                                    style={globalStyles.inputIcon}
                                />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Contraseña actual"
                                    placeholderTextColor={colors.gray400}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    secureTextEntry={!showCurrentPassword}
                                />
                                <TouchableOpacity
                                    style={globalStyles.inputEyeIcon}
                                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    <Ionicons
                                        name={showCurrentPassword ? "eye-off" : "eye"}
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={formStyles.fieldContainer}>
                            <Text style={formStyles.fieldLabel}>Nueva Contraseña</Text>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons
                                    name="lock-closed"
                                    size={20}
                                    color={colors.primary}
                                    style={globalStyles.inputIcon}
                                />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Nueva contraseña"
                                    placeholderTextColor={colors.gray400}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={!showNewPassword}
                                />
                                <TouchableOpacity
                                    style={globalStyles.inputEyeIcon}
                                    onPress={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <Ionicons
                                        name={showNewPassword ? "eye-off" : "eye"}
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ marginBottom: spacing.xxl }}>
                            <Text style={formStyles.fieldLabel}>Confirmar Nueva Contraseña</Text>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons
                                    name="lock-closed"
                                    size={20}
                                    color={colors.primary}
                                    style={globalStyles.inputIcon}
                                />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Confirmar nueva contraseña"
                                    placeholderTextColor={colors.gray400}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity
                                    style={globalStyles.inputEyeIcon}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-off" : "eye"}
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                globalStyles.buttonLarge,
                                globalStyles.shadowLarge,
                                loading && globalStyles.buttonDisabled
                            ]}
                            onPress={handleChangePassword}
                            disabled={loading}
                        >
                            <Text style={globalStyles.buttonText}>
                                {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}