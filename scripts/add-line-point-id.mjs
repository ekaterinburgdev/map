import { writeFileSync } from 'node:fs';
import fetch from "node-fetch";
import pointsJson from "../public/ekb-color-points.json" assert { type: "json" };

async function loadPoints(urlPart) {
    const pointsPromise = await fetch(`https://map-api.ekaterinburg.io/api/${urlPart}?populate=geometry,borders,vehicles`);
    const points = await pointsPromise.json();
    return points.data;
}

Promise.all([
    loadPoints('red-lines'),
    loadPoints('pink-lines'),
    loadPoints('blue-lines')
]).then((results) => {
    const newPointsJson = {...pointsJson};
    const allResults = results.flat();
    allResults.forEach(r => {
       const pointIndex = newPointsJson.features.findIndex((p) => {
           return p.geometry.coordinates[0] === r.attributes.geometry.coordinates[1] &&
               p.geometry.coordinates[1] === r.attributes.geometry.coordinates[0]
       });
       if (pointIndex !== -1) {
           newPointsJson.features[pointIndex].properties.id = r.id
       }
    })
    return newPointsJson
}).then((newPointsJson) => {
    writeFileSync('./public/ekb-color-points-new.json', JSON.stringify(newPointsJson, null, 2))
})