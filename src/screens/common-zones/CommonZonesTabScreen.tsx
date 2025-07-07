
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
import { EmptyStateComponent } from '../../components/loading/LoadingComponent';
import { colors, filterStyles, globalStyles, spacing } from '../../styles';
import { CommonZone, RootStackParamList } from '../../types';

import RenderCommonZoneItem from '@/components/common-zones/RenderCommonZone';
import CommonZoneSkeleton from '@/components/skeletons/CommonZoneSkeleton';

type CommonZonesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CommonZonesTabScreen() {
    const navigation = useNavigation<CommonZonesNavigationProp>();
    const [commonZones, setCommonZones] = useState<CommonZone[]>([]);
    const [filteredCommonZones, setFilteredCommonZones] = useState<CommonZone[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showBookableOnly, setShowBookableOnly] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCommonZones();
    }, []);

    useEffect(() => {
        filterCommonZones();
    }, [searchQuery, showBookableOnly, commonZones]);

    const fetchCommonZones = async () => {
        try {
            const exampleCommonZones: CommonZone[] = [
                {
                    "id": "adcbee2c-59db-487b-9e4e-e356dea33d82",
                    "name": "Test delete",
                    "description": "Cancha de padel pequeña",
                    "is_bookable": true,
                    "daily_capacity": 7,
                    "is_deleted": false,
                    "created": "2025-07-01T20:31:52.016Z",
                    "updated": "2025-07-01T20:31:52.016Z",
                    "images": [],
                    "imagesUrls": []
                },
                {
                    "id": "c235686b-a376-49db-9f2b-ad2fd1456cd3",
                    "name": "Cancha de padel 2",
                    "description": "Cancha de padel mas grande",
                    "is_bookable": false,
                    "daily_capacity": 0,
                    "is_deleted": false,
                    "created": "2025-06-08T13:32:11.307Z",
                    "updated": "2025-06-08T13:32:11.307Z",
                    "images": [],
                    "imagesUrls": []
                },
                {
                    "id": "a33689a4-2901-48dd-b72a-9b21be0f7c2a",
                    "name": "Piscina",
                    "description": "Esta es la piscina",
                    "is_bookable": true,
                    "daily_capacity": 17,
                    "is_deleted": false,
                    "created": "2025-06-08T12:09:43.506Z",
                    "updated": "2025-06-08T13:20:04.357Z",
                    "images": [
                        "d8566a95-4813-4b2f-bd55-d0c7de330d1e"
                    ],
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/bc56b431739bdfbd93b6eb5c23e3662465b5acfdab91d09880e021ab2f024ffa.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T180916Z&X-Amz-Expires=600&X-Amz-Signature=60e6d5fad5496edb555136415ca0f37a67d6c4da1ab528a99f423e6eec6abdd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                },
                {
                    "id": "7c645bab-4252-4ea3-9a16-0b9525887a2a",
                    "name": "Cancha de padel 1",
                    "description": "Cancha de padel pequeña 1",
                    "is_bookable": true,
                    "daily_capacity": 8,
                    "is_deleted": false,
                    "created": "2025-06-08T11:12:29.039Z",
                    "updated": "2025-06-08T13:31:50.519Z",
                    "images": [],
                    "imagesUrls": []
                }
            ]

            await new Promise(resolve => setTimeout(resolve, 1500));
            setCommonZones(exampleCommonZones);
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filterCommonZones = () => {
        let filtered = commonZones;

        if (searchQuery.trim()) {
            filtered = filtered.filter(zona =>
                zona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                zona.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (showBookableOnly) {
            filtered = filtered.filter(zona => zona.is_bookable);
        }

        setFilteredCommonZones(filtered);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchCommonZones();
    };

    const toggleActiveFilter = () => {
        setShowBookableOnly(!showBookableOnly);
    };

    const renderCommonZoneItem = ({ item }: { item: CommonZone }) => (
        <RenderCommonZoneItem item={item} />
    );

    const renderSkeletonList = () => (
        <View style={{ padding: spacing.sm }}>
            {[1, 2, 3, 4].map((item) => (
                <CommonZoneSkeleton key={item} />
            ))}
        </View>
    );

    const renderEmptyState = () => {
        if (searchQuery && showBookableOnly) {
            return (
                <EmptyStateComponent
                    message={`No se encontraron commonZones disponibles para "${searchQuery}"`}
                    icon="🔍"
                />
            );
        } else if (searchQuery) {
            return (
                <EmptyStateComponent
                    message={`No se encontraron commonZones para "${searchQuery}"`}
                    icon="🔍"
                />
            );
        } else if (showBookableOnly) {
            return (
                <EmptyStateComponent
                    message="No hay commonZones comunes disponibles"
                    icon="🏢"
                />
            );
        } else {
            return (
                <EmptyStateComponent
                    message="No hay commonZones comunes registradas"
                    icon="🏢"
                />
            );
        }
    };

    const renderFilters = ({ showSkeleton }: { showSkeleton: boolean }) => {
        return (
            <>
                <View style={[
                    globalStyles.paddingHorizontal,
                    globalStyles.paddingVertical,
                    globalStyles.borderBottom,
                    { backgroundColor: colors.white }
                ]}>

                    <View style={globalStyles.searchContainer}>
                        <Ionicons
                            name="search"
                            size={20}
                            color={colors.gray400}
                            style={{ marginRight: spacing.sm }}
                        />
                        <TextInput
                            style={[globalStyles.flex1, { paddingVertical: spacing.md }]}
                            placeholder="Buscar commonZones comunes..."
                            placeholderTextColor={colors.gray400}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            editable={false}
                        />
                    </View>

                    <View style={[globalStyles.flexRowBetween, { marginTop: spacing.md }]}>
                        <TouchableOpacity
                            style={[
                                filterStyles.filterButton,
                                showBookableOnly && filterStyles.filterButtonActive
                            ]}
                            onPress={toggleActiveFilter}
                        >
                            <Ionicons
                                name={showBookableOnly ? "checkbox" : "square-outline"}
                                size={20}
                                color={showBookableOnly ? colors.white : colors.gray400}
                            />
                            <Text style={[
                                filterStyles.filterText,
                                showBookableOnly && filterStyles.filterTextActive
                            ]}>
                                Solo reservables
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {showSkeleton && renderSkeletonList()}
            </>
        );
    }

    if (loading) {
        return <View style={globalStyles.flex1}>{renderFilters({ showSkeleton: true })}</View>
    }

    return (
        <View style={globalStyles.flex1}>

            {renderFilters({ showSkeleton: false })}

            <FlatList
                data={filteredCommonZones}
                renderItem={renderCommonZoneItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={
                    filteredCommonZones.length === 0
                        ? { flex: 1 }
                        : { padding: spacing.sm }
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </View>
    );
}

