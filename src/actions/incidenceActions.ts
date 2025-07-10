/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Incidence, User } from "@/types";
import type { ApiResponse } from "@/types/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { holaVecinoApi } from "../api/holaVecinoApi";

export const getIncidences = async () => {

    try {

        const user = JSON.parse(await AsyncStorage.getItem("userData") as string) as User;

        const response = await holaVecinoApi.get<ApiResponse<Incidence[]>>(`/incidences/allByHoa/${user.hoaId}`)
        const { data } = response.data;

        return data;

    } catch (error) {
        return []
    }

}

export const uploadIncidenceImage = async (formData: FormData) => {
    try {

        const response =
            await holaVecinoApi.post<ApiResponse<{ success: boolean; ids: string[] }>>(`/files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                transformRequest: [(data) => data],
            })

        return response.data.data

    } catch (error) {
        console.error(error);
    }
}

export const createIncidence = async (data: {
    name: string;
    description: string;
    hoa_id: string;
    is_votable: boolean;
    file_id?: string;
}) => {

    try {

        const response =
            await holaVecinoApi.post<ApiResponse<string>>(`/incidences`, data)

        return response.data.data

    } catch (error) {
        console.error(error);
    }


}




