/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { AnnouncementsScreenNavigationProp } from "@/screens/announcements/AnnouncementsScreen";
import { colors, globalStyles, spacing } from "@/styles";
import { Announcement } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { formatDate } from "@/utils/formatDatesUtil";

const RenderAnnouncement = ({ item, viewMode }: { item: Announcement; viewMode: string }) => {

    const navigation = useNavigation<AnnouncementsScreenNavigationProp>();

    if (viewMode === 'grid') {
        return (
            <TouchableOpacity
                style={[globalStyles.gridItem, globalStyles.shadow]}
                onPress={() => navigation.navigate('AnnouncementDetail', { announcement: item })}
            >
                <Image
                    source={{ uri: item.imagesUrls[0] }}
                    style={globalStyles.imageGrid}
                />
                <Text
                    style={[globalStyles.textBold, { fontSize: 14, marginBottom: spacing.xs }]}
                    numberOfLines={2}
                >
                    {item.title}
                </Text>
                <Text style={globalStyles.textDate}>{formatDate(item.created)}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[globalStyles.listItem]}
            onPress={() => navigation.navigate('AnnouncementDetail', { announcement: item })}
        >
            <Image
                source={{ uri: item.imagesUrls[0] }}
                style={[globalStyles.imageSmall, { marginRight: spacing.lg }]}
            />
            <View style={globalStyles.flex1}>
                <Text style={[globalStyles.textBold, globalStyles.marginBottomSm]}>
                    {item.title}
                </Text>
                <Text
                    style={[globalStyles.text, { fontSize: 14, marginBottom: spacing.xs }]}
                    numberOfLines={2}
                >
                    {item.description}
                </Text>
                <Text style={globalStyles.textDate}>{formatDate(item.created)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray300} />
        </TouchableOpacity>
    );
};

export default RenderAnnouncement