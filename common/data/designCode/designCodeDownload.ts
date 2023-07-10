import { groupBy } from 'lodash';
import { fetchAPI } from '../dataHelpers';
import { DesignCodeItemType, DesignCodeObject } from './designCodeObject';

export const DESIGN_MAP_HOST = 'https://map.ekaterinburg.design';

async function designCodeDownload() {
    const inputData = await fetchAPI(`${DESIGN_MAP_HOST}/api/map`);
    return groupBy(inputData, 'type') as Record<DesignCodeItemType, DesignCodeObject[]>;
}

export default designCodeDownload;
