
import RenderAnnouncement from '@/components/announcements/RenderAnnouncement';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyStateComponent } from '../../components/loading/LoadingComponent';
import { colors, globalStyles, spacing } from '../../styles';
import { Announcement, RootStackParamList } from '../../types';

import { AnnouncementSkeletonGrid, AnnouncementSkeletonList } from '@/components/skeletons/AnnouncementSkeletons';

export type AnnouncementsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AnnouncementsScreen() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    useEffect(() => {
        filterAnnouncements();
    }, [searchQuery, announcements]);

    const fetchAnnouncements = async () => {
        try {
            const exampleAnnouncements: Announcement[] = [
                {
                    "images": [
                        "0ad5e352-7ffc-4132-a801-c09d4cdc54a4"
                    ],
                    "id": "783e1791-e626-4845-93ab-abe5e575c5ab",
                    "title": "Otra prueba",
                    "description": "Probando cosas. Son datos de prueba. Necesitamos que sean un poco mas largos para probar bien como cubren la pantalla",
                    "is_deleted": false,
                    "from": "2025-06-30T23:00:00.000Z",
                    "to": "2025-07-30T23:00:00.000Z",
                    "created": "2025-07-04T11:22:44.060Z",
                    "updated": "2025-07-04T11:22:44.060Z",
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/562ea9c1469e691053d204171b597395616947874653befd9cd1086536e0036c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T162352Z&X-Amz-Expires=600&X-Amz-Signature=2c31a5929c502e1883e25a85ce2713eca050f9e941bb43a580afafe94587820c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                },
                {
                    "images": [
                        "90783460-59a5-4c06-a4cf-9d933ae19c85"
                    ],
                    "id": "9a84a3e3-edf5-4634-8009-d975e0c2ba81",
                    "title": "Prueba de anuncio con imagen",
                    "description": "Prueba de anuncio con imagen.  Son datos de prueba. Necesitamos que sean un poco mas largos para probar bien como cubren la pantalla",
                    "is_deleted": false,
                    "from": "2025-06-30T23:00:00.000Z",
                    "to": "2025-07-30T23:00:00.000Z",
                    "created": "2025-07-04T10:57:05.068Z",
                    "updated": "2025-07-04T10:57:05.068Z",
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/562ea9c1469e691053d204171b597395616947874653befd9cd1086536e0036c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T162352Z&X-Amz-Expires=600&X-Amz-Signature=2c31a5929c502e1883e25a85ce2713eca050f9e941bb43a580afafe94587820c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                },
                {
                    "images": [
                        "798267de-f97b-47a4-b7c0-0469c02e99fc"
                    ],
                    "id": "524fe3bf-d5f9-4603-b123-8afc1d54b361",
                    "title": "Anuncio de prueba editado",
                    "description": "Un anuncio para la prueba de sistema.  Son datos de prueba. Necesitamos que sean un poco mas largos para probar bien como cubren la pantalla",
                    "is_deleted": false,
                    "from": "2025-06-29T23:00:00.000Z",
                    "to": "2025-07-06T23:00:00.000Z",
                    "created": "2025-06-25T18:49:56.604Z",
                    "updated": "2025-06-25T18:53:35.992Z",
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/943a3c0fd735c64b6d5950f1d47b6a8fd2ca72aef8e4481b39c147a6d8db5daf.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T162352Z&X-Amz-Expires=600&X-Amz-Signature=9476b52886d464de8d1e98eacb0817e8a9053bcca6df324ff1063c7f19878c0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                },
                {
                    "images": [
                        "9fbf8d71-e7cb-431b-abb9-b01b81a8e4ae"
                    ],
                    "id": "9fcfd5d7-47ad-4184-8eff-f05393bf2059",
                    "title": "Otra prueba",
                    "description": "Muy importante.  Son datos de prueba. Necesitamos que sean un poco mas largos para probar bien como cubren la pantalla",
                    "is_deleted": false,
                    "from": "2025-05-31T23:00:00.000Z",
                    "to": "2025-07-05T23:00:00.000Z",
                    "created": "2025-06-08T16:24:49.543Z",
                    "updated": "2025-06-08T16:30:58.702Z",
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/531e6e21ff021b5dc7753053b0141d7948e2ae9f299dac688f66d9cde0bb327f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T162352Z&X-Amz-Expires=600&X-Amz-Signature=e47eaf6fa2169ace86839818e2288ba879e1d524c8dee3dc964300cc98b664cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                },
                {
                    "images": [
                        "38701af4-b5ea-421c-84e3-8c5fca9c6d0c"
                    ],
                    "id": "b195affe-8d77-4fa5-84a3-4be5e88cb925",
                    "title": "Mañana junta urgente - actualizar",
                    "description": "Es un tema importante.  Son datos de prueba. Necesitamos que sean un poco mas largos para probar bien como cubren la pantalla",
                    "is_deleted": false,
                    "from": "2025-06-08T14:45:35.299Z",
                    "to": "2025-06-29T23:00:00.000Z",
                    "created": "2025-05-25T00:22:59.739Z",
                    "updated": "2025-07-04T10:25:10.433Z",
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/9f540fcb6139418329f6e21f8482ca880c1e56b53d441b3bc68dc048ac60749d.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T162352Z&X-Amz-Expires=600&X-Amz-Signature=da9afe70ccc7cc7ed4fd8101e3eb27a80b144686f25a2108382392bd6c1289e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                }
            ]

            await new Promise(resolve => setTimeout(resolve, 1500));
            setAnnouncements(exampleAnnouncements);
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filterAnnouncements = () => {
        if (!searchQuery.trim()) {
            setFilteredAnnouncements(announcements);
        } else {
            const filtered = announcements.filter(announcement =>
                announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredAnnouncements(filtered);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchAnnouncements();
    };

    const renderAnnouncementItem = ({ item }: { item: Announcement }) => {
        return (<RenderAnnouncement
            item={item}
            viewMode={viewMode}
        />)
    };

    const renderSkeletonList = () => {
        const skeletonCount = viewMode === 'grid' ? 6 : 5;
        const SkeletonComponent = viewMode === 'grid' ? AnnouncementSkeletonGrid : AnnouncementSkeletonList;
        return (
            <View style={{ padding: spacing.sm }}>
                <FlatList
                    data={Array(skeletonCount).fill(0)}
                    renderItem={({ index }) => <SkeletonComponent key={index} />}
                    keyExtractor={(_, index) => `skeleton-${index}`}
                    numColumns={viewMode === 'grid' ? 2 : 1}
                    scrollEnabled={false}
                />
            </View>
        );
    };

    const renderEmptyState = () => (
        <EmptyStateComponent
            message={
                searchQuery
                    ? `No se encontraron anuncios para "${searchQuery}"`
                    : "No hay anuncios disponibles"
            }
            icon={searchQuery ? "🔍" : "📢"}
        />
    );

    const renderFilters = ({ showSkeleton }: { showSkeleton: boolean }) => {
        return (
            <>
                <View style={[globalStyles.flexRowBetween, globalStyles.header]}>
                    <Text style={globalStyles.headerTitle}>Anuncios</Text>
                </View>

                <View style={[
                    globalStyles.flexRow,
                    globalStyles.paddingHorizontal,
                    globalStyles.paddingVertical,
                    globalStyles.borderBottom,
                    { backgroundColor: colors.white }
                ]}>
                    <View style={[
                        globalStyles.flex1,
                        globalStyles.searchContainer,
                        { marginRight: spacing.lg }
                    ]}>
                        <Ionicons
                            name="search"
                            size={20}
                            color={colors.gray400}
                            style={{ marginRight: spacing.sm }}
                        />
                        <TextInput
                            style={[globalStyles.flex1, { paddingVertical: spacing.md }]}
                            placeholder="Buscar anuncios..."
                            placeholderTextColor={colors.gray400}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            editable={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ padding: spacing.sm }}
                        onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                    >
                        <Ionicons
                            name={viewMode === 'list' ? 'grid' : 'list'}
                            size={24}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>

                {showSkeleton && renderSkeletonList()}
            </>
        );
    }

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                {renderFilters({ showSkeleton: true })}
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>

            {renderFilters({ showSkeleton: false })}

            <FlatList
                data={filteredAnnouncements}
                renderItem={renderAnnouncementItem}
                keyExtractor={item => item.id.toString()}
                numColumns={viewMode === 'grid' ? 2 : 1}
                key={viewMode}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={
                    filteredAnnouncements.length === 0
                        ? { flex: 1 }
                        : { padding: spacing.sm }
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </SafeAreaView>
    );
}