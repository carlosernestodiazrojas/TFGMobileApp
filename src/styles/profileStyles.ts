/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { colors, spacing } from "./colors";

export const profileCardStyles = {
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    header: {
        flexDirection: 'row' as const,
        alignItems: 'flex-start' as const,
        marginBottom: spacing.lg,
    },
    avatarContainer: {
        position: 'relative' as const,
        marginRight: spacing.lg,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    statusDot: {
        position: 'absolute' as const,
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.white,
    },
    activeDot: {
        backgroundColor: colors.green500,
    },
    inactiveDot: {
        backgroundColor: colors.gray400,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold' as const,
        color: colors.gray800,
        marginBottom: spacing.xs,
    },
    userEmail: {
        fontSize: 14,
        color: colors.gray600,
        marginBottom: spacing.sm,
    },
    roleContainer: {
        flexDirection: 'row' as const,
    },
    roleBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
    },
    adminBadge: {
        backgroundColor: colors.primary,
    },
    userBadge: {
        backgroundColor: colors.gray400,
    },
    roleText: {
        fontSize: 12,
        fontWeight: 'bold' as const,
    },
    adminText: {
        color: colors.white,
    },
    userText: {
        color: colors.white,
    },
    details: {
        marginBottom: spacing.lg,
    },
    detailRow: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        marginBottom: spacing.sm,
    },
    detailText: {
        fontSize: 14,
        color: colors.gray600,
        marginLeft: spacing.sm,
    },
    permissions: {
        marginBottom: spacing.lg,
    },
    permissionsTitle: {
        fontSize: 14,
        fontWeight: 'bold' as const,
        color: colors.gray700,
        marginBottom: spacing.sm,
    },
    permissionsContainer: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
    },
    permissionTag: {
        backgroundColor: colors.primaryOpacity10,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
        marginRight: spacing.xs,
        marginBottom: spacing.xs,
    },
    permissionText: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: '500' as const,
    },
    actions: {
        flexDirection: 'row' as const,
        justifyContent: 'flex-end' as const,
    },
    actionButton: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 12,
        marginLeft: spacing.sm,
    },
    editButton: {
        backgroundColor: colors.primary,
    },
    deleteButton: {
        backgroundColor: colors.red500,
    },
    actionButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold' as const,
        marginLeft: spacing.xs,
    },
};