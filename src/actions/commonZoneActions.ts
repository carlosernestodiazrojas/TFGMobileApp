/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { CommonZone, User } from "@/types";
import type { ApiResponse } from "@/types/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { holaVecinoApi } from "../api/holaVecinoApi";

export const getCommonZones = async () => {

    try {

        const user = JSON.parse(await AsyncStorage.getItem("userData") as string) as User;

        const response = await holaVecinoApi.get<ApiResponse<CommonZone[]>>(`/common-areas/allByHoa/${user.hoaId}`)
        const { data } = response.data;

        return data;

    } catch (error) {
        return []
    }

}

