import { getSpecialAssessments } from '@/actions/specialAssessmentActions';
import SpecialAssessmentSkeleton from '@/components/skeletons/SpecialAssessmentSkeleton';
import RenderSpecialAssessment from '@/components/special-assessments/RenderSpecialAssessment';
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
import { RootStackParamList, SpecialAssessment } from '../../types';

export type SpecialAssessmentNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SpecialAssessmentsTabScreen() {
    const navigation = useNavigation<SpecialAssessmentNavigationProp>();
    const [specialAssessments, setSpecialAssessments] = useState<SpecialAssessment[]>([]);
    const [filteredSpecialAssessments, setFilteredSpecialAssessments] = useState<SpecialAssessment[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showActiveOnly, setShowActiveOnly] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSpecialAssessments();
    }, []);

    useEffect(() => {
        filterSpecialAssessments();
    }, [searchQuery, showActiveOnly, specialAssessments]);

    const fetchSpecialAssessments = async () => {

        try {

            const specialAssessments = await getSpecialAssessments()
            setSpecialAssessments(specialAssessments as SpecialAssessment[])

        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }

    }

    const filterSpecialAssessments = () => {
        let filtered = specialAssessments;

        if (searchQuery.trim()) {
            filtered = filtered.filter(specialAssessment =>
                specialAssessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                specialAssessment.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (showActiveOnly) {
            filtered = filtered.filter(specialAssessment => specialAssessment.is_approved);
        }

        setFilteredSpecialAssessments(filtered);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchSpecialAssessments();
    };

    const toggleActiveFilter = () => {
        setShowActiveOnly(!showActiveOnly);
    };

    const renderSkeletonList = () => (
        <View style={{ padding: spacing.sm }}>
            {[1, 2, 3, 4].map((item) => (
                <SpecialAssessmentSkeleton key={item} />
            ))}
        </View>
    );

    const renderEmptyState = () => {
        if (searchQuery && showActiveOnly) {
            return (
                <EmptyStateComponent
                    message={`No se encontraron derramas activas para "${searchQuery}"`}
                    icon="🔍"
                />
            );
        } else if (searchQuery) {
            return (
                <EmptyStateComponent
                    message={`No se encontraron derramas para "${searchQuery}"`}
                    icon="🔍"
                />
            );
        } else if (showActiveOnly) {
            return (
                <EmptyStateComponent
                    message="No hay derramas activas"
                    icon="💰"
                />
            );
        } else {
            return (
                <EmptyStateComponent
                    message="No hay derramas registradas"
                    icon="💰"
                />
            );
        }
    };

    const renderSpecialAssessmentItem = ({ item }: { item: SpecialAssessment }) => (
        <RenderSpecialAssessment item={item} />
    );

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
                            placeholder="Buscar derramas..."
                            placeholderTextColor={colors.gray400}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            editable={!showSkeleton}
                        />
                    </View>

                    <View style={[globalStyles.flexRowBetween, { marginTop: spacing.md }]}>
                        <TouchableOpacity
                            style={[
                                filterStyles.filterButton,
                                showActiveOnly && filterStyles.filterButtonActive
                            ]}
                            onPress={toggleActiveFilter}
                        >
                            <Ionicons
                                name={showActiveOnly ? "checkbox" : "square-outline"}
                                size={20}
                                color={showActiveOnly ? colors.white : colors.gray400}
                            />
                            <Text style={[
                                filterStyles.filterText,
                                showActiveOnly && filterStyles.filterTextActive
                            ]}>
                                Solo activas
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {showSkeleton && renderSkeletonList()}
            </>
        )
    }

    if (loading) {
        return <View style={globalStyles.flex1}>{renderFilters({ showSkeleton: true })}</View>
    }

    return (
        <View style={globalStyles.flex1}>

            {renderFilters({ showSkeleton: false })}

            <FlatList
                data={filteredSpecialAssessments}
                renderItem={renderSpecialAssessmentItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={
                    filteredSpecialAssessments.length === 0
                        ? { flex: 1 }
                        : { padding: spacing.sm }
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </View>
    );
}

