import { colors, spacing } from "./colors";

export const tabStyles = {
    tabContainer: {
        flexDirection: 'row' as const,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.sm,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: colors.primary,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500' as const,
        color: colors.gray500,
    },
    activeTabText: {
        color: colors.primary,
        fontWeight: 'bold' as const,
    },
};