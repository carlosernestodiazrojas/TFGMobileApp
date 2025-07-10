/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { colors, globalStyles, spacing, statusStyles } from "@/styles";
import { CommonZone } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { CommonZonesNavigationProp } from "@/screens/common-zones/CommonZonesTabScreen";

const RenderCommonZoneItem = ({ item }: { item: CommonZone }) => {

    const navigation = useNavigation<CommonZonesNavigationProp>();

    return (
        <View style={[globalStyles.card, globalStyles.shadow]}>
            <TouchableOpacity
                onPress={() => navigation.navigate('CommonZoneDetail', { commonZone: item })}
            >
                <View style={globalStyles.flexRow}>
                    <Image
                        source={{ uri: item.imagesUrls[0] }}
                        style={[globalStyles.imageSmall, { marginRight: spacing.lg }]}
                    />
                    <View style={globalStyles.flex1}>
                        <View style={[globalStyles.flexRowBetween, globalStyles.marginBottomSm]}>
                            <Text style={globalStyles.textBold}>
                                {item.name}
                            </Text>
                            <View style={[
                                statusStyles.statusBadge,
                                item.is_bookable ? statusStyles.activeBadge : statusStyles.inactiveBadge
                            ]}>
                                <Text style={[
                                    statusStyles.statusText,
                                    item.is_bookable ? statusStyles.activeText : statusStyles.inactiveText
                                ]}>
                                    {item.is_bookable ? 'Reservable' : 'No reservable'}
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={[globalStyles.text, { fontSize: 14, marginBottom: spacing.xs }]}
                            numberOfLines={2}
                        >
                            {item.description}
                        </Text>
                        <View style={[globalStyles.flexRowBetween, { marginBottom: spacing.xs }]}>
                            <Text style={[globalStyles.textSmall, { color: colors.gray500 }]}>
                                Cap: {item.daily_capacity} personas
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>



        </View>
    )
};

export default RenderCommonZoneItem