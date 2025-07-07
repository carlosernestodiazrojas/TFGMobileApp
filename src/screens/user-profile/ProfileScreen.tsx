import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { colors, globalStyles, profileCardStyles, profileStyles } from '../../styles';
import { RootStackParamList } from '../../types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const { user, logout } = useAuth();
    const [imageError, setImageError] = useState(false);

    const profileUser = {
        "id": "a",
        "email": "Test@holavecino.es",
        "name": "Test",
        "last_name": "Admin",
        "role": {
            "id": "b",
            "code": 1,
            "name": "global_admin"
        },
        "hoa": {
            "id": "a",
            "name": "test",
            "address": "Test",
            "images": [],
            "imagesUrls": [],
            "president_id": null,
            "admin_id": null
        },
        "property": null,
        "images": [],
        "imagesUrls": ["http://87.106.118.122:9000/myfincapp-bucket/562ea9c1469e691053d204171b597395616947874653befd9cd1086536e0036c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T190504Z&X-Amz-Expires=600&X-Amz-Signature=e0aafabe4404622a50d36f31619445a9c2c5b2f5ee39d1847240aa3574f0b322&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"]
    };

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Cerrar Sesión', onPress: logout, style: 'destructive' },
            ]
        );
    };

    const handleImageError = (error: Object) => {
        console.log('Error al cargar la imagen -- ', error);
        setImageError(true);
    };

    const handleImageLoad = () => {
        console.log('Imagen cargada exitosamente');
        setImageError(false);
    };

    // Obtener la URL de la imagen o usar fallback
    const getImageSource = () => {
        const imageUrl = profileUser?.imagesUrls?.[0];

        // Si hay error o no hay URL, usar placeholder
        if (imageError || !imageUrl) {
            return { uri: 'http://87.106.118.122:9000/myfincapp-bucket/562ea9c1469e691053d204171b597395616947874653befd9cd1086536e0036c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T190504Z&X-Amz-Expires=600&X-Amz-Signature=e0aafabe4404622a50d36f31619445a9c2c5b2f5ee39d1847240aa3574f0b322&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject' };
        }

        return { uri: imageUrl };
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.paddingHorizontal, globalStyles.paddingVertical, globalStyles.borderBottom, { backgroundColor: colors.white }]}>
                <Text style={globalStyles.headerTitle}>Perfil</Text>
            </View>

            <View style={[globalStyles.flex1, globalStyles.screenPadding]}>
                <View style={profileStyles.profileHeader}>
                    <View style={profileCardStyles.avatarContainer}>
                        {/* Imagen con manejo de errores mejorado */}
                        <Image
                            source={getImageSource()}
                            style={[profileCardStyles.avatar, imageStyles.avatar]}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            onLoadStart={() => console.log('Iniciando carga de imagen')}
                            resizeMode="cover"
                            defaultSource={{ uri: profileUser.imagesUrls[0] }}
                        />

                        {/* Fallback con icono si falla la imagen */}
                        {imageError && (
                            <View style={imageStyles.fallbackContainer}>
                                <Ionicons name="person" size={48} color={colors.primary} />
                            </View>
                        )}

                        <View style={[
                            profileCardStyles.statusDot,
                            profileCardStyles.activeDot
                        ]} />
                    </View>

                    <Text style={profileStyles.userName}>
                        {profileUser?.name || 'Usuario'} {profileUser?.last_name || ''}
                    </Text>
                    <Text style={profileStyles.userEmail}>
                        {profileUser?.email || 'user@example.com'}
                    </Text>

                </View>

                <View style={profileStyles.menuContainer}>
                    <TouchableOpacity
                        style={[profileStyles.menuItem, { borderBottomWidth: 0 }]}
                        onPress={() => navigation.navigate('ChangePassword')}
                    >
                        <Ionicons name="key" size={24} color={colors.primary} />
                        <Text style={profileStyles.menuItemText}>Cambiar Contraseña</Text>
                        <Ionicons name="chevron-forward" size={20} color={colors.gray300} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={profileStyles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out" size={24} color={colors.red500} />
                    <Text style={profileStyles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Estilos adicionales para la imagen
const imageStyles = {
    avatar: {
        backgroundColor: colors.gray200,
    },
    fallbackContainer: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        backgroundColor: colors.gray100,
        borderRadius: 40,
    },
};