import qs from 'qs';
import {
    fetchAPI,
    getObjectsTotalCount,
    parallelRequests,
    parseJsonWithSingleQuotes,
    STRAPI_BASE_URL,
} from '../dataHelpers';
import { getById } from '../base/getById';
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
                    [FilterOperator['=']]: types,
                },
            },
            fields: ['category'],
            populate: 'geometry',
        });

        const result = await parallelRequests(
            `${url}?${query}`,
            (object: OknObjectWithGeometry) => object,
        );

        return result.filter((object) => Boolean(object.attributes.geometry?.coordinates?.length));
    },

    async getAreaByType(type: OknAreaType): Promise<OknObjectWithGeometry[] | undefined> {
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
                .filter((x) => Boolean(x?.attributes?.borders?.coordinates?.length))
                .map((x) => ({
                    id: x.id,
                    attributes: {
                        geometry: {
                            coordinates: x.attributes.borders.coordinates,
                        },
                    },
                }));
        }
        if (type === OknAreaType.ProtectZone) {
            return (
                await fetchAPI(`${STRAPI_BASE_URL}/okn-protect-zones?${qs.stringify(query)}`)
            ).data.filter((x) => Boolean(x?.attributes?.geometry?.coordinates?.length));
        }
        if (type === OknAreaType.SecurityZone) {
            return (
                await fetchAPI(`${STRAPI_BASE_URL}/okn-security-zones?${qs.stringify(query)}`)
            ).data.filter((x) => Boolean(x?.attributes?.geometry?.coordinates?.length));
        }
        throw new Error(`Unknown okn type: ${type}`);
    },
};
