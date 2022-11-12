import { HttpMethod, FetchOptions } from 'common/types/requests';

import { getCorsWrapper } from './get-cors-wrapper';

export async function fetchInternalApi(url: string, options: FetchOptions) {
    const { method = HttpMethod.GET, dataField } = options;

    try {
        const res = await fetch(getCorsWrapper(url), {
            method,
        });

        const resJson = await res.json();

        if (resJson.error.code) {
            const e = new Error(resJson.error.msg);

            console.error(e);

            throw e;
        }

        if (!(dataField in resJson)) {
            const e = new Error(`No data field ${dataField} in API response`);

            console.error(e);

            throw e;
        }

        return resJson[dataField];
    } catch (e) {
        console.error(e);

        throw e;
    }
}
