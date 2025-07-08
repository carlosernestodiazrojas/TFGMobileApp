

import { Hoa, User } from "@/types";
import type { ApiResponse } from "@/types/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { holaVecinoApi } from "../api/holaVecinoApi";

export const getAuthorityProfiles = async () => {

    try {

        const user = JSON.parse(await AsyncStorage.getItem("userData") as string) as User;

        const response = await holaVecinoApi.get<ApiResponse<Hoa>>(`/hoas/${user.hoaId}`)
        const { success, data } = response.data;

        const authorityProfiles = []

        if (success && data) {
            const { president_id, admin_id } = data

            const promises = []

            if (president_id) {
                promises.push(getUserById(president_id))
            }

            if (admin_id) {
                promises.push(getUserById(admin_id))
            }

            if (promises.length > 0) {
                try {
                    const responses = await Promise.all(promises)

                    let responseIndex = 0

                    if (president_id) {
                        authorityProfiles.push(responses[responseIndex])
                        responseIndex++

                    }

                    if (admin_id) {
                        authorityProfiles.push(responses[responseIndex])
                        responseIndex++
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            }

            return authorityProfiles

        }

        return []


    } catch (error) {
        return []
    }

}

const getUserById = async (userId: string) => {
    try {

        const response = await holaVecinoApi.get<ApiResponse<Hoa>>(`/users/getUser/${userId}`)
        const { success, data } = response.data;

        if (success)
            return data

        return null

    } catch (error) {
        return null
    }
}
