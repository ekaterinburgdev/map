import { HistogramDataWithoutValues } from 'components/UI/RangeHistogram';
import houseMeta from '../../../public/houses-meta.json';
import { getById } from './getById';

export const houseBase = {
    async getObject(id: string): Promise<HouseObject> {
        return getById.getObject(id, '/house');
    },
    async getFilterValues(_: HistogramDataWithoutValues, filterName: string) {
        switch (filterName) {
            case 'Year':
                return Promise.resolve(houseMeta.years);
            case 'Floors':
                return Promise.resolve(houseMeta.floors);
            case 'WearAndTear':
                return Promise.resolve(houseMeta.health);
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
