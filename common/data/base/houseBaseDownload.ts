import { STRAPI_BASE_URL, parallelRequests } from '../dataHelpers';
import { HouseClient, HouseObject } from './houseBase';

async function houseBaseDownload() {
    const result = await parallelRequests(
        `${STRAPI_BASE_URL}/house`,
        (x: HouseObject): HouseClient => ({
            borders: x.attributes.borders?.coordinates,
            year: x.attributes.Year,
            floors: x.attributes.Floors,
            wearAndTear: x.attributes.WearAndTear,
            id: x.id,
        }),
    );

    return result;
}

export default houseBaseDownload;
