const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, '../../public', `ekb-design-code.json`);
const RESULT_FILE = path.join(__dirname, '../../public', `ekb-design-code.json`);

fs.readFile(SOURCE_FILE, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const features = JSON.parse(data);

    const geojson = {
        type: 'FeatureCollection',
        name: 'design-code',
        features: features.map(({ coords, ...item }) => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [coords[1], coords[0]],
            },
            properties: {
                ...item,
                preview: item.preview.s.src,
            },
        })),
    };

    fs.writeFile(RESULT_FILE, JSON.stringify(geojson), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File created and written successfully.');
        }
    });
});
