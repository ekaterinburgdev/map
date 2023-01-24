import { fetchAPI, STRAPI_BASE_URL } from '../dataHelpers';

export const canGetById = {
    async getObject(id: string, tableRelativeUrl: string) {
        return (await fetchAPI(`${STRAPI_BASE_URL}${tableRelativeUrl}/${id}`)).data;
    },
};
