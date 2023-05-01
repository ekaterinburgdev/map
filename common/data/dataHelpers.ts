export const STRAPI_BASE_URL = 'https://map-api.ekaterinburg.io/api';

const PAGINATION_SIZE = 800;
const MAX_REQUESTS = 10;

export async function fetchAPI(url: string) {
    const response = await fetch(url);
    return response.json();
}

export async function getObjectsTotalCount(url: string) {
    const reqUrl = new URL(url);

    reqUrl.searchParams.append('pagination[pageSize]', '1');

    return (await fetchAPI(reqUrl.toString())).meta.pagination.total;
}

export function parseJsonWithSingleQuotes(json: string) {
    if (!json) {
        return json;
    }

    return JSON.parse(json.replaceAll("'", '"'));
}

export async function parallelRequests<T, R>(url: string, dataMapper: (x: T) => R) {
    const totalCount = await getObjectsTotalCount(url);

    const pagesCount = Math.ceil(totalCount / PAGINATION_SIZE);

    const requests: Promise<{ data: T[] }>[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        const reqUrl = new URL(url);

        reqUrl.searchParams.append('pagination[pageSize]', PAGINATION_SIZE.toString());
        reqUrl.searchParams.append('pagination[page]', i.toString());

        requests.push(fetchAPI(reqUrl.toString()));
    }

    return new Promise<R[]>((resolve) => {
        const result: R[] = [];

        let currentRequest = 0;
        let activeRequests = 0;

        async function processRequestResult(resultPart: { data: T[] }) {
            const processedResult = resultPart.data.map(dataMapper);

            result.push(...processedResult);

            activeRequests--;

            if (currentRequest >= pagesCount && !activeRequests) {
                resolve(result);

                return;
            }

            if (currentRequest >= pagesCount) {
                return;
            }

            activeRequests++;
            const data = await requests[currentRequest++];
            processRequestResult(data);
        }

        for (let i = 0; i < Math.min(MAX_REQUESTS, pagesCount); i++) {
            activeRequests++;

            requests[i].then(processRequestResult);

            currentRequest++;
        }
    });
}
