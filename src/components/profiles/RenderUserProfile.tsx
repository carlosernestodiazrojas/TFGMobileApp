/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { colors, globalStyles, profileCardStyles } from "@/styles";
import { UserProfile } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const RenderUserCard = ({ user }: { user: UserProfile }) => (
    <View key={user.id} style={[profileCardStyles.card, globalStyles.shadow]}>
        <TouchableOpacity
            onPress={() => { }}
        >

            <View style={profileCardStyles.header}>
                <View style={profileCardStyles.avatarContainer}>
                    <Image
                        source={{ uri: user.imagesUrls[0] }}
                        style={profileCardStyles.avatar}
                    />
                    <View style={[
                        profileCardStyles.statusDot,
                        profileCardStyles.activeDot
                    ]} />
                </View>
                <View style={profileCardStyles.userInfo}>
                    <Text style={profileCardStyles.userName}>{user.name}</Text>
                    <Text style={profileCardStyles.userName}>{user.last_name}</Text>
                    <Text style={profileCardStyles.userEmail}>{user.email}</Text>
                    <View style={profileCardStyles.roleContainer}>
                        <View style={[
                            profileCardStyles.roleBadge,
                            user.role.name === 'admin' ? profileCardStyles.adminBadge : profileCardStyles.userBadge
                        ]}>
                            <Text style={[
                                profileCardStyles.roleText,
                                user.role.name === 'admin' ? profileCardStyles.adminText : profileCardStyles.userText
                            ]}>
                                {user.role.name}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={profileCardStyles.details}>

                <View style={profileCardStyles.detailRow}>
                    <Ionicons name="calendar" size={16} color={colors.gray400} />
                    <Text style={profileCardStyles.detailText}>Direccion: {user.hoa.address}</Text>
                </View>
                <View style={profileCardStyles.detailRow}>
                    <Ionicons name="time" size={16} color={colors.gray400} />
                    <Text
                        style={profileCardStyles.detailText}
                    >
                        Propietario de: {user.property?.property_identifier ?? ''}
                    </Text>
                </View>
            </View>

        </TouchableOpacity>


    </View>
);