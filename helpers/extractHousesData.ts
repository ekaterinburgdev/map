const fs = require('fs');
const path = require('path');

const FILE_NAME = 'Facade Design Code 2023 (3)';
const FILE_PATH = path.join(__dirname, '..', 'public', `${FILE_NAME}.json`);
const NEW_FILE_PATH = path.join(__dirname, '..', 'public', `${FILE_NAME}_extracted.json`);

fs.readFile(FILE_PATH, 'utf8', (err, data) => {
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

    // eslint-disable-next-line @typescript-eslint/no-shadow
    fs.writeFile(NEW_FILE_PATH, JSON.stringify(extracedData, null, 2), 'utf8', (err: any) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File created and written successfully.');
        }
    });
});
