/* eslint-disable no-restricted-syntax,no-continue */
import { fetchAPI } from '../dataHelpers';
import { DesignCodeObject } from './designCodeObject';

let filtersNames;
let inputData;
const objectsIdsByType = new Map<string, string[]>();
const objectById = new Map<string, DesignCodeObject>();

async function getAndSaveData() {
    inputData = await fetchAPI('https://map.ekaterinburg.design/api/map');
}

export const designCode = {
    async getFilters(): Promise<string[]> {
        if (filtersNames) return filtersNames;

        if (!inputData) await getAndSaveData();

        const set = new Set<string>();

        for (const e of inputData) {
            if (!e.type) continue;
            set.add(e.type);
        }
        filtersNames = Array.from(set);
        return filtersNames;
    },

    async getObjectsIds(type: string): Promise<string[]> {
        if (objectsIdsByType[type]) return objectsIdsByType[type];

        if (!inputData) await getAndSaveData();

        const resultIds = [];
        for (const e of inputData) {
            if (e.type === type) resultIds.push(e.id);
        }

        objectsIdsByType[type] = resultIds;
        return resultIds;
    },

    // eslint-disable-next-line consistent-return
    async getObject(id: string): Promise<DesignCodeObject> {
        if (objectById[id]) return objectById[id];

        if (!inputData) await getAndSaveData();

        for (const e of inputData) {
            if (e.id !== id) continue;
            objectById[id] = e;
            return e;
        }
    },
};
