import { houseBase, HouseObject } from '../base/houseBase';

export const houseFloor = {
    async getObject(id: string): Promise<HouseObject> {
        return houseBase.getObject(id);
    },
    houseFloors: () => ['1', '3', '5', '9', '12', '16', '21', '25', '31', '52'],

    async getObjectsPolygonsByRange(from: string, to: string) {
        return houseBase.getObjectsPolygonsByRange(from, to, 'Floor');
    },
};
