import { groupBy } from 'lodash';

import { fetchAPI } from '../dataHelpers';

import { DesignCodeItemType, DesignCodeObject } from './designCodeObject';

let inputData;
let objectsByType: Record<DesignCodeItemType, DesignCodeObject[]> | {} = {};
let objectsCountByType: [DesignCodeItemType, number][] = [];
const objectById = new Map<string, DesignCodeObject>();

export const DESIGN_MAP_HOST = 'https://map.ekaterinburg.design';

async function getAndSaveData() {
    inputData = await fetchAPI(`${DESIGN_MAP_HOST}/api/map`);

    objectsByType = groupBy(inputData, 'type') as Record<DesignCodeItemType, DesignCodeObject[]>;
    objectsCountByType = Object.entries(
        inputData.reduce((acc, currentObject) => {
            if (acc[currentObject.type]) {
                acc[currentObject.type] += 1;
            } else {
                acc[currentObject.type] = 1;
            }

            return acc;
        }, {}),
    ) as [DesignCodeItemType, number][];
}

export const designCode = {
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
