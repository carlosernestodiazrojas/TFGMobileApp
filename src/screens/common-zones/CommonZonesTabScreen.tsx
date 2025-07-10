/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
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

import { getCommonZones } from '@/actions/commonZoneActions';
import RenderCommonZoneItem from '@/components/common-zones/RenderCommonZone';
import CommonZoneSkeleton from '@/components/skeletons/CommonZoneSkeleton';

export type CommonZonesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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

            const commonZones = await getCommonZones()
            setCommonZones(commonZones as CommonZone[])

        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }

    }

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

