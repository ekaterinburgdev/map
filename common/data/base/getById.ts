import { fetchAPI, STRAPI_BASE_URL } from '../dataHelpers';

export const getById = {
    async getObject(id: string, tableRelativeUrl: string) {
        return (
            await fetchAPI(
                `${STRAPI_BASE_URL}${tableRelativeUrl}/${id}?populate=geometry,borders,vehicles`,
            )
        ).data;
    },
};
