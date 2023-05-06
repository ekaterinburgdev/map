import qs from 'qs';

export const STRAPI_BASE_URL = 'https://map-api.ekaterinburg.io/api';

const PAGINATION_SIZE = 800;
const MAX_REQUESTS = 10;

export async function fetchAPI(url: string) {
    const response = await fetch(url);
    return response.json();
}

export function getUrlWithExtraQuery(url: string, query: object) {
    const reqUrl = new URL(url);

    const newQuery = qs.stringify(
        {
            ...qs.parse(reqUrl.search, {
                ignoreQueryPrefix: true,
            }),
            ...query,
        },
        { addQueryPrefix: true },
    );

    reqUrl.search = newQuery;

    return reqUrl.toString();
}

export async function getObjectsTotalCount(url: string) {
    const reqUrl = getUrlWithExtraQuery(url, {
        pagination: {
            pageSize: 1,
        },
    });

    return (await fetchAPI(reqUrl)).meta.pagination.total;
}

export function parseJsonWithSingleQuotes(json: string): object | string {
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
        const reqUrl = getUrlWithExtraQuery(url, {
            pagination: {
                pageSize: PAGINATION_SIZE,
                page: i,
            },
        });

        requests.push(fetchAPI(reqUrl));
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
