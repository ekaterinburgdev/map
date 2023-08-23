import groupBy from 'lodash/groupBy';
import { Range } from 'components/UI/RangeHistogram/types';
import { DTP_YEARS_RANGE } from 'components/Model/DTP/DTP.constants';

import dtpData from '../../../public/ekb-dtp.json';

import { fetchAPI } from '../dataHelpers';
import { DtpSeverityType } from './dtpSeverityType';
import { DtpParticipantType } from './dtpParticipantType';

export const dtp = {
    async getObject(id: string): Promise<object> {
        return fetchAPI(`/api/dtp?id=${id}`);
    },
    async getSeverityFilters() {
        const dtpBySeverity = Object.entries(
            groupBy(dtpData.features, (item) => item.properties.severity),
        )
            .map(([type, items]) => [type, items.length])
            .sort((a, b) => (b[1] as number) - (a[1] as number));

        return Promise.resolve(dtpBySeverity);
    },
    async getParticipantFilters() {
        const categories = Array.from(
            new Set(dtpData.features.map((item) => item.properties.participant_categories).flat(2)),
        );

        const dtpByParticipants = categories
            .map((category) => [
                category,
                dtpData.features.filter((item) =>
                    item.properties.participant_categories.includes(category),
                ),
            ])
            .map(([type, items]) => [type, items.length])
            .sort((a, b) => (b[1] as number) - (a[1] as number));

        return Promise.resolve(dtpByParticipants);
    },
    async getYearsFilters() {
        const years = DTP_YEARS_RANGE;

        const dtpByYear = years.map(
            (year) => dtpData.features.filter((item) => item.properties.year === year).length,
        );

        return Promise.resolve(dtpByYear);
    },
};

export interface DTPFiltersParams {
    severity?: DtpSeverityType[];
    participants?: DtpParticipantType[];
    years: Range;
}

export type DTPObject = {
    properties: DTPObjectProperties;
    geometry: {
        coordinates: [number, number];
    };
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
