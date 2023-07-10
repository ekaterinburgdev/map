import { STRAPI_BASE_URL, parallelRequests } from '../dataHelpers';
import { DTPObject } from './dtp';

async function dtpDownload() {
    const url = `${STRAPI_BASE_URL}/dtps`;
    const result = await parallelRequests(url, (x: DTPObject) => x);
    return result;
}

export default dtpDownload;
