/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    Text,
    View
} from 'react-native';
import { EmptyStateComponent } from '../../components/loading/LoadingComponent';
import { colors, globalStyles, spacing } from '../../styles';
import { RootStackParamList } from '../../types';

import { RenderUserCard } from '@/components/profiles/RenderUserProfile';
import { UserSkeleton } from '@/components/skeletons/UserSkeleton';

import { getAuthorityProfiles } from '@/actions/userAuthorityProfilesActions';
import { UserProfile } from '../../types';

type PerfilesNavigationProp = NativeStackNavigationProp<RootStackParamList>;



export default function ProfilesTabScreen() {
    const navigation = useNavigation<PerfilesNavigationProp>();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await getAuthorityProfiles()
            setUsers(users as unknown as UserProfile[]);
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchUsers();
    };

    const renderEmptyState = () => (
        <EmptyStateComponent
            message="No hay usuarios registrados"
            icon="👥"
        />
    );

    if (loading) {
        return (
            <View style={globalStyles.flex1}>
                <View style={[
                    globalStyles.paddingHorizontal,
                    globalStyles.paddingVertical,
                    globalStyles.borderBottom,
                    globalStyles.flexRowBetween,
                    { backgroundColor: colors.white }
                ]}>
                    <View style={{
                        height: 16,
                        backgroundColor: colors.gray200,
                        borderRadius: 8,
                        width: 100
                    }} />

                </View>

                <ScrollView
                    style={globalStyles.flex1}
                    contentContainerStyle={{ padding: spacing.sm }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                >
                    {[1, 2, 3].map((item) => (
                        <UserSkeleton key={item} />
                    ))}
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={globalStyles.flex1}>
            <View style={[
                globalStyles.paddingHorizontal,
                globalStyles.paddingVertical,
                globalStyles.borderBottom,
                globalStyles.flexRowBetween,
                { backgroundColor: colors.white }
            ]}>
                <Text style={[globalStyles.textBold, { fontSize: 16 }]}>
                    {users.length} {users.length === 1 ? 'Usuario' : 'Usuarios'}
                </Text>
            </View>

            <ScrollView
                style={globalStyles.flex1}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={
                    users.length === 0
                        ? { flex: 1, justifyContent: 'center' }
                        : { padding: spacing.sm }
                }
                showsVerticalScrollIndicator={false}
            >
                {users.length === 0 ? renderEmptyState() : users.map(user => <RenderUserCard key={user.id} user={user} />)}
            </ScrollView>
        </View>
    );
}

