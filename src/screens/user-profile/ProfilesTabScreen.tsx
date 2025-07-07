
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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
            const exampleUsers: UserProfile[] = [
                {
                    "id": "f1be09f7-a307-4bb7-8dd4-571fc172b8f6",
                    "email": "pedropi@holavecino.es",
                    "name": "Pedro ",
                    "last_name": "Pi",
                    "role": {
                        "id": "199949c7-0c29-4204-bac8-d13aae8771db",
                        "code": 2,
                        "name": "administrador"
                    },
                    "hoa": {
                        "id": "89caee06-0ab1-4a4c-afe9-9b7801d95c6d",
                        "name": "Mar azul",
                        "address": "Avenida acoran # 25",
                        "images": [],
                        "imagesUrls": [],
                        "president_id": null,
                        "admin_id": null
                    },
                    "property": {
                        "id": "e9ccd83f-4387-4f53-9063-5b1df88b7d48",
                        "property_identifier": "Apto 2do A",
                        "is_deleted": false,
                        "property_type": "interior",
                        "has_storage_room": true,
                        "has_parking_space": false,
                        "current_on_payments": false,
                        "created": "2025-06-07T21:04:37.420Z",
                        "updated": "2025-06-07T21:04:37.420Z"
                    },
                    "images": [],
                    "imagesUrls": []
                },
                {
                    "id": "6beb0323-e781-43cb-ae29-c2038fe5da0b",
                    "email": "superadmin@holavecino.es",
                    "name": "Super",
                    "last_name": "Admin",
                    "role": {
                        "id": "a9ec66d1-f2c6-4dcf-85f2-e263a8d3b198",
                        "code": 1,
                        "name": "global_admin"
                    },
                    "hoa": {
                        "id": "89caee06-0ab1-4a4c-afe9-9b7801d95c6d",
                        "name": "Mar azul",
                        "address": "Avenida acoran # 25",
                        "images": [],
                        "imagesUrls": [],
                        "president_id": null,
                        "admin_id": null
                    },
                    "property": null,
                    "images": [],
                    "imagesUrls": ["http://87.106.118.122:9000/myfincapp-bucket/562ea9c1469e691053d204171b597395616947874653befd9cd1086536e0036c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T184658Z&X-Amz-Expires=600&X-Amz-Signature=dc201986869ab6cfed0ba56b0b450ebf93ab35283dcb9b5c783e50da30497378&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"]
                },
            ]

            await new Promise(resolve => setTimeout(resolve, 1500));
            setUsers(exampleUsers);
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

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

