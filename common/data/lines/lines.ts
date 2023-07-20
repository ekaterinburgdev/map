import groupBy from 'lodash/groupBy';
import { getById } from 'common/data/base/getById';
import data from '../../../public/ekb-color-points.json';

const linesByType = Object.entries(groupBy(data.features, (item) => item.properties.type))
    .map(([type, items]) => [type, items.length])
    .sort((a, b) => (b[1] as number) - (a[1] as number));

export const lines = {
    async getObject(id: string): Promise<object> {
        return getById.getObject(id, '/pink-line');
    },

    async getFilters() {
        return Promise.resolve(linesByType);
    },

    async getLinePolylines() {
        return Promise.resolve([]);
    },
};
