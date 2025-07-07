import { colors, globalStyles, spacing, statusStyles } from "@/styles";
import { SpecialAssessment } from "@/types";
import { formatDate } from "@/utils/formatDatesUtil";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RenderSpecialAssessment = ({ item }: { item: SpecialAssessment }) => (
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
                            {item.title}
                        </Text>
                        <View style={[
                            statusStyles.statusBadge,
                            !item.is_approved ? statusStyles.activeBadge : statusStyles.inactiveBadge
                        ]}>
                            <Text style={[
                                statusStyles.statusText,
                                item.is_approved ? statusStyles.activeText : statusStyles.inactiveText
                            ]}>
                                {!item.is_approved ? 'Activa' : 'Inactiva'}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={[globalStyles.text, { fontSize: 14, marginBottom: spacing.xs }]}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>
                    <Text style={globalStyles.textDate}>${item.total_amount}</Text>
                    <Text style={[globalStyles.textSmall, { color: colors.gray500 }]}>
                        Vence: {formatDate(item.updated)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>


    </View>
);

export default RenderSpecialAssessment