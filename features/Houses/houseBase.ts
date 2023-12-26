import { HistogramDataWithoutValues } from 'shared/UI/RangeHistogram';
import { HouseSourceType } from './Houses.constants';

type Meta = Record<string, number | null>;

let cache: Meta = null;
async function getHouseMeta(): Promise<Meta> {
  return fetch('https://map-backend.netlify.app/house-meta.json')
    .then((res) => res.json())
    .then((data) => ({
      years: data.years.map((item) => item.count || null),
      levels: data.levels.map((item) => item.count || null),
      health: data.health.map((item) => item.count || null),
    }));
}

export const houseBase = {
  async getFilterValues(_: HistogramDataWithoutValues, filterName: HouseSourceType) {
    const houseMeta = cache || (await getHouseMeta());
    cache = houseMeta;

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
  osmId: number | null;
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
