/* eslint-disable */
export const StrapiBaseUrl = "https://map-api.ekaterinburg.io/api";

export async function getDataJsonByUrl(url: string){
    return await fetch(url)
        .then(x => x.json());
}

export async function getObjectsTotalCount(urlWithoutParams: string){
    return (await getDataJsonByUrl(`${urlWithoutParams}?pagination[pageSize]=1`))
        .meta.pagination.total;
}