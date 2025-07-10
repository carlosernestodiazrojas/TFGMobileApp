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

type CommonZoneDetailScreenRouteProp = RouteProp<RootStackParamList, 'CommonZoneDetail'>;

export default function CommonZoneDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute<CommonZoneDetailScreenRouteProp>();
    const { commonZone } = route.params;

    return (
        <SafeAreaView style={globalStyles.container}>

            <View style={[globalStyles.flexRowBetween, globalStyles.header]}>
                <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={globalStyles.headerSubtitle}>Detalle de la zona com&uacute;n</Text>
                <TouchableOpacity style={{ padding: 8 }}>
                </TouchableOpacity>
            </View>

            <ScrollView style={globalStyles.flex1}>

                <Image
                    source={{ uri: commonZone.imagesUrls[0] }}
                    style={globalStyles.imageDetail}
                />

                <View style={detailStyles.detailsContainer}>

                    <Text style={globalStyles.titleDark}>{commonZone.name}</Text>
                    <Text style={[globalStyles.textDateLarge, globalStyles.marginBottomLg]}>
                        Creado: {formatDate(commonZone.created)}
                    </Text>

                    <View style={[detailStyles.infoRow]}>

                        <Text style={detailStyles.sectionTitle}>Capacidad: {commonZone.daily_capacity}</Text>
                    </View>

                    <View style={[detailStyles.infoRow, { marginBottom: 20 }]}>
                        <Text style={detailStyles.sectionTitle}>Necesario reservar: {commonZone.is_bookable ? 'Si' : 'No'}</Text>
                    </View>

                    <Text style={detailStyles.sectionTitle}>Información</Text>
                    <Text style={detailStyles.description}>{commonZone.description}</Text>

                    <View style={detailStyles.contactContainer}>
                        <Text style={[globalStyles.textSmall, { color: colors.gray500 }]}>
                            ID de la zona comun
                        </Text>
                        <Text style={[globalStyles.textBold, { fontSize: 18, color: colors.gray800 }]}>
                            {commonZone.id}
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}