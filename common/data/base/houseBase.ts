import qs from 'qs';
import { HistogramDataWithoutValues } from 'components/UI/RangeHistogram';
import { getObjectsTotalCount, parallelRequests, STRAPI_BASE_URL } from '../dataHelpers';
import { FilterOperator } from '../filterOperator';
import { getById } from './getById';

export const houseBase = {
    async getObject(id: string): Promise<HouseObject> {
        return getById.getObject(id, '/house');
    },
    async getObjectsPolygonsByRange(
        from: number,
        to: number,
        filterName: string,
    ): Promise<HouseClient[]> {
        const url = `${STRAPI_BASE_URL}/house`;

        const query = qs.stringify({
            filters: {
                [filterName]: {
                    [FilterOperator['>=']]: from,
                    [FilterOperator['<=']]: to,
                },
            },
            populate: 'borders',
            fields: filterName,
        });

        const result = await parallelRequests(
            `${url}?${query}`,
            (x: HouseObject): HouseClient => ({
                borders: x.attributes.borders?.coordinates,
                year: x.attributes.Year,
                floors: x.attributes.Floors,
                wearAndTear: x.attributes.WearAndTear,
                id: x.id,
            }),
        );

        return result;
    },
    async getFilterValues(histogramData: HistogramDataWithoutValues, filterName: string) {
        const requests: Promise<number>[] = [];

        histogramData.forEach(({ from, to }, idx) => {
            const toFilter = idx === histogramData.length - 1 ? FilterOperator['<='] : FilterOperator['<'];

            const url = `${STRAPI_BASE_URL}/house`;

            const query = qs.stringify({
                filters: {
                    [filterName]: {
                        [FilterOperator['>=']]: from,
                        [toFilter]: to,
                    },
                },
                fields: 'Address',
            });

            requests.push(getObjectsTotalCount(`${url}?${query}`));
        });

        const result = await Promise.all(requests);

        return result;
    },
};

export interface HouseClient {
    borders: HouseAttributes['borders']['coordinates'];
    year: number;
    floors: number;
    wearAndTear: number;
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
