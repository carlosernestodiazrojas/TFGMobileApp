
import RenderIncidence from '@/components/incidences/RenderIncidence';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyStateComponent, SkeletonCard } from '../../components/loading/LoadingComponent';
import { colors, globalStyles, spacing } from '../../styles';
import { Incidence, RootStackParamList } from '../../types';

export type IncidencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function IncidencesScreen() {
    const navigation = useNavigation<IncidencesScreenNavigationProp>();
    const [products, setProducts] = useState<Incidence[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Incidence[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchQuery, products]);

    const fetchProducts = async () => {
        try {

            const exampleProducts: Incidence[] = [
                {
                    "id": "a15462ad-94e9-4270-ba1e-3f7c1030a0cc",
                    "name": "Sin imagen",
                    "description": "Sin imagen",
                    "is_votable": false,
                    "is_solved": false,
                    "solved_at": null,
                    "is_deleted": false,
                    "created": "2025-07-04T17:05:01.634Z",
                    "updated": "2025-07-04T17:05:01.634Z",
                    "images": [],
                    "imagesUrls": []
                },
                {
                    "id": "c095a6b3-6588-40a1-94e4-2917887cdeb3",
                    "name": "Roto el picaporte",
                    "description": "Se ha roto el picaporte de la puerta principal",
                    "is_votable": true,
                    "is_solved": false,
                    "solved_at": null,
                    "is_deleted": false,
                    "created": "2025-07-04T16:50:38.798Z",
                    "updated": "2025-07-04T17:09:03.097Z",
                    "images": [
                        "b1cd6265-8571-4c93-8b72-ca0ba011793f"
                    ],
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/9e5f158909becd65e0a370ce5aaf17b2c5734afff3ca186f5f069ccc512b0d52.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T170828Z&X-Amz-Expires=600&X-Amz-Signature=d329706a43923a1520731669e0d18ee9f6dcd029813a7601ccc27def87ca5bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                },
                {
                    "id": "9bef740f-2754-4924-9565-f98fcb49af32",
                    "name": "La puerta del garage se ha averiado",
                    "description": "Debemos llamar al tecnico",
                    "is_votable": false,
                    "is_solved": false,
                    "solved_at": null,
                    "is_deleted": false,
                    "created": "2025-05-25T14:54:21.394Z",
                    "updated": "2025-05-25T14:54:21.394Z",
                    "images": [
                        "6d0aae51-45bc-4b23-9a3d-55cfeb58e2b0"
                    ],
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/2f60085750fe13592129e9ee0d6de0c2330e52f12a733c6c4cfc3e09e3e169e2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T170828Z&X-Amz-Expires=600&X-Amz-Signature=3e5efca2673443ac94cf2b1dde853065e6f6fd843e6006d16b4ebc1e99f75f3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                },
                {
                    "id": "c89e2b4b-0ad8-4103-bf50-a01deb3281dd",
                    "name": "Prueba",
                    "description": "Una incidencia de prueba",
                    "is_votable": true,
                    "is_solved": true,
                    "solved_at": "2025-05-24T23:00:00.000Z",
                    "is_deleted": false,
                    "created": "2025-05-25T14:53:15.349Z",
                    "updated": "2025-07-04T16:29:13.657Z",
                    "images": [
                        "61c354f9-00b6-4aff-afd8-06993cc43b6a"
                    ],
                    "imagesUrls": [
                        "http://87.106.118.122:9000/myfincapp-bucket/531e6e21ff021b5dc7753053b0141d7948e2ae9f299dac688f66d9cde0bb327f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minioadmin%2F20250706%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250706T170828Z&X-Amz-Expires=600&X-Amz-Signature=5c2039fd04dbcf43f682e93fff753059292942354c958da7fca9b7ec9d58ae74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                    ]
                }
            ]

            await new Promise(resolve => setTimeout(resolve, 1500));
            setProducts(exampleProducts);
        } catch (error) {
            Alert.alert('Error', 'Error de conexión');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filterProducts = () => {
        if (!searchQuery.trim()) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(incidence =>
                incidence.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
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
                            editable={false}
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
                data={filteredProducts}
                renderItem={renderIncidenceItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={
                    filteredProducts.length === 0
                        ? { flex: 1 }
                        : { padding: spacing.sm }
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
            />
        </SafeAreaView>
    );
}