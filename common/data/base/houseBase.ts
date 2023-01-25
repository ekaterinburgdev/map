import { fetchAPI, getObjectsTotalCount, STRAPI_BASE_URL } from '../dataHelpers';
import { getById } from './getById';

export const houseBase = {
    async getObject(id: string): Promise<HouseObject> {
        return getById.getObject(id, '/house');
    },
    async getObjectsPolygonsByRange(from: string, to: string, filterName: string) {
        const totalCount = await getObjectsTotalCount(`${STRAPI_BASE_URL}/house`);
        return (await fetchAPI(`${STRAPI_BASE_URL
        }/house?populate=borders&filters[${filterName}][$gte]=${from}&filters[${filterName}][$lte]=${to}&pagination[pageSize]=${totalCount}`))
            .data.map((x) => x.attributes.borders?.coordinates);
    },
};

export interface HouseObject {
    id: string;
    attributes: HouseAttributes
}

export interface HouseAttributes {
    Address: string;
    Management_company: string;
    Series: string;
    Condition: string;
    Floors: number;
    Year: number;
    Emergency: string;
    WearAndTear?: any;
    createdAt: Date;
    updatedAt: Date;
    CoordinatesHash: string;
    LivingRoomsCount?: number;
    RoomsCount?: number;
    LiftsCount?: number;
    EntranceCount?: number;
    MinimalFloors?: number;
}
