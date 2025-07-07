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

type SpecialAssessmentNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
            const exampleSpecialAssessments: SpecialAssessment[] = [
                {
                    "id": "ef0f8a07-3903-45a2-b009-eb3b33549175",
                    "title": "Derrama 3",
                    "description": "Derrama 3",
                    "is_votable": false,
                    "total_amount": 0.00,
                    "individual_amount": 0.00,
                    "is_approved": false,
                    "is_deleted": false,
                    "created": "2025-07-04T20:44:10.016Z",
                    "updated": "2025-07-04T20:44:10.016Z",
                    "images": [],
                    "imagesUrls": []
                },
                {
                    "id": "8932d558-f51d-4eeb-94c0-3d38a841e93a",
                    "title": "Derrama 2",
                    "description": "Derrama para arreglar el suelo de la terraza",
                    "is_votable": true,
                    "total_amount": 150.80,
                    "individual_amount": 15.30,
                    "is_approved": false,
                    "is_deleted": false,
                    "created": "2025-05-25T17:09:40.822Z",
                    "updated": "2025-07-04T20:38:31.678Z",
                    "images": [],
                    "imagesUrls": []
                },
                {
                    "id": "5350a2f3-0120-4377-b945-27cb026bbb9f",
                    "title": "Derrama Piscina",
                    "description": "Es necesario arreglar la depuradora de la piscina. Se necesita de la colaboración de todos los vecinos por favor. \nEn la próxima junta sera el principal punto del día.",
                    "is_votable": true,
                    "total_amount": 1500.00,
                    "individual_amount": 125.00,
                    "is_approved": false,
                    "is_deleted": false,
                    "created": "2025-05-25T17:08:23.136Z",
                    "updated": "2025-07-04T20:40:57.187Z",
                    "images": [
                        "d263a778-ca2e-40ee-a545-d5225d3b2564"
                    ],
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/bc56b431739bdfbd93b6eb5c23e3662465b5acfdab91d09880e021ab2f024ffa.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T175721Z&X-Amz-Expires=600&X-Amz-Signature=7c1645219bcad8bed3ad91f3a3d9abb635ed05a263a4eff350460ba051677f3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                }
            ]

            await new Promise(resolve => setTimeout(resolve, 1500));
            setSpecialAssessments(exampleSpecialAssessments);
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

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
                            editable={false}
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

