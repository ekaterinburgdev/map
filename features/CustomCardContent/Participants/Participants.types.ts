enum DTPLight {
    Light = 'Светлое время суток',
    DarkLightOn = 'В темное время суток, освещение включено',
    DarkLightOff = 'В темное время суток, освещение не включено',
    DarkNoLight = 'В темное время суток, освещение отсутствует',
    Twilight = 'Сумерки',
}

export type DTPVehicle = {
    brand: string;
    color: string;
    model: string;
    category: string;
    year: number;
    participants: DTPParticipant[];
};

export type DTPParticipant = {
    role: string;
    gender: string;
    violations: string[];
    health_status: string;
    years_of_driving_experience?: number;
};

export type DTPObjectProperties = {
    vehicles: DTPVehicle[];
    dead_count: number;
    injured_count: number;
    participants_count: number;
    participants: DTPParticipant[];
    road_conditions: string[];
    participant_categories: string[];
    weather: string[];
    nearby: string[];
    tags: string[];
    datetime: string;
    address: string;
    severity: string;
    light: DTPLight;
    category: string;
};

export enum HealthStatusType {
    Dead = 'скончался',
    Injured = 'пострадал',
    NotInjured = 'не пострадал',
}
