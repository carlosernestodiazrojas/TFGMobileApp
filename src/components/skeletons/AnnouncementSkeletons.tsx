/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { colors, globalStyles, spacing } from "@/styles";
import { View } from "react-native";

export const AnnouncementSkeletonGrid = () => {
    return (
        <View style={[globalStyles.gridItem, { backgroundColor: colors.white }]}>
            <View style={[
                globalStyles.imageGrid,
                { backgroundColor: colors.gray200 }
            ]} />
            <View style={{
                height: 16,
                backgroundColor: colors.gray200,
                borderRadius: 8,
                marginBottom: spacing.xs,
                width: '80%'
            }} />
            <View style={{
                height: 14,
                backgroundColor: colors.gray200,
                borderRadius: 6,
                width: '50%'
            }} />
        </View>
    );
}

export const AnnouncementSkeletonList = () => {
    return (
        <View style={[globalStyles.listItem, { backgroundColor: colors.white }]}>
            <View style={[
                globalStyles.imageSmall,
                { backgroundColor: colors.gray200, marginRight: spacing.lg }
            ]} />
            <View style={globalStyles.flex1}>
                <View style={{
                    height: 16,
                    backgroundColor: colors.gray200,
                    borderRadius: 8,
                    marginBottom: spacing.sm,
                    width: '80%'
                }} />
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
                    width: '40%'
                }} />
            </View>
        </View>
    );
}