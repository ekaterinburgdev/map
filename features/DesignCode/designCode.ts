import groupBy from 'lodash/groupBy';
import dtp from 'public/ekb-design-code.json';
import { DesignCodeItemType, DesignCodeObject } from './designCodeObject';

export const DESIGN_MAP_HOST = 'https://map.ekaterinburg.design';

const designByType = Object.entries(groupBy(dtp.features, (item) => item.properties.type))
    .map(([type, items]) => [type, items.length])
    .sort((a, b) => (b[1] as number) - (a[1] as number));

export const designCode = {
    getObject(id: string): Promise<DesignCodeObject> {
        try {
            const result = dtp.features.find((item) => item.properties.id === id);

            // @ts-ignore
            return Promise.resolve({
                ...result.properties,
                street: result.properties.street,
                type: result.properties.type as DesignCodeItemType,
                coords: [result.geometry.coordinates[0], result.geometry.coordinates[1]],
            });
        } catch (error) {
            console.error(error);
            return Promise.resolve(null);
        }
    },
    async getObjectsCount() {
        return designByType;
    },
};
