import quarterObjects from 'public/quarter_inspectors.json';
import { QuarterObject } from './quarterObject';

export const quarter = {
    getObject(quarterId: string): Promise<QuarterObject> {
        return Promise.resolve(
            quarterObjects.features.find((f) => f.properties.id === quarterId).properties as unknown as QuarterObject,
        );
    },
};
