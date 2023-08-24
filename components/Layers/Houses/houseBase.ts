import { HistogramDataWithoutValues } from 'components/UI/RangeHistogram';
import houseMeta from '../../../public/houses-meta.json';
import { HouseSourceType } from './Houses.constants';

export const houseBase = {
    async getFilterValues(_: HistogramDataWithoutValues, filterName: HouseSourceType) {
        switch (filterName) {
            case HouseSourceType.Year:
                return Promise.resolve(houseMeta.years);
            case HouseSourceType.Floors:
                return Promise.resolve(houseMeta.levels);
            case HouseSourceType.WearAndTear:
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
