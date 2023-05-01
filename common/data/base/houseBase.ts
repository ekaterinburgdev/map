import { HistogramDataWithoutValues } from 'components/UI/RangeHistogram';
import { getObjectsTotalCount, parallelRequests, STRAPI_BASE_URL } from '../dataHelpers';
import { getById } from './getById';

export const houseBase = {
    async getObject(id: string): Promise<HouseObject> {
        return getById.getObject(id, '/house');
    },
    async getObjectsPolygonsByRange(from: number, to: number, filterName: string) {
        const fullUrl = new URL(`${STRAPI_BASE_URL}/house?populate=borders`);

        fullUrl.searchParams.append(`filters[${filterName}][$gte]`, from.toString());
        fullUrl.searchParams.append(`filters[${filterName}][$lte]`, to.toString());

        const result = await parallelRequests(fullUrl.toString(), (x: HouseObject) => ({
            borders: x.attributes.borders?.coordinates,
            year: x.attributes.Year,
            id: x.id,
        }));

        return result;
    },
    async getFilterValues(histogramData: HistogramDataWithoutValues, filterName: string) {
        const requests: Promise<number>[] = [];

        histogramData.forEach(({ from, to }, idx) => {
            const toFilter = idx === histogramData.length - 1 ? 'lte' : 'lt';

            const fullUrl = new URL(`${STRAPI_BASE_URL}/house`);

            fullUrl.searchParams.append(`filters[${filterName}][$gte]`, from.toString());
            fullUrl.searchParams.append(`filters[${filterName}][$${toFilter}]`, to.toString());

            requests.push(getObjectsTotalCount(fullUrl.toString()));
        });

        const result = await Promise.all(requests);

        return result;
    },
};

export interface HouseClient {
    borders: HouseAttributes['borders']['coordinates'];
    year: number;
    id: string;
}

export interface HouseObject {
    id: string;
    attributes: HouseAttributes;
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
    borders?: {
        coordinates: [number, number][];
    };
}
