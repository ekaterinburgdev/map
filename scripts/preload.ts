import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import houseBaseDownload from '../common/data/base/houseBaseDownload';
import designCodeDownload from '../common/data/designCode/designCodeDownload';
import dtpDownload from '../common/data/dtp/dtpDownload';
import oknDownload from '../common/data/okn/oknDownload';

const ROOT = './public/map-objects/';

async function saveJSON(downloaderFn, filename) {
    const data = await downloaderFn();
    return writeFile(`${ROOT}${filename}`, JSON.stringify(data));
}

if (!existsSync(ROOT)) {
    mkdirSync(ROOT);
}

Promise.all([
    saveJSON(houseBaseDownload, 'house-base.json'),
    saveJSON(designCodeDownload, 'design-code.json'),
    saveJSON(dtpDownload, 'dtp.json'),
    saveJSON(oknDownload, 'okn.json'),
]).then(() => {
    // eslint-disable-next-line no-console
    console.log('All JSON data downloaded');
});
