

import { Announcement, User } from "@/types";
import type { ApiResponse } from "@/types/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { holaVecinoApi } from "../api/holaVecinoApi";

export const getAnnouncements = async (limit: number, offset: number) => {

    try {

        const user = JSON.parse(await AsyncStorage.getItem("user") as string) as User;

        const response = await holaVecinoApi.get<ApiResponse<Announcement[]>>(`/announcements/allByHoa/${user.hoaId}?limit=${limit}&offset=${offset}`)
        const { data } = response.data;

        console.log("Estamos trayendo los anuncios --- ", data)

        return data;

    } catch (error) {
        return []
    }

}

export const getAnnouncement = async (announcementId: string) => {

    try {

        const response = await holaVecinoApi.get<ApiResponse<Announcement>>(`/announcements/${announcementId}`)
        const { data } = response.data;

        return data;

    } catch (error) {
        return null
    }

}
