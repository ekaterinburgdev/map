/* eslint-disable no-restricted-syntax,no-continue */
import { groupBy } from 'lodash';

import { fetchAPI } from '../dataHelpers';
import { DesignCodeObject } from './designCodeObject';

let filtersNames;
let inputData;
let objectsByType: Record<string, DesignCodeObject[]> = {};
const objectById = new Map<string, DesignCodeObject>();

export const DESIGN_MAP_HOST = 'https://map.ekaterinburg.design';

async function getAndSaveData() {
    inputData = await fetchAPI(`${DESIGN_MAP_HOST}/api/map`);

    objectsByType = groupBy(inputData, 'type');
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

    async getObjectsByType(types: string[]): Promise<DesignCodeObject[]> {
        if (!inputData) {
            await getAndSaveData();
        }

        return types.reduce((acc, type) => {
            if (objectsByType[type]) {
                acc.push(...objectsByType[type]);
            }

            return acc;
        }, []);
    },

    async getObject(id: string): Promise<DesignCodeObject> {
        if (objectById[id]) {
            return objectById[id];
        }

        if (!inputData) {
            await getAndSaveData();
        }

        for (const e of inputData) {
            if (e.id !== id) {
                continue;
            }

            objectById[id] = e;
            return e;
        }

        return null;
    },
};
