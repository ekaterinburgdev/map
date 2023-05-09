import qs from 'qs';

import { fetchAPI, getObjectsTotalCount, STRAPI_BASE_URL } from '../dataHelpers';
import { LineObject, LineType } from './lineType';

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

async function getObjectsCountByLine(type: LineType) {
    const prefix = getLinePrefix(type);

    return getObjectsTotalCount(`${STRAPI_BASE_URL}/${prefix}-lines`);
}

export const lines = {
    async getFilters() {
        const blueLineCount = await getObjectsCountByLine(LineType.BlueLine);
        const redLineCount = await getObjectsCountByLine(LineType.RedLine);
        const purpleLineCount = await getObjectsCountByLine(LineType.PurpleLine);

        return [
            [LineType.BlueLine, blueLineCount],
            [LineType.RedLine, redLineCount],
            [LineType.PurpleLine, purpleLineCount],
        ];
    },

    async getLinePolylines(types: LineType[]) {
        const lineRequests = types.map((type) => {
            const prefix = getLinePrefix(type);

            const query = qs.stringify({
                populate: 'geometry',
            });

            return fetchAPI(`${STRAPI_BASE_URL}/${prefix}-line-lines?${query}`).then((response) =>
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
    },

    async getLineObjects(types: LineType[]) {
        const lineObjectsRequest = types.map(async (type) => {
            const prefix = getLinePrefix(type);
            const totalCount = (await getObjectsCountByLine(type)).count;

            const query = qs.stringify({
                populate: 'geometry',
                pagination: {
                    pageSize: totalCount,
                },
            });

            return fetchAPI(`${STRAPI_BASE_URL}/${prefix}-lines?${query}`).then((response) => ({
                type,
                data: response.data as LineObject[],
            }));
        });

        return Promise.all(lineObjectsRequest);
    },
};
