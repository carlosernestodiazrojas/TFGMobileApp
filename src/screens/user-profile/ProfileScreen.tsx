/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { getUserById } from '@/actions/userAuthorityProfilesActions';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
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
    const [profileUserImage, setProfileUserImage] = useState<string>('')

    useFocusEffect(
        useCallback(() => {
            fetchUserImage()
        }, [])
    );

    const fetchUserImage = async () => {
        const response = await getUserById(user?.id as string)
        if (response && response.imagesUrls.length > 0) {
            setProfileUserImage(response.imagesUrls[0])
        } else
            setProfileUserImage('')
    }

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

    const getImageSource = () => {
        const imageUrl = profileUserImage

        if (imageError || !imageUrl) {
            return { uri: '' }
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

                        <Image
                            source={getImageSource()}
                            style={[profileCardStyles.avatar, imageStyles.avatar]}
                            resizeMode="cover"
                            defaultSource={{ uri: profileUserImage }}
                        />

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
                        {user?.name} {user?.lastName}
                    </Text>
                    <Text style={profileStyles.userEmail}>
                        {user?.email}
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