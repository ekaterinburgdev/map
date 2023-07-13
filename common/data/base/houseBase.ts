import { HistogramDataWithoutValues } from 'components/UI/RangeHistogram';
import { getById } from './getById';

export const houseBase = {
    async getObject(id: string): Promise<HouseObject> {
        return getById.getObject(id, '/house');
    },
    async getFilterValues(_: HistogramDataWithoutValues, filterName: string) {
        switch (filterName) {
            case 'Year':
                return Promise.resolve([0, 8, 67, 195, 982, 4790, 935, 811]);
            case 'Floors':
                return Promise.resolve([1815, 994, 2400, 1384, 440, 569, 61, 184, 17]);
            case 'WearAndTear':
                return Promise.resolve([850, 1191, 1467, 1087, 767, 409, 291, 67, 4, 7]);
            default:
                return Promise.resolve([]);
        }
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
    borders?: {
        coordinates: [number, number][];
    };
}
