
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
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

import { formatDate, formatDateShort } from '@/utils/formatDatesUtil';


type AnnouncementDetailScreenRouteProp = RouteProp<RootStackParamList, 'AnnouncementDetail'>;

export default function AnnouncementDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute<AnnouncementDetailScreenRouteProp>();
    const { announcement } = route.params;

    return (
        <SafeAreaView style={globalStyles.container}>

            <View style={[globalStyles.flexRowBetween, globalStyles.header]}>
                <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={globalStyles.headerSubtitle}>Detalle del Anuncio</Text>
                <TouchableOpacity style={{ padding: 8 }}>
                </TouchableOpacity>
            </View>

            <ScrollView style={globalStyles.flex1}>

                <Image
                    source={{ uri: announcement.imagesUrls[0] }}
                    style={globalStyles.imageDetail}
                />

                <View style={detailStyles.detailsContainer}>

                    <Text style={globalStyles.titleDark}>{announcement.title}</Text>
                    <Text style={[globalStyles.textDateLarge, globalStyles.marginBottomLg]}>
                        Creado: {formatDate(announcement.created)}
                    </Text>

                    <View style={[detailStyles.infoRow]}>

                        <Text style={detailStyles.infoText}>Activo desde: {formatDateShort(announcement.from)}</Text>
                    </View>

                    <View style={[detailStyles.infoRow, { marginBottom: 20 }]}>
                        <Text style={detailStyles.infoText}>Hasta: {formatDateShort(announcement.to)}</Text>
                    </View>

                    <Text style={detailStyles.sectionTitle}>Información</Text>
                    <Text style={detailStyles.description}>{announcement.description}</Text>

                    <View style={detailStyles.contactContainer}>
                        <Text style={[globalStyles.textSmall, { color: colors.gray500 }]}>
                            ID del anuncio
                        </Text>
                        <Text style={[globalStyles.textBold, { fontSize: 18, color: colors.gray800 }]}>
                            {announcement.id}
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}