/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import { formatDate } from '@/utils/formatDatesUtil';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, detailStyles, globalStyles, spacing } from '../../styles';
import { RootStackParamList } from '../../types';

const { width } = Dimensions.get('window');

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'IncidenceDetail'>;
type ProductDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductDetailScreen() {
    const navigation = useNavigation<ProductDetailScreenNavigationProp>();
    const route = useRoute<ProductDetailScreenRouteProp>();
    const { incidence } = route.params;


    return (
        <SafeAreaView style={globalStyles.container}>

            <View style={[globalStyles.flexRowBetween, globalStyles.header]}>
                <TouchableOpacity
                    style={{ padding: spacing.sm }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={globalStyles.headerSubtitle}>Detalle de la incidencia</Text>
                <TouchableOpacity
                    style={{ padding: spacing.sm }}
                >
                </TouchableOpacity>
            </View>

            <ScrollView style={globalStyles.flex1}>

                <Image
                    source={{ uri: incidence.imagesUrls[0] }}
                    style={globalStyles.imageDetail}
                />

                <View style={detailStyles.detailsContainer}>

                    <Text style={globalStyles.titleDark}>{incidence.name}</Text>
                    <Text style={[globalStyles.textDateLarge, globalStyles.marginBottomLg]}>
                        Creado: {formatDate(incidence.created)}
                    </Text>


                    <Text style={detailStyles.sectionTitle}>Descripción</Text>
                    <Text style={detailStyles.description}>{incidence.description}</Text>

                    <View style={detailStyles.contactContainer}>
                        <Text style={[globalStyles.textSmall, { color: colors.gray500 }]}>
                            ID de la incidencia
                        </Text>
                        <Text style={[globalStyles.textBold, { fontSize: 18, color: colors.gray800 }]}>
                            {incidence.id}
                        </Text>
                    </View>
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}