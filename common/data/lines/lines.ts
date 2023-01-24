import { fetchAPI, STRAPI_BASE_URL } from '../dataHelpers';
import { LineType } from './lineType';


function getLinePrefix(type: LineType) {
    let prefix;
    if (type === LineType.RedLine) {
        prefix = 'red';
    } else if (type === LineType.BlueLine) {
        prefix = 'blue';
    } else if (type === LineType.PurpleLine) {
        prefix = 'pink';
    } else {
        throw new Error(`Unknown line type: ${type}`);
    }
    return prefix;
}

async function getObjectsCountByLine(type: LineType) {
    const prefix = getLinePrefix(type);
    return { line: prefix, count: (await fetchAPI(`${STRAPI_BASE_URL}/${prefix}-lines?&pagination[pageSize]=1`)).meta.pagination.total };
}

export const lines = {
    async getFilters() {
        return [
            await getObjectsCountByLine(LineType.BlueLine),
            await getObjectsCountByLine(LineType.RedLine),
            await getObjectsCountByLine(LineType.PurpleLine),
        ];
    },

    async getLinePolylines(type: LineType) {
        const prefix = getLinePrefix(type);
        if (type === LineType.RedLine || LineType.BlueLine) {
            return [(await fetchAPI(`${STRAPI_BASE_URL}/${prefix}-line-lines?populate=geometry`))
                .data[0].attributes.geometry.coordinates];
        } if (type === LineType.PurpleLine) {
            return (await fetchAPI(`${STRAPI_BASE_URL}/${prefix}-line-lines?populate=geometry`))
                .data.map((x) => x.attributes.geometry[0].coordinates);
        }
        throw new Error(`Unknown line type: ${type}`);
    },

    async getLineObjects(type: LineType) {
        const prefix = getLinePrefix(type);
        const totalCount = (await getObjectsCountByLine(type)).count;
        return (await fetchAPI(`${STRAPI_BASE_URL}/${prefix}-lines?populate=geometry&pagination[pageSize]=${totalCount}`)).data;
    },
};
