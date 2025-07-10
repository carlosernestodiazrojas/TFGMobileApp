/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';
import { colors, globalStyles, spacing } from '../../styles';

interface LoadingComponentProps {
    message?: string;
    size?: 'small' | 'large';
    overlay?: boolean;
}

export default function LoadingComponent({
    message = 'Cargando...',
    size = 'large',
    overlay = false
}: LoadingComponentProps) {
    const containerStyle = overlay ? loadingStyles.overlayContainer : loadingStyles.container;

    return (
        <View style={containerStyle}>
            <View style={loadingStyles.content}>
                <ActivityIndicator
                    size={size}
                    color={colors.primary}
                    style={loadingStyles.spinner}
                />
                <Text style={loadingStyles.message}>{message}</Text>
            </View>
        </View>
    );
}

export function EmptyStateComponent({
    message = 'No hay elementos para mostrar',
    icon = '📭'
}: { message?: string; icon?: string }) {
    return (
        <View style={loadingStyles.emptyContainer}>
            <Text style={loadingStyles.emptyIcon}>{icon}</Text>
            <Text style={loadingStyles.emptyMessage}>{message}</Text>
        </View>
    );
}

export function SkeletonCard() {
    return (
        <View style={[globalStyles.card, loadingStyles.skeletonCard]}>
            <View style={globalStyles.flexRow}>
                <View style={loadingStyles.skeletonImage} />
                <View style={[globalStyles.flex1, { marginLeft: spacing.lg }]}>
                    <View style={[loadingStyles.skeletonLine, { width: '80%', marginBottom: spacing.sm }]} />
                    <View style={[loadingStyles.skeletonLine, { width: '60%', marginBottom: spacing.xs }]} />
                    <View style={[loadingStyles.skeletonLine, { width: '40%' }]} />
                </View>
            </View>
        </View>
    );
}

const loadingStyles = {

    container: {
        flex: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        backgroundColor: colors.gray50,
        paddingHorizontal: spacing.xl,
    },

    overlayContainer: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        backgroundColor: colors.blackOpacity50,
        zIndex: 1000,
    },

    content: {
        alignItems: 'center' as const,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.xxxl,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },

    spinner: {
        marginBottom: spacing.lg,
    },

    message: {
        fontSize: 16,
        color: colors.gray600,
        textAlign: 'center' as const,
        fontWeight: '500' as const,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        paddingHorizontal: spacing.xl,
    },

    emptyIcon: {
        fontSize: 48,
        marginBottom: spacing.lg,
    },

    emptyMessage: {
        fontSize: 16,
        color: colors.gray500,
        textAlign: 'center' as const,
        fontWeight: '500' as const,
    },

    skeletonCard: {
        backgroundColor: colors.white,
    },

    skeletonImage: {
        width: 80,
        height: 80,
        backgroundColor: colors.gray200,
        borderRadius: 16,
    },

    skeletonLine: {
        height: 16,
        backgroundColor: colors.gray200,
        borderRadius: 8,
    },
};