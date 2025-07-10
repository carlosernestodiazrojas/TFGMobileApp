/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { colors, spacing } from "./colors";

export const statusStyles = {
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
    },
    activeBadge: {
        backgroundColor: colors.green500,
    },
    inactiveBadge: {
        backgroundColor: colors.red500,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold' as const,
    },
    activeText: {
        color: colors.white,
    },
    inactiveText: {
        color: colors.white,
    },
};

export const filterStyles = {
    filterButton: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.gray100,
    },
    filterButtonActive: {
        backgroundColor: colors.primary,
    },
    filterText: {
        fontSize: 14,
        color: colors.gray600,
        marginLeft: spacing.xs,
    },
    filterTextActive: {
        color: colors.white,
    },
};




export const amenityStyles = {
    amenityTag: {
        backgroundColor: colors.primaryOpacity10,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
        marginRight: spacing.xs,
    },
    amenityText: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: '500' as const,
    },
};