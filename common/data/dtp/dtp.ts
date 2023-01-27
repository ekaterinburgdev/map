/* eslint-disable no-restricted-syntax */
import { getById } from '../base/getById';
import { fetchAPI, getObjectsTotalCount, STRAPI_BASE_URL } from '../dataHelpers';
import { DtpSeverityType } from './dtpSeverityType';
import { DtpParticipantType } from './dtpParticipantType';

let inputData;
const objectsByParticipants = new Map<DtpParticipantType, any[]>();

export const dtp = {
    async getObject(id: string) {
        return getById.getObject(id, '/dtps');
    },
    async getObjectsBySeverity(type: DtpSeverityType) {
        const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/dtps`);
        return (
            await fetchAPI(
                `${STRAPI_BASE_URL}/dtps?filters[severity][$eq]=${type}&populate=data,geometry&pagination[pageSize]=${totalCount}`,
            )
        ).data;
    },
    async getObjectsByParticipants(type: DtpParticipantType) {
        if (objectsByParticipants[type]) return objectsByParticipants[type];

        if (!inputData) {
            const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/dtps`);
            inputData = (
                await fetchAPI(
                    `${STRAPI_BASE_URL}/dtps?populate=data,geometry&pagination[pageSize]=${totalCount}`,
                )
            ).data;
        }

        const result = [];

        for (const e of inputData) {
            if (Array.from(e.attributes?.participant_categories).includes(type)) result.push(e);
        }
        objectsByParticipants[type] = result;
        return result;
    },
};

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
