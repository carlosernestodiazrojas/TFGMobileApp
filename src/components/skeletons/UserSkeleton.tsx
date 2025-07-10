/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { colors, globalStyles, profileCardStyles, spacing } from "@/styles";
import { View } from "react-native";

export const UserSkeleton = () => {
    return (
        <View style={[profileCardStyles.card, globalStyles.shadow, { marginBottom: spacing.lg }]}>

            <View style={profileCardStyles.header}>
                <View style={profileCardStyles.avatarContainer}>

                    <View style={[
                        profileCardStyles.avatar,
                        { backgroundColor: colors.gray200 }
                    ]} />

                    <View style={[
                        profileCardStyles.statusDot,
                        { backgroundColor: colors.gray200, borderColor: colors.white }
                    ]} />
                </View>
                <View style={profileCardStyles.userInfo}>

                    <View style={{
                        height: 18,
                        backgroundColor: colors.gray200,
                        borderRadius: 9,
                        width: '70%',
                        marginBottom: spacing.xs
                    }} />

                    <View style={{
                        height: 14,
                        backgroundColor: colors.gray200,
                        borderRadius: 7,
                        width: '85%',
                        marginBottom: spacing.sm
                    }} />

                    <View style={{
                        height: 24,
                        backgroundColor: colors.gray200,
                        borderRadius: 12,
                        width: 100
                    }} />
                </View>
            </View>

            <View style={profileCardStyles.details}>
                {[1, 2, 3, 4].map((item) => (
                    <View key={item} style={profileCardStyles.detailRow}>

                        <View style={{
                            width: 16,
                            height: 16,
                            backgroundColor: colors.gray200,
                            borderRadius: 8
                        }} />

                        <View style={{
                            height: 14,
                            backgroundColor: colors.gray200,
                            borderRadius: 7,
                            width: item === 1 ? '40%' : item === 2 ? '50%' : item === 3 ? '45%' : '60%',
                            marginLeft: spacing.sm
                        }} />
                    </View>
                ))}
            </View>

            <View style={profileCardStyles.permissions}>

                <View style={{
                    height: 14,
                    backgroundColor: colors.gray200,
                    borderRadius: 7,
                    width: '25%',
                    marginBottom: spacing.sm
                }} />

                <View style={profileCardStyles.permissionsContainer}>
                    {[1, 2, 3].map((item) => (
                        <View
                            key={item}
                            style={{
                                height: 24,
                                backgroundColor: colors.gray200,
                                borderRadius: 12,
                                width: item === 1 ? 80 : item === 2 ? 100 : 70,
                                marginRight: spacing.xs,
                                marginBottom: spacing.xs
                            }}
                        />
                    ))}
                </View>
            </View>

        </View>
    );
}