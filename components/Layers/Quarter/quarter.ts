import quarterObjects from 'public/quarter_inspectors.json';
import { QuarterObject } from './quarterObject';

export const quarter = {
    getObject(quarterTitle: string): Promise<QuarterObject> {
        return Promise.resolve(
            quarterObjects.features.find((f) => f.properties.quarterTitle === decodeURI(quarterTitle)).properties as unknown as QuarterObject,
        );
    },
};
