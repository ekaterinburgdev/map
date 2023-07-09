import { Range } from 'components/UI/RangeHistogram/types';

import { DtpSeverityType } from './dtpSeverityType';
import { DtpParticipantType } from './dtpParticipantType';

export const dtp = {
    async getSeverityFilters() {
        return Promise.resolve([
            ['Легкий', 4186],
            ['Тяжёлый', 3394],
            ['С погибшими', 542],
        ]);
    },
    async getParticipantFilters() {
        return Promise.resolve([
            ['Все участники', 8122],
            ['Пешеходы', 3079],
            ['Мотоциклисты', 453],
            ['Дети', 882],
            ['Велосипедисты', 343],
            ['Общ. транспорт', 321],
        ]);
    },
    async getYearsFilters() {
        return Promise.resolve([1014, 805, 730, 978, 1180, 1114, 1243, 1058]);
    },
};

export interface DTPFiltersParams {
    severity?: DtpSeverityType[];
    participants?: DtpParticipantType[];
    years: Range;
}

export type DTPObject = {
    id: string;
    attributes: DTPObjectAttributes;
};

export type DTPObjectAttributes = {
    geometry: {
        coordinates: [number, number];
    };
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
    severity: DtpSeverityType;
    light: DTPLight;
    category: string;
};

export enum DTPLight {
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
