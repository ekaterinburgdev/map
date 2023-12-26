import oknMeta from 'public/okn-meta.json';
import oknObjects from 'public/ekb-okn.json';
import { OknObject } from './oknObject';

export const okn = {
  getObject(id: string): Promise<OknObject> {
    return Promise.resolve(
      oknObjects.features.find((f) => String(f.properties.id) === id) as unknown as OknObject,
    );
  },

  async getObjectsCount() {
    return Promise.resolve(oknMeta.points);
  },

  async getZonesCount() {
    return Promise.resolve(oknMeta.zones);
  },
};
