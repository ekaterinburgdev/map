import { groupBy } from 'lodash';

import { fetchAPI } from '../dataHelpers';

import { DesignCodeItemType, DesignCodeObject } from './designCodeObject';

let filtersNames;
let inputData;
let objectsByType: Record<DesignCodeItemType, DesignCodeObject[]> | {} = {};
let objectsCountByType: Record<DesignCodeItemType, number> | {} = {};
const objectById = new Map<string, DesignCodeObject>();

export const DESIGN_MAP_HOST = 'https://map.ekaterinburg.design';

async function getAndSaveData() {
    inputData = await fetchAPI(`${DESIGN_MAP_HOST}/api/map`);

    objectsByType = groupBy(inputData, 'type') as Record<DesignCodeItemType, DesignCodeObject[]>;
    objectsCountByType = Object.entries(objectsByType).reduce((acc, [type, objects]) => {
        acc[type] = objects.length;

        return acc;
    }, {});
}

export const designCode = {
    async getFilters(): Promise<DesignCodeItemType[]> {
        if (filtersNames) return filtersNames;

        if (!inputData) await getAndSaveData();

        const set = new Set<DesignCodeItemType>();

        inputData.forEach((e: DesignCodeObject) => {
            if (!e.type) {
                return;
            }

            set.add(e.type);
        });

        filtersNames = Array.from(set);
        return filtersNames;
    },

    async getObjectsCount() {
        if (!inputData) {
            await getAndSaveData();
        }

        return objectsCountByType;
    },

    async getObjectsByType(types: DesignCodeItemType[]): Promise<DesignCodeObject[]> {
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

        objectById[id] = inputData.find((e: DesignCodeObject) => e.id === id);

        return objectById[id] || null;
    },
};
