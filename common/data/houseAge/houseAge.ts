import { houseBase, HouseObject } from '../base/houseBase';

export const houseAge = {
    async getObject(id: string): Promise<HouseObject> {
        return houseBase.getObject(id);
    },
    async getObjectsPolygonsByRange(from: number, to: number) {
        return houseBase.getObjectsPolygonsByRange(from, to, 'Year');
    },
};
