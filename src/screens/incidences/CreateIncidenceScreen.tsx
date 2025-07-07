
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
import { colors, formStyles, globalStyles, spacing } from '../../styles';

export default function CreateProductScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name || !description || !price || !stock || !category) {
            Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
            return;
        }

        if (isNaN(Number(price)) || isNaN(Number(stock))) {
            Alert.alert('Error', 'Precio y stock deben ser números válidos');
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            Alert.alert('Éxito', 'Incidencia creada correctamente', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('Error', 'Error al crear la incidencia');
        } finally {
            setLoading(false);
        }
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
                    <Text style={globalStyles.headerSubtitle}>Crear Incidencia</Text>
                </View>

                <ScrollView style={[globalStyles.flex1, globalStyles.screenPadding]}>
                    <View style={formStyles.formContainer}>
                        <Text style={formStyles.formTitle}>Información del Incidencia</Text>

                        <View style={formStyles.fieldContainer}>
                            <Text style={formStyles.fieldLabel}>Nombre *</Text>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons
                                    name="cube"
                                    size={20}
                                    color={colors.primary}
                                    style={globalStyles.inputIcon}
                                />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Nombre de la incidencia"
                                    placeholderTextColor={colors.gray400}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        <View style={formStyles.fieldContainer}>
                            <Text style={formStyles.fieldLabel}>Descripción *</Text>
                            <View style={[
                                globalStyles.inputContainer,
                                { alignItems: 'flex-start', paddingTop: spacing.lg }
                            ]}>
                                <TextInput
                                    style={[globalStyles.input, {
                                        paddingHorizontal: 0,
                                        textAlignVertical: 'top',
                                        minHeight: 80
                                    }]}
                                    placeholder="Descripción del incidencia"
                                    placeholderTextColor={colors.gray400}
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                    numberOfLines={3}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                globalStyles.buttonLarge,
                                globalStyles.shadowLarge,
                                loading && globalStyles.buttonDisabled
                            ]}
                            onPress={handleCreate}
                            disabled={loading}
                        >
                            <Text style={globalStyles.buttonText}>
                                {loading ? 'Creando...' : 'Crear Incidencia'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}