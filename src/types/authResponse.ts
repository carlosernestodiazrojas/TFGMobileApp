/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export interface AuthResponse {
    access_token: string;
    email: string;
    role: string;
    user_id: string;
    hoa_id: string;
    name: string;
    last_name: string;
}