export const STRAPI_BASE_URL = 'https://map-api.ekaterinburg.io/api';

export async function fetchAPI(url: string) {
    const response = await fetch(url);
    return response.json();
}

export async function getObjectsTotalCount(urlWithoutParams: string) {
    return (await fetchAPI(`${urlWithoutParams}?pagination[pageSize]=1`))
        .meta.pagination.total;
}
