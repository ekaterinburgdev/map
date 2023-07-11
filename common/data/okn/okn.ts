import { getById } from '../base/getById';
import { parseJsonWithSingleQuotes } from '../dataHelpers';
import { OknObject } from './oknObject';

export const okn = {
    async getObject(id: string): Promise<OknObject> {
        return getById.getObject(id, '/okn-objects').then((x) => {
            x.attributes.img = parseJsonWithSingleQuotes(x.attributes?.img);
            x.attributes.document = parseJsonWithSingleQuotes(x.attributes?.document);
            return x;
        });
    },

    async getObjectsCount() {
        return Promise.resolve([
            ['Федерального значения', 82],
            ['Регионального значения', 667],
            ['Местного (муниципального) значения', 11],
        ]);
    },

    async getZonesCount() {
        return Promise.resolve([
            ['Границы территорий ОКН', 760],
            ['Защитные зоны', 211],
            ['Зоны охраны ОКН', 681],
        ]);
    },
};
