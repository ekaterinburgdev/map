import { writeFile } from 'fs/promises';
import houseBaseDownload from '../common/data/base/houseBaseDownload';
import designCodeDownload from '../common/data/designCode/designCodeDownload';
import dtpDownload from '../common/data/dtp/dtpDownload';
import oknDownload from '../common/data/okn/oknDownload';

async function saveJSON(downloaderFn, filename) {
    const data = await downloaderFn();
    return writeFile(filename, JSON.stringify(data));
}

Promise.all([
    saveJSON(houseBaseDownload, './public/map-objects/house-base.json'),
    saveJSON(designCodeDownload, './public/map-objects/design-code.json'),
    saveJSON(dtpDownload, './public/map-objects/dtp.json'),
    saveJSON(oknDownload, './public/map-objects/okn.json'),
]).then(() => {
    // eslint-disable-next-line no-console
    console.log('All JSON data downloaded');
});
