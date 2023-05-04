import qs from 'qs';
import {
    fetchAPI,
    getObjectsTotalCount,
    parallelRequests,
    parseJsonWithSingleQuotes,
    STRAPI_BASE_URL,
} from '../dataHelpers';
import { getById } from '../base/getById';
import { Area } from '../base/objectsBase';
import { FilterOperator } from '../filterOperator';
import { OknAreaType, OknObjectSignificanceType } from './oknConstants';
import { OknObject, OknObjectWithGeometry } from './oknObject';

export const okn = {
    async getObject(id: string): Promise<OknObject> {
        return getById.getObject(id, '/okn-objects').then((x) => {
            x.attributes.img = parseJsonWithSingleQuotes(x.attributes?.img);
            x.attributes.document = parseJsonWithSingleQuotes(x.attributes?.document);
            return x;
        });
    },

    async getObjectsBySignificanceType(
        types: OknObjectSignificanceType[],
    ): Promise<OknObjectWithGeometry[]> {
        const url = `${STRAPI_BASE_URL}/okn-objects`;

        const query = qs.stringify({
            filters: {
                category: {
                    [FilterOperator.Equal]: types,
                },
            },
            fields: 'category',
            populate: 'geometry',
        });

        const result = await parallelRequests(`${url}?${query}`, (x: OknObjectWithGeometry) => x);

        return result;
    },

    async getAreaByType(type: OknAreaType): Promise<Area | undefined> {
        const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/okn-objects`);
        const query = {
            populate: ['geometry', 'data', 'borders'],
            pagination: {
                pageSize: totalCount,
            },
            fields: undefined,
        };

        if (type === OknAreaType.ObjectZone) {
            query.fields = 'name';

            return (await fetchAPI(`${STRAPI_BASE_URL}/okn-objects?${qs.stringify(query)}`)).data
                .map((x) => x.attributes?.borders?.coordinates)
                .filter(Boolean);
        }
        if (type === OknAreaType.ProtectZone) {
            return (
                await fetchAPI(`${STRAPI_BASE_URL}/okn-protect-zones?${qs.stringify(query)}`)
            ).data.map((x) => x.attributes.geometry.coordinates);
        }
        if (type === OknAreaType.SecurityZone) {
            return (
                await fetchAPI(`${STRAPI_BASE_URL}/okn-security-zones?${qs.stringify(query)}`)
            ).data.map((x) => x.attributes.geometry.coordinates);
        }
        throw new Error(`Unknown okn type: ${type}`);
    },
};
