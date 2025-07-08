
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

import { getAnnouncements } from '@/actions/announcementActions';

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

            const announcements = await getAnnouncements(50, 0)
            setAnnouncements(announcements as Announcement[])

        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }

    }

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
                            editable={!showSkeleton}
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