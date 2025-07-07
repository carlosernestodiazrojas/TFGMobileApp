import { colors, globalStyles, spacing, statusStyles } from "@/styles";
import { CommonZone } from "@/types";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RenderCommonZoneItem = ({ item }: { item: CommonZone }) => (
    <View style={[globalStyles.card, globalStyles.shadow]}>
        <TouchableOpacity
            onPress={() => { }}
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
);

export default RenderCommonZoneItem