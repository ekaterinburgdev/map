import { STRAPI_BASE_URL, parallelRequests } from '../dataHelpers';
import { OknObjectWithGeometry } from './oknObject';

async function oknDownload(): Promise<OknObjectWithGeometry[]> {
    const url = `${STRAPI_BASE_URL}/okn-objects?populate=geometry,data,borders`;
    return parallelRequests(
        url,
        (object: OknObjectWithGeometry) => object,
    );
}

export default oknDownload;
