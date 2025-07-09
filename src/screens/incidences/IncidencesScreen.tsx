
import { getIncidences } from '@/actions/incidenceActions';
import RenderIncidence from '@/components/incidences/RenderIncidence';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
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
import { EmptyStateComponent, SkeletonCard } from '../../components/loading/LoadingComponent';
import { colors, globalStyles, spacing } from '../../styles';
import { Incidence, RootStackParamList } from '../../types';

export type IncidencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function IncidencesScreen() {
    const navigation = useNavigation<IncidencesScreenNavigationProp>();
    const [Incidences, setIncidences] = useState<Incidence[]>([]);
    const [filteredIncidences, setFilteredIncidences] = useState<Incidence[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchIncidences();
        }, [])
    );

    useEffect(() => {
        filterIncidences();
    }, [searchQuery, Incidences]);

    const fetchIncidences = async () => {

        try {

            const incidences = await getIncidences()
            setIncidences(incidences as Incidence[])

        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }

    }

    const filterIncidences = () => {
        if (!searchQuery.trim()) {
            setFilteredIncidences(Incidences);
        } else {
            const filtered = Incidences.filter(incidence =>
                incidence.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredIncidences(filtered);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchIncidences();
    };

    const renderIncidenceItem = ({ item }: { item: Incidence }) => (
        <RenderIncidence item={item} />
    );

    const renderSkeletonList = () => (
        <View style={{ padding: spacing.sm }}>
            {[1, 2, 3, 4, 5].map((item) => (
                <SkeletonCard key={item} />
            ))}
        </View>
    );

    const renderEmptyState = () => (
        <EmptyStateComponent
            message={
                searchQuery
                    ? `No se encontraron incidencias para "${searchQuery}"`
                    : "No hay incidencias disponibles"
            }
            icon={searchQuery ? "🔍" : "📦"}
        />
    );

    const renderFilters = ({ showSkeleton }: { showSkeleton: boolean }) => {

        return (
            <>
                <View style={[globalStyles.flexRowBetween, globalStyles.header]}>
                    <Text style={globalStyles.headerTitle}>Incidencias</Text>
                    <TouchableOpacity
                        style={[
                            globalStyles.button,
                            globalStyles.flexRowCenter,
                            {
                                paddingHorizontal: spacing.lg,
                                paddingVertical: spacing.sm
                            }
                        ]}
                        onPress={() => navigation.navigate('CreateIncidence')}
                    >
                        <Ionicons name="add" size={20} color={colors.white} />
                        <Text style={[
                            globalStyles.buttonText,
                            { fontSize: 14, marginLeft: spacing.xs }
                        ]}>
                            Reportar incidencia
                        </Text>
                    </TouchableOpacity>
                </View>

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
                            placeholder="Buscar incidencias..."
                            placeholderTextColor={colors.gray400}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            editable={!showSkeleton}
                        />
                    </View>
                </View>

                {showSkeleton && renderSkeletonList()}
            </>
        )

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
                data={filteredIncidences}
                renderItem={renderIncidenceItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={
                    filteredIncidences.length === 0
                        ? { flex: 1 }
                        : { padding: spacing.sm }
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </SafeAreaView>
    );
}