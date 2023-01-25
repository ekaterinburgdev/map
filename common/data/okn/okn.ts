/* eslint-disable class-methods-use-this */
import { fetchAPI, getObjectsTotalCount, STRAPI_BASE_URL } from '../dataHelpers';
import { canGetById } from '../base/canGetById';
import { Area } from '../base/objectsBase';
import { OknAreaType, OknObjectSignificanceType } from './oknConstants';
import { OknObject, OknObjectWithGeometry } from './oknObject';

export const okn = {
    async getObject(id: string): Promise<OknObject> {
        return canGetById.getObject(id, '/okn-objects')
            .then((x) => {
                // eslint-disable-next-line no-param-reassign
                x.attributes.img = JSON.parse(x.attributes?.img.replaceAll("'", '"'));
                return x;
            });
    },

    // eslint-disable-next-line max-len
    async getObjectsBySignificanceType(type: OknObjectSignificanceType): Promise<OknObjectWithGeometry[]> {
        const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/okn-objects`);
        return (await fetchAPI(`${STRAPI_BASE_URL
        }/okn-objects?filter[category][$eq]=${type}&populate=data,geometry&pagination[pageSize]=${totalCount}`)).data;
    },

    async getAreaByType(type: OknAreaType): Promise<Area | undefined> {
        const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/okn-objects`);
        if (type === OknAreaType.ObjectZone) {
            return (await fetchAPI(`${STRAPI_BASE_URL
            }/okn-objects?populate=geometry,data,borders&pagination[pageSize]=${totalCount}`))
                .data.map((x) => x.attributes?.borders?.coordinates);
        } if (type === OknAreaType.ProtectZone) {
            return (await fetchAPI(`${STRAPI_BASE_URL
            }/okn-protect-zones?populate=geometry,data&pagination[pageSize]=${totalCount}`))
                .data.map((x) => x.attributes.geometry.coordinates);
        } if (type === OknAreaType.SecurityZone) {
            return (await fetchAPI(`${STRAPI_BASE_URL
            }/okn-security-zones?populate=geometry,data&pagination[pageSize]=${totalCount}`))
                .data.map((x) => x.attributes.geometry.coordinates);
        }
        throw new Error(`Unknown okn type: ${type}`);
    },
};
