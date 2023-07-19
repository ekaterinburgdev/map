import { getById } from '../base/getById';
import { parseJsonWithSingleQuotes } from '../dataHelpers';
import oknMeta from '../../../public/okn-meta.json';
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
        return Promise.resolve(oknMeta.points);
    },

    async getZonesCount() {
        return Promise.resolve(oknMeta.zones);
    },
};
