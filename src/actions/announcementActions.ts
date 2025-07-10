/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Announcement, User } from "@/types";
import type { ApiResponse } from "@/types/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { holaVecinoApi } from "../api/holaVecinoApi";

export const getAnnouncements = async (limit: number, offset: number) => {

    try {

        const user = JSON.parse(await AsyncStorage.getItem("userData") as string) as User;

        const response = await holaVecinoApi.get<ApiResponse<Announcement[]>>(`/announcements/allByHoa/${user.hoaId}?limit=${limit}&offset=${offset}`)
        const { data } = response.data;

        return data;

    } catch (error) {
        return []
    }

}

