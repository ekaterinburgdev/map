import fs from 'fs';
import path from 'path';

const SOURCE_FILE = path.join(__dirname, '..', 'public', `Facade Design Code 2023 (3).json`);
const RESULT_FILE = path.join(__dirname, '..', 'public', `ekb-facades.json`);

fs.readFile(SOURCE_FILE, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  const extracedData = {};

  for (let i = 0; i < jsonData.length; i++) {
    const elem = jsonData[i].properties;

    extracedData[elem.osm_id] = {
      name: elem.name,
      link: elem.link,
    };
  }

  fs.writeFile(RESULT_FILE, JSON.stringify(extracedData, null, 2), 'utf8', (err: any) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File created and written successfully.');
    }
  });
});
