/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { StyleSheet } from 'react-native';
import { borderRadius, colors, fontSize, spacing } from './colors';

export const loginStyles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xxxl,
    },
    icon: {
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: fontSize.xxxl,
        fontWeight: 'bold',
        color: colors.white,
        marginTop: spacing.lg,
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.whiteOpacity80,
        marginTop: spacing.sm,
    },
    formContainer: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.xxxl,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    credentialsInfo: {
        marginTop: spacing.xxl,
        padding: spacing.lg,
        backgroundColor: colors.primaryOpacity10,
        borderRadius: borderRadius.xl,
    },
    credentialsText: {
        fontSize: fontSize.sm,
        color: colors.gray600,
        textAlign: 'center',
    },
});

export const profileStyles = StyleSheet.create({
    profileHeader: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.xxxl,
        marginBottom: spacing.lg,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    avatar: {
        width: 96,
        height: 96,
        backgroundColor: colors.gray100,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    userName: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        color: colors.gray800,
        marginBottom: spacing.xs,
    },
    userEmail: {
        fontSize: fontSize.base,
        color: colors.gray600,
    },
    menuContainer: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.md,
        marginBottom: spacing.lg,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray100,
    },
    menuItemText: {
        flex: 1,
        fontSize: fontSize.base,
        color: colors.gray800,
        marginLeft: spacing.lg,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    logoutButtonText: {
        fontSize: fontSize.base,
        color: colors.red500,
        fontWeight: 'bold',
        marginLeft: spacing.sm,
    },
});

export const detailStyles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: colors.white,
        marginTop: -spacing.xl,
        borderTopLeftRadius: borderRadius.xxl,
        borderTopRightRadius: borderRadius.xxl,
        padding: spacing.xl,
        flex: 1,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    infoText: {
        fontSize: fontSize.base,
        color: colors.gray600,
        marginLeft: spacing.sm,
    },
    sectionTitle: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.gray800,
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
    },
    description: {
        fontSize: fontSize.base,
        color: colors.gray600,
        lineHeight: 24,
        marginBottom: spacing.lg,
    },
    contactContainer: {
        backgroundColor: colors.gray50,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.lg,
    },
    contactName: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.gray800,
        marginBottom: spacing.xs,
    },
    contactPhone: {
        fontSize: fontSize.base,
        color: colors.primary,
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray200,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.xl,
        paddingVertical: spacing.lg,
    },
    actionButtonPrimary: {
        backgroundColor: colors.primary,
        marginRight: spacing.sm,
    },
    actionButtonSuccess: {
        backgroundColor: colors.green500,
        marginLeft: spacing.sm,
    },
    actionButtonDanger: {
        backgroundColor: colors.red500,
        marginLeft: spacing.sm,
    },
    actionButtonText: {
        color: colors.white,
        fontSize: fontSize.base,
        fontWeight: 'bold',
        marginLeft: spacing.xs,
    },
});

export const formStyles = StyleSheet.create({
    formContainer: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.xxl,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    formTitle: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.gray800,
        marginBottom: spacing.xxl,
    },
    fieldContainer: {
        marginBottom: spacing.lg,
    },
    fieldLabel: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        color: colors.gray700,
        marginBottom: spacing.sm,
    },
    fieldRow: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    fieldHalf: {
        flex: 1,
    },
    fieldHalfLeft: {
        flex: 1,
        marginRight: spacing.sm,
    },
    fieldHalfRight: {
        flex: 1,
        marginLeft: spacing.sm,
    },
});