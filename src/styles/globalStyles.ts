/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Dimensions, StyleSheet } from 'react-native';
import { borderRadius, colors, fontSize, spacing } from './colors';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.gray50,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.gray50,
    },
    screenPadding: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },

    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex1: {
        flex: 1,
    },

    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardLarge: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.xxl,
        marginBottom: spacing.lg,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    headerTitle: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
        color: colors.gray800,
    },
    headerSubtitle: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.gray800,
    },

    button: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.xl,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLarge: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.xxl,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.sm,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonSecondary: {
        backgroundColor: colors.gray200,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDanger: {
        backgroundColor: colors.red500,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSuccess: {
        backgroundColor: colors.green500,
        borderRadius: borderRadius.xl,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: colors.gray300,
        opacity: 0.5,
    },

    buttonText: {
        color: colors.white,
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: colors.gray700,
        fontSize: fontSize.base,
        fontWeight: 'bold',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray200,
        borderRadius: borderRadius.xl,
        backgroundColor: colors.gray50,
        marginBottom: spacing.lg,
    },
    input: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        fontSize: fontSize.base,
        color: colors.gray800,
    },
    inputIcon: {
        marginLeft: spacing.lg,
        marginRight: spacing.sm,
    },
    inputEyeIcon: {
        paddingHorizontal: spacing.lg,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray50,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        marginRight: spacing.lg,
    },

    title: {
        fontSize: fontSize.title,
        fontWeight: 'bold',
        color: colors.white,
        marginTop: spacing.xl,
    },
    titleDark: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
        color: colors.gray800,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: fontSize.base,
        color: colors.whiteOpacity80,
        marginTop: spacing.sm,
    },
    text: {
        fontSize: fontSize.base,
        color: colors.gray600,
    },
    textBold: {
        fontSize: fontSize.base,
        fontWeight: 'bold',
        color: colors.gray800,
    },
    textSmall: {
        fontSize: fontSize.sm,
        color: colors.gray500,
    },
    textDate: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.primary,
    },
    textDateLarge: {
        fontSize: fontSize.title,
        fontWeight: 'bold',
        color: colors.primary,
    },
    textCenter: {
        textAlign: 'center',
    },

    imageSmall: {
        width: 80,
        height: 80,
        borderRadius: borderRadius.xl,
    },
    imageMedium: {
        width: 120,
        height: 120,
        borderRadius: borderRadius.xl,
    },
    imageGrid: {
        width: '100%',
        height: 120,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
    },
    imageDetail: {
        width: width,
        height: 250,
    },

    listItem: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    gridItem: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        margin: spacing.xs,
        padding: spacing.lg,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    marginBottomSm: {
        marginBottom: spacing.sm,
    },
    marginBottomMd: {
        marginBottom: spacing.md,
    },
    marginBottomLg: {
        marginBottom: spacing.lg,
    },
    marginRightSm: {
        marginRight: spacing.sm,
    },
    marginRightMd: {
        marginRight: spacing.md,
    },
    paddingHorizontal: {
        paddingHorizontal: spacing.lg,
    },
    paddingVertical: {
        paddingVertical: spacing.lg,
    },

    shadow: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    shadowLarge: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: colors.gray200,
    },
});