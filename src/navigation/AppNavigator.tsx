import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AnnouncementDetailScreen from '../screens/announcements/AnnouncementDetailScreen';
import AnnouncementsScreen from '../screens/announcements/AnnouncementsScreen';
import IncidenceDetailScreen from '../screens/incidences/IncidenceDetailScreen';
import IncidencesScreen from '../screens/incidences/IncidencesScreen';
import ProfileScreen from '../screens/user-profile/ProfileScreen';
import ChangePasswordScreen from '../screens/user/ChangePasswordScreen';
import LoginScreen from '../screens/user/LoginScreen';

import MyHoaMainTabsScreen from '@/navigation/MyHoaMainTabScreenNavigator';

import CommonZoneDetailScreen from '@/screens/common-zones/CommonZoneDetailScreen';
import CreateIncidenceScreen from '@/screens/incidences/CreateIncidenceScreen';
import SpecialAssessmentDetailScreen from '@/screens/special-assessments/SpecialAssessmentDetailScreen';
import SpecialAssessmentsTabScreen from '@/screens/special-assessments/SpecialAssessmentsScreen';
import { Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList, TabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Announcements') {
                        iconName = focused ? 'megaphone' : 'megaphone-outline';
                    }

                    else if (route.name === 'Incidences') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';

                    }

                    else if (route.name === 'HoaInfo') {
                        iconName = focused ? 'business' : 'business-outline';
                    }

                    else if (route.name === 'SpecialAssessments') {
                        iconName = focused ? 'cash' : 'cash-outline';
                    }

                    else {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#667eea',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
                    paddingTop: 8,
                    height: Platform.OS === 'ios' ? 85 : 100,
                    marginBottom: Platform.OS === 'android' ? 0 : 0,
                    position: 'absolute',
                    bottom: Platform.OS === 'android' ? 0 : 0,
                    left: 0,
                    right: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            })}
        >
            <Tab.Screen
                name="Announcements"
                component={AnnouncementsScreen}
                options={{ tabBarLabel: 'Noticias' }}
            />
            <Tab.Screen
                name="Incidences"
                component={IncidencesScreen}
                options={{ tabBarLabel: 'Incidencias' }}
            />
            <Tab.Screen
                name="SpecialAssessments"
                component={SpecialAssessmentsTabScreen}
                options={{ tabBarLabel: 'Derramas' }}
            />
            <Tab.Screen
                name="HoaInfo"
                component={MyHoaMainTabsScreen}
                options={{ tabBarLabel: 'Comunidad' }}
            />
            <Tab.Screen
                name="UserProfile"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Mi perfil' }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <>
                    <Stack.Screen name="MainTabs" component={MainTabs} />
                    <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} />
                    <Stack.Screen name="IncidenceDetail" component={IncidenceDetailScreen} />
                    <Stack.Screen name="CreateIncidence" component={CreateIncidenceScreen} />
                    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                    <Stack.Screen name="SpecialAssessmentDetail" component={SpecialAssessmentDetailScreen} />
                    <Stack.Screen name="CommonZoneDetail" component={CommonZoneDetailScreen} />
                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}