

export interface Announcement {
    id: string;
    title: string;
    description: string;
    is_deleted: boolean;
    from: string;
    to: string;
    images: string[];
    imagesUrls: string[];
    created: string;
    updated: string;
}

export interface Incidence {
    id: string;
    name: string;
    description: string;
    is_votable: boolean;
    is_solved: boolean;
    solved_at: string | null;
    is_deleted: boolean;
    images: string[];
    imagesUrls: string[];

    created: string;
    updated: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    lastName: string;
    hoaId: string;
    token: string;
    role: string;
}

export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
    AnnouncementDetail: { announcement: Announcement };
    IncidenceDetail: { incidence: Incidence };
    CreateIncidence: undefined;
    EditIncidence: { incidence: Incidence };
    Profile: undefined;
    ChangePassword: undefined;

    SpecialAssessmentDetail: { specialAssessment: SpecialAssessment };

    CommonZoneDetail: { commonZone: CommonZone };
};

export type TabParamList = {
    Announcements: Object;
    CommonZones: Object;
    Incidences: Object;
    SpecialAssessments: Object;
    HoaInfo: Object;
    UserProfile: Object;
};

export interface SpecialAssessment {

    id: string;
    title: string;
    description: string;
    is_votable: boolean;
    total_amount: number;
    individual_amount: number;
    is_approved: boolean;
    is_deleted: boolean;
    images: string[];
    imagesUrls: string[];
    created: string;
    updated: string;
}


export interface CommonZone {
    id: string;
    name: string;
    description: string;
    is_bookable: boolean;
    daily_capacity: number;
    is_deleted: boolean;
    images: string[];
    imagesUrls: string[];
    created: string;
    updated: string;
}



interface Role {
    id: string;
    code: number;
    name: string;
}

interface HOA {
    id: string;
    name: string;
    address: string;
    images: string[];
    imagesUrls: string[];
    president_id: string | null;
    admin_id: string | null;
}

interface Property {
    id: string;
    property_identifier: string;
    is_deleted: boolean;
    property_type: string;
    has_storage_room: boolean;
    has_parking_space: boolean;
    current_on_payments: boolean;
    created: string;
    updated: string;
}

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    last_name: string;
    role: Role;
    hoa: HOA;
    property: Property | null;
    images: string[];
    imagesUrls: string[];
}