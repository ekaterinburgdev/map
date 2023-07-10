import { STRAPI_BASE_URL, fetchAPI } from '../dataHelpers';
import { LineType } from './lineType';

function getLinePrefix(type: LineType) {
    switch (type) {
        case LineType.RedLine:
            return 'red';
        case LineType.BlueLine:
            return 'blue';
        case LineType.PurpleLine:
            return 'pink';
        default:
            throw new Error(`Unknown line type: ${type}`);
    }
}

async function getLinePolylines(types: LineType[]) {
    const lineRequests = types.map((type) => {
        const prefix = getLinePrefix(type);

        return fetchAPI(`${STRAPI_BASE_URL}/${prefix}-line-lines`).then((response) =>
            response.data.map((e) => {
                const geometry = Array.isArray(e.attributes.geometry)
                    ? e.attributes.geometry[0]
                    : e.attributes.geometry;

                return {
                    type,
                    id: e.id,
                    coords: geometry.coordinates,
                };
            }));
    });

    return Promise.all(lineRequests);
}

export default getLinePolylines;
