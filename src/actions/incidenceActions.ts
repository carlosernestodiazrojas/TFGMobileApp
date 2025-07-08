

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

