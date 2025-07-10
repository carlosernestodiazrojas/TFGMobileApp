/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { colors, globalStyles, spacing } from "@/styles";
import { View } from "react-native";

const CommonZoneSkeleton = () => {
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
                            width: '60%'
                        }} />
                        <View style={{
                            height: 24,
                            backgroundColor: colors.gray200,
                            borderRadius: 12,
                            width: 80
                        }} />
                    </View>

                    <View style={{
                        height: 14,
                        backgroundColor: colors.gray200,
                        borderRadius: 6,
                        marginBottom: spacing.xs,
                        width: '90%'
                    }} />
                    <View style={{
                        height: 14,
                        backgroundColor: colors.gray200,
                        borderRadius: 6,
                        marginBottom: spacing.xs,
                        width: '70%'
                    }} />

                    <View style={[globalStyles.flexRowBetween, { marginBottom: spacing.xs }]}>
                        <View style={{
                            height: 16,
                            backgroundColor: colors.gray200,
                            borderRadius: 8,
                            width: '40%'
                        }} />
                        <View style={{
                            height: 14,
                            backgroundColor: colors.gray200,
                            borderRadius: 6,
                            width: '35%'
                        }} />
                    </View>

                    <View style={globalStyles.flexRow}>
                        <View style={{
                            width: 14,
                            height: 14,
                            backgroundColor: colors.gray200,
                            borderRadius: 7,
                            marginRight: spacing.xs
                        }} />
                        <View style={{
                            height: 14,
                            backgroundColor: colors.gray200,
                            borderRadius: 6,
                            width: '50%'
                        }} />
                    </View>
                </View>
            </View>

            <View style={{ marginTop: spacing.md }}>
                <View style={{
                    height: 12,
                    backgroundColor: colors.gray200,
                    borderRadius: 6,
                    width: '30%',
                    marginBottom: spacing.xs
                }} />
                <View style={globalStyles.flexRow}>
                    {[1, 2, 3].map((item) => (
                        <View
                            key={item}
                            style={{
                                height: 24,
                                backgroundColor: colors.gray200,
                                borderRadius: 12,
                                width: 60,
                                marginRight: spacing.xs
                            }}
                        />
                    ))}
                </View>
            </View>

        </View>
    );
}

export default CommonZoneSkeleton