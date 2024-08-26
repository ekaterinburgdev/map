/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

let data = require('./public/ekb-street-art.json');

data = data.features.map((elem, index) => ({
    ...elem,
    properties: {
        ...elem.properties,
        preview: `/street-art-static/images/s_${index}.jpg`,
    },
}));

// Write the updated JSON to a new file
const outputFilePath = './new_file.json';
fs.writeFile(outputFilePath, JSON.stringify(data), 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File successfully written to', outputFilePath);
    }
});
