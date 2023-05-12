import { intersection } from 'lodash';
import qs from 'qs';

import { HistogramDataWithoutValues, Range } from 'components/UI/RangeHistogram/types';
import { getById } from '../base/getById';
import { getObjectsTotalCount, parallelRequests, STRAPI_BASE_URL } from '../dataHelpers';
import { FilterOperator } from '../filterOperator';

import { DtpSeverityType } from './dtpSeverityType';
import { DtpParticipantType } from './dtpParticipantType';

export const dtp = {
    async getObject(id: string) {
        return getById.getObject(id, '/dtps');
    },
    async getSeverityFilters() {
        const dtps = await dtp.getObjects({
            severity: Object.values(DtpSeverityType),
            years: { from: 2015, to: new Date().getFullYear() },
        });

        return Object.entries(
            dtps.reduce((acc, dtpItem) => {
                if (acc[dtpItem.attributes.severity]) {
                    acc[dtpItem.attributes.severity] += 1;
                } else {
                    acc[dtpItem.attributes.severity] = 1;
                }

                return acc;
            }, {}),
        ) as [DtpSeverityType, number][];
    },
    async getParticipantFilters() {
        const dtps = await dtp.getObjects({
            severity: Object.values(DtpSeverityType),
            years: { from: 2015, to: new Date().getFullYear() },
        });

        return Object.entries(
            dtps.reduce((acc, dtpItem) => {
                const participants = dtpItem.attributes.participant_categories;

                participants?.forEach((participant) => {
                    if (acc[participant]) {
                        acc[participant] += 1;
                    } else {
                        acc[participant] = 1;
                    }
                });

                return acc;
            }, {}),
        ) as [DtpParticipantType, number][];
    },
    async getYearsFilters(histogramData: HistogramDataWithoutValues) {
        const requests: Promise<number>[] = [];

        histogramData.forEach(({ from, to }, idx) => {
            const toFilter = idx === histogramData.length - 1 ? FilterOperator['<='] : FilterOperator['<'];

            const url = `${STRAPI_BASE_URL}/dtps`;

            const query = qs.stringify({
                filters: {
                    datetime: {
                        [FilterOperator['>=']]: from,
                        [toFilter]: to,
                    },
                },
                fields: 'address',
            });

            requests.push(getObjectsTotalCount(`${url}?${query}`));
        });

        const result = await Promise.all(requests);

        return result;
    },
    async getObjects(filters: DTPFiltersParams) {
        const url = `${STRAPI_BASE_URL}/dtps`;

        const { severity, participants, years } = filters;

        const query = qs.stringify({
            filters: {
                datetime: {
                    [FilterOperator['>=']]: years.from,
                    [FilterOperator['<=']]: years.to,
                },
                ...(severity && severity.length
                    ? {
                        severity: {
                            [FilterOperator['=']]: severity,
                        },
                    }
                    : {}),
            },
            fields: ['severity', 'participant_categories'],
            populate: 'geometry',
        });

        const result = await parallelRequests(`${url}?${query}`, (x: DTPObject) => x);

        if (participants && participants.length) {
            const resultWithParticipants = [];

            result.forEach((dtpObject) => {
                const participantCategories = Array.from(
                    dtpObject.attributes?.participant_categories,
                );

                if (
                    participantCategories.length
                    && intersection(participantCategories, participants).length
                ) {
                    resultWithParticipants.push(dtpObject);
                }
            });

            return resultWithParticipants;
        }

        return result;
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
