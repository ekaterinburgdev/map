/* eslint-disable no-restricted-syntax */
import { canGetById } from '../base/canGetById';
import { fetchAPI, getObjectsTotalCount, STRAPI_BASE_URL } from '../dataHelpers';
import { DtpSeverityType } from './dtpSeverityType';
import { DtpParticipantType } from './dtpParticipantType';

let inputData;
const objectsByParticipants = new Map<DtpParticipantType, any[]>();

export const dtp = {
    async getObject(id: string) {
        return canGetById.getObject(id, '/dtps');
    },
    async getObjectsBySeverity(type: DtpSeverityType) {
        const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/dtps`);
        return (await fetchAPI(
            `${STRAPI_BASE_URL}/dtps?filters[severity][$eq]=${type}&populate=data,geometry&pagination[pageSize]=${totalCount}`,
        )).data;
    },
    async getObjectsByParticipants(type: DtpParticipantType) {
        if (objectsByParticipants[type]) return objectsByParticipants[type];

        if (!inputData) {
            const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/dtps`);
            inputData = (await fetchAPI(`${STRAPI_BASE_URL}/dtps?populate=data,geometry&pagination[pageSize]=${totalCount}`)).data;
        }

        const result = [];

        for (const e of inputData) {
            if (Array.from(e.attributes?.participant_categories).includes(type)) result.push(e);
        }
        objectsByParticipants[type] = result;
        return result;
    },
};
