import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    setUser(JSON.parse(userData));
                    setIsAuthenticated(true);
                }
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (email === 'admin@example.com' && password === 'password') {
                const userData: User = {
                    id: '1',
                    email,
                    name: 'Administrador',
                    token: 'fake-token-123',
                };

                await AsyncStorage.setItem('userToken', userData.token);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                setUser(userData);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { success: false, error: 'Credenciales inválidas' };
            }
        } catch (error) {
            return { success: false, error: 'Error de conexión' };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Error de conexión' };
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        changePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};