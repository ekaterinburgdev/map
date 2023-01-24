import { houseBase, HouseObject } from '../base/houseBase';

export const houseAge = {
    async getObject(id: string): Promise<HouseObject> {
        return houseBase.getObject(id);
    },
    houseAges: () => ['1723', '1807', '1905', '1920', '1940', '1960', '1980', '1990', '2000', '2022'],
    async getObjectsPolygonsByRange(from: string, to: string) {
        return houseBase.getObjectsPolygonsByRange(from, to, 'Year');
    },
};
