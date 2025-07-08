import { User } from "@/types";
import type { ApiResponse } from "@/types/apiResponse";
import { AuthResponse } from "@/types/authResponse";
import { holaVecinoApi } from "../api/holaVecinoApi";



const returnUserToken = (data: AuthResponse): {
    token: string;
    user: User;
} => {
    const { access_token, email, role, user_id, hoa_id, name, last_name } = data;

    const user: User = {
        id: user_id,
        name: name,
        lastName: last_name,
        email: email,
        token: access_token,
        hoaId: hoa_id,
        role: role
    }
    return {
        token: access_token,
        user: user
    };
}

export const authLogin = async (email: string, password: string) => {

    try {

        const response = await holaVecinoApi.post<ApiResponse<AuthResponse>>('/auth/login', {
            email, password
        })
        const { data } = response.data;

        return returnUserToken(data as AuthResponse);

    } catch (error) {

        return null
    }

}

export const authRefreshToken = async (userId: string) => {
    try {
        const response = await holaVecinoApi.post<ApiResponse<AuthResponse>>('/auth/refresh_token', {
            userId
        })
        const { data } = response.data;

        return returnUserToken(data as AuthResponse);

    } catch (error) {
        return null
    }
}