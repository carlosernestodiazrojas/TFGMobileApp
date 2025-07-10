/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { IncidencesScreenNavigationProp } from "@/screens/incidences/IncidencesScreen";
import { globalStyles, spacing } from "@/styles";
import { Incidence } from "@/types";
import { formatDate } from "@/utils/formatDatesUtil";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RenderIncidence = ({ item }: { item: Incidence }) => {

    const navigation = useNavigation<IncidencesScreenNavigationProp>();

    return (
        <View style={[globalStyles.card, globalStyles.shadow]}>
            <TouchableOpacity
                onPress={() => navigation.navigate('IncidenceDetail', { incidence: item })}
            >
                <View style={globalStyles.flexRow}>
                    <Image
                        source={{ uri: item.imagesUrls[0] }}
                        style={[globalStyles.imageSmall, { marginRight: spacing.lg }]}
                    />
                    <View style={globalStyles.flex1}>
                        <Text style={[globalStyles.textBold, globalStyles.marginBottomSm]}>
                            {item.name}
                        </Text>
                        <Text
                            style={[globalStyles.text, { fontSize: 14, marginBottom: spacing.xs }]}
                            numberOfLines={2}
                        >
                            {item.description}
                        </Text>

                        <Text style={globalStyles.textDate}>{formatDate(item.created)}</Text>

                    </View>
                </View>
            </TouchableOpacity>


        </View>
    )
};

export default RenderIncidence