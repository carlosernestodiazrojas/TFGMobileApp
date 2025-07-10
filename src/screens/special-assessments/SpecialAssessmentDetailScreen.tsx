/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, detailStyles, globalStyles } from '../../styles';
import { RootStackParamList } from '../../types';

import { formatDate } from '@/utils/formatDatesUtil';

type SpecialAssessmentDetailScreenRouteProp = RouteProp<RootStackParamList, 'SpecialAssessmentDetail'>;

export default function SpecialAssessmentDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute<SpecialAssessmentDetailScreenRouteProp>();
    const { specialAssessment } = route.params;

    return (
        <SafeAreaView style={globalStyles.container}>

            <View style={[globalStyles.flexRowBetween, globalStyles.header]}>
                <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={globalStyles.headerSubtitle}>Detalle de la derrama</Text>
                <TouchableOpacity style={{ padding: 8 }}>
                </TouchableOpacity>
            </View>

            <ScrollView style={globalStyles.flex1}>

                <Image
                    source={{ uri: specialAssessment.imagesUrls[0] }}
                    style={globalStyles.imageDetail}
                />

                <View style={detailStyles.detailsContainer}>
                    <Text style={globalStyles.titleDark}>{specialAssessment.title}</Text>
                    <Text style={[globalStyles.textDateLarge, globalStyles.marginBottomLg]}>
                        Creado: {formatDate(specialAssessment.created)}
                    </Text>

                    <View style={[detailStyles.infoRow]}>
                        <Text style={detailStyles.sectionTitle}>Monto total: {specialAssessment.total_amount}</Text>
                    </View>

                    <View style={[detailStyles.infoRow, { marginBottom: 20 }]}>
                        <Text style={detailStyles.sectionTitle}>Monto individual: {specialAssessment.individual_amount}</Text>
                    </View>

                    <Text style={detailStyles.sectionTitle}>Información</Text>
                    <Text style={detailStyles.description}>{specialAssessment.description}</Text>

                    <View style={detailStyles.contactContainer}>
                        <Text style={[globalStyles.textSmall, { color: colors.gray500 }]}>
                            ID de la derrama
                        </Text>
                        <Text style={[globalStyles.textBold, { fontSize: 18, color: colors.gray800 }]}>
                            {specialAssessment.id}
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}