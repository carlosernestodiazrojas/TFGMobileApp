import { colors, globalStyles, spacing } from "@/styles";
import { View } from "react-native";

const SpecialAssessmentSkeleton = () => {
    return (
        <View style={[globalStyles.card, { backgroundColor: colors.white, marginBottom: spacing.sm }]}>
            <View style={globalStyles.flexRow}>

                <View style={[
                    globalStyles.imageSmall,
                    { backgroundColor: colors.gray200, marginRight: spacing.lg }
                ]} />

                <View style={globalStyles.flex1}>

                    <View style={[globalStyles.flexRowBetween, globalStyles.marginBottomSm]}>
                        <View style={{
                            height: 16,
                            backgroundColor: colors.gray200,
                            borderRadius: 8,
                            width: '65%'
                        }} />
                        <View style={{
                            height: 24,
                            backgroundColor: colors.gray200,
                            borderRadius: 12,
                            width: 70
                        }} />
                    </View>

                    <View style={{
                        height: 14,
                        backgroundColor: colors.gray200,
                        borderRadius: 6,
                        marginBottom: spacing.xs,
                        width: '95%'
                    }} />
                    <View style={{
                        height: 14,
                        backgroundColor: colors.gray200,
                        borderRadius: 6,
                        marginBottom: spacing.xs,
                        width: '75%'
                    }} />

                    <View style={{
                        height: 18,
                        backgroundColor: colors.gray200,
                        borderRadius: 9,
                        marginBottom: spacing.xs,
                        width: '35%'
                    }} />

                    <View style={{
                        height: 14,
                        backgroundColor: colors.gray200,
                        borderRadius: 6,
                        width: '45%'
                    }} />
                </View>
            </View>

        </View>
    );
}

export default SpecialAssessmentSkeleton