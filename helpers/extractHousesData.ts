const fs = require('fs');

// Specify the path to your JSON file
const FILE_PATH = 'D:/Documents/map/public/Facade Design Code 2023 (3).json';
const NEW_FILE_PATH = 'D:/Documents/map/public/Facade Design Code 2023 (3)_extracted.json';

// Read the file asynchronously
fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Now you can work with the parsed JSON data
    console.log(jsonData.length);

    const extracedData = {};

    for (let i = 0; i < jsonData.length; i++) {
        const elem = jsonData[i].properties;
        // console.log(i + 1);
        // console.log(elem.name);

        extracedData[elem.osm_id] = {
            name: elem.name,
            link: elem.link,
        };
    }
    console.log(extracedData);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    fs.writeFile(NEW_FILE_PATH, JSON.stringify(extracedData, null, 2), 'utf8', (err: any) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File created and written successfully.');
        }
    });
});
