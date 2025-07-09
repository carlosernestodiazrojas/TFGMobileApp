import { createIncidence, uploadIncidenceImage } from '@/actions/incidenceActions';
import CameraComponent from '@/components/camera/Camera';
import { User } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, formStyles, globalStyles, spacing } from '../../styles';

export default function CreateIncidenceScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [fileId, setFileId] = useState<string>("");

    const handleCreate = async () => {
        setLoading(true);

        try {
            const user = JSON.parse(await AsyncStorage.getItem("userData") as string) as User;

            if (name.trim() === "") {
                Alert.alert('Error', 'Debe especificar un nombre para la incidencia');
                return;
            }

            if (description.trim() === "") {
                Alert.alert('Error', 'Debe explicar el motivo de la incidencia mediante una descripcion');
                return;
            }

            const incidence: {
                name: string;
                description: string;
                hoa_id: string;
                is_votable: boolean;
                file_id?: string;
            } = {
                name,
                description,
                hoa_id: user.hoaId,
                is_votable: false
            };

            if (fileId !== "") {
                incidence.file_id = fileId;
            }

            const response = await createIncidence(incidence);

            if (response) {
                Alert.alert(
                    'Éxito',
                    'Incidencia creada correctamente',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.goBack();
                            }
                        }
                    ]
                );
            }

        } catch (error) {
            Alert.alert('Error', 'Error al crear la incidencia');
        } finally {
            setLoading(false);
        }
    };

    const handleCameraResult = async (imageUri: string | null) => {
        setShowCamera(false);

        if (imageUri) {
            setImageUploading(true);

            try {
                const uploadResult = await uploadImageToServer(imageUri);

                if (uploadResult && uploadResult.success && uploadResult.ids.length > 0) {
                    const { ids } = uploadResult;
                    setFileId(ids[0]);
                    setCapturedImages([imageUri]);
                    Alert.alert('Éxito', 'Imagen subida correctamente');
                }

            } catch (error) {
                Alert.alert(
                    'Error de subida',
                    '¿Quieres guardar la imagen localmente aunque no se pudo subir al servidor?',
                    [
                        { text: 'No', style: 'cancel' },
                        {
                            text: 'Sí',
                            onPress: () => setCapturedImages([imageUri])
                        }
                    ]
                );
            } finally {
                setImageUploading(false);
            }
        }
    };

    const uploadImageToServer = async (imageUri: string) => {
        try {
            const formData = new FormData();

            formData.append('files', {
                uri: imageUri,
                type: 'image/jpeg',
                name: `photo_${Date.now()}.jpg`,
            } as any);

            const response = await uploadIncidenceImage(formData);
            return response;

        } catch (error) {
            throw error;
        }
    };

    const removeImage = (index: number) => {
        setCapturedImages([]);
        setFileId("");
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

                        <View style={formStyles.fieldContainer}>
                            <Text style={formStyles.fieldLabel}>Fotos</Text>

                            {imageUploading ? (

                                <View style={[
                                    globalStyles.inputContainer,
                                    {
                                        justifyContent: 'center',
                                        paddingVertical: spacing.lg,
                                        backgroundColor: colors.gray50
                                    }
                                ]}>
                                    <ActivityIndicator
                                        size="small"
                                        color={colors.primary}
                                        style={globalStyles.inputIcon}
                                    />
                                    <Text style={[globalStyles.input, { color: colors.primary, fontWeight: '500' }]}>
                                        Subiendo imagen...
                                    </Text>
                                </View>
                            ) : (

                                <TouchableOpacity
                                    style={[
                                        globalStyles.inputContainer,
                                        {
                                            justifyContent: 'center',
                                            paddingVertical: spacing.lg
                                        }
                                    ]}
                                    onPress={() => setShowCamera(true)}
                                >
                                    <Ionicons
                                        name="camera"
                                        size={20}
                                        color={colors.primary}
                                        style={globalStyles.inputIcon}
                                    />
                                    <Text style={[globalStyles.input, { color: colors.gray400 }]}>
                                        Tomar foto
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {capturedImages.length > 0 && (
                                <View style={{ marginTop: spacing.md }}>
                                    <Text style={formStyles.fieldLabel}>
                                        Fotos capturadas ({capturedImages.length})
                                    </Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {capturedImages.map((imageUri, index) => (
                                            <View key={index} style={{ marginRight: spacing.md, position: 'relative' }}>
                                                <Image
                                                    source={{ uri: imageUri }}
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 8,
                                                        backgroundColor: colors.gray200
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    style={{
                                                        position: 'absolute',
                                                        top: -5,
                                                        right: -5,
                                                        backgroundColor: colors.red500,
                                                        borderRadius: 12,
                                                        width: 24,
                                                        height: 24,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                    onPress={() => removeImage(index)}
                                                    disabled={imageUploading}
                                                >
                                                    <Ionicons name="close" size={16} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity
                            style={[
                                globalStyles.buttonLarge,
                                globalStyles.shadowLarge,
                                (loading || imageUploading) && globalStyles.buttonDisabled
                            ]}
                            onPress={handleCreate}
                            disabled={loading || imageUploading}
                        >
                            <Text style={globalStyles.buttonText}>
                                {loading ? 'Creando...' : 'Crear Incidencia'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal
                    visible={showCamera}
                    animationType="slide"
                    presentationStyle="fullScreen"
                >
                    <CameraComponent
                        onImageCaptured={handleCameraResult}
                        onClose={() => setShowCamera(false)}
                    />
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}