import { houseBase } from 'common/data/base/houseBase';

export const houseWearTear = {
    async getObjectsPolygonsByRange(from: number, to: number) {
        return houseBase.getObjectsPolygonsByRange(from, to, 'WearAndTear');
    },
};
