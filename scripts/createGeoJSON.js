const fs = require('fs');
const objects = require('./dtps.json');
const geoObjects = require('../public/ekb-dtp.json');

const collection = {
    type: 'FeatureCollection',
    name: 'ekb-dtps',
    features: geoObjects.features.map((feature) => {
        const dtp = objects.data.find((o) => o.id === feature.properties.id).attributes;

        delete dtp.createdAt;
        delete dtp.updatedAt;
        delete dtp.geometry;

        return {
            ...feature,
            properties: {
                ...feature.properties,
                ...dtp,
            },
        };
    }),
};

fs.writeFileSync('ekb-dtps.json', JSON.stringify(collection));

// const fs = require("fs");
// const objects = require("./okn-objects.json");

// // function parseJsonWithSingleQuotes(json) {
// //   if (!json) {
// //       return json;
// //   }

// //   try {
// //     return JSON.parse(json.replaceAll("'", '"'));
// //   } catch (e) {
// //     console.log(e.message, json);
// //     return null
// //   }
// // }

// const geoObjects = {
//   type: "FeatureCollection",
//   name: "objects-okn-zones",
//   features: objects.data
//     .map((feature) => ({
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [
//           feature.attributes.geometry.coordinates[1],
//           feature.attributes.geometry.coordinates[0]
//         ],
//       },
//       properties: {
//         id: feature.id,
//         name: feature.attributes.name,
//         address: feature.attributes.address,
//         okn_number: feature.attributes.okn_number,
//         date: feature.attributes.date,
//         type: feature.attributes.type,
//         category: feature.attributes.category,
//         img: feature.attributes.img,
//         document: feature.attributes.document,
//         isExist: feature.attributes.isExist,
//         comment: feature.attributes.comment,
//       },
//     })),
// };

// fs.writeFileSync("ekb-okn-objects.json", JSON.stringify(geoObjects));

// const fs = require("fs");
// const features = require("../ekb/strapi/ekb-okn.json");

// const geojson = {
//   type: "FeatureCollection",
//   name: "okn",
//   features: features.map((feature) => ({
//     type: "Feature",
//     geometry: {
//       ...feature.attributes.geometry,
//       coordinates: [
//         feature.attributes.geometry.coordinates[1],
//         feature.attributes.geometry.coordinates[0],
//       ],
//     },
//     properties: {
//       name: feature.attributes.name,
//       id: feature.id,
//       category: feature.attributes.category,
//     },
//   })),
// };

// fs.writeFileSync("ekb-okn.geojson", JSON.stringify(geojson));

// --------------------------------------------------

// const fs = require("fs");
// const features = require("../ekb/strapi/dtps.json");

// const geojson = {
//   type: "FeatureCollection",
//   name: "dtp",
//   features: features.data.map((feature) => ({
//     type: "Feature",
//     geometry: {
//       ...feature.attributes.geometry,
//       coordinates: [
//         feature.attributes.geometry.coordinates[1],
//         feature.attributes.geometry.coordinates[0],
//       ],
//     },
//     properties: {
//       severity: feature.attributes.severity,
//       id: feature.id,
//       participant_categories: feature.attributes.participant_categories,
//       year: new Date(feature.attributes.datetime).getFullYear(),
//     },
//   })),
// };

// fs.writeFileSync("ekb-dtp.json", JSON.stringify(geojson));

// --------------------------------------------------

// const fs = require("fs");
// const features = require("../ekb/strapi/ekb-lines.json");

// const lines = features.lines.map((line) => ({
//   type: "Feature",
//   geometry: {
//     type: "LineString",
//     coordinates: line.coords.map((coord) => [coord[1], coord[0]]),
//   },
//   properties: {
//     type: line.type,
//   },
// }));

// const points = features.points
//   .map((category) =>
//     category.data.map((point) => ({
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [
//           point.attributes.geometry.coordinates[1],
//           point.attributes.geometry.coordinates[0],
//         ],
//       },
//       properties: {
//         type: category.type,
//       },
//     }))
//   )
//   .flat(2);

// const geoLines = {
//   type: "FeatureCollection",
//   name: "lines",
//   features: lines,
// };

// const geoPoints = {
//   type: "FeatureCollection",
//   name: "points",
//   features: points,
// };

// fs.writeFileSync("ekb-color-lines.geojson", JSON.stringify(geoLines));
// fs.writeFileSync("ekb-color-points.geojson", JSON.stringify(geoPoints));

// --------------------------------------------------

// const fs = require('fs');
// const geojson = require('./test-ekb-design-code.json');

// fs.writeFileSync(
//     '../public/ekb-design-code.json',
//     JSON.stringify({
//         ...geojson,
//         features: geojson.features.map((feature) => ({
//             ...feature,
//             properties: {
//                 ...feature.properties,
//                 images: feature.properties.images.map((image) => ({
//                     m: image.m,
//                 })),
//                 preview: feature.properties.preview.s.src,
//             },
//         })),
//     }),
// );

// const geojson = {
//     type: 'FeatureCollection',
//     name: 'design-code',
//     features: features.map(({ coords, ...properties }) => ({
//         type: 'Feature',
//         geometry: {
//             type: 'Point',
//             coordinates: [coords[1], coords[0]],
//         },
//         properties,
//     })),
// };

// fs.writeFileSync('../public/ekb-design-code.json', JSON.stringify(geojson));

// --------------------------------------------------

// const fs = require("fs");
// const objects = require("./ekb-objects-zones.json");
// // const protect = require("./ekb-protect-zones.json");
// // const security = require("./ekb-security-zones.json");

// const geoObjects = {
//   type: "FeatureCollection",
//   name: "objects-okn-zones",
//   features: objects
//     .filter((o) => o.attributes.borders)
//     .map((feature) => ({
//       type: "Feature",
//       geometry: {
//         type: "Polygon",
//         coordinates: [
//           feature.attributes.borders.coordinates.map((item) => [
//             item[1],
//             item[0],
//           ]),
//         ],
//       },
//       properties: {
//         name: feature.attributes.name,
//       },
//     })),
// };

// // const geoProtect = {
// //   type: "FeatureCollection",
// //   name: "protect-okn-zones",
// //   features: protect.map((feature) => ({
// //     type: "Feature",
// //     geometry: {
// //       type: "Polygon",
// //       coordinates: [
// //         feature.attributes.geometry.coordinates.map((item) => [
// //           item[1],
// //           item[0],
// //         ]),
// //       ],
// //     },
// //     properties: {
// //       name: feature.attributes.name,
// //     },
// //   })),
// // };

// // const geoSecurity = {
// //   type: "FeatureCollection",
// //   name: "security-okn-zones",
// //   features: security.map((feature) => ({
// //     type: "Feature",
// //     geometry: {
// //       type: "Polygon",
// //       coordinates: [
// //         feature.attributes.geometry.coordinates.map((item) => [
// //           item[1],
// //           item[0],
// //         ]),
// //       ],
// //     },
// //     properties: {
// //       name: feature.attributes.name,
// //     },
// //   })),
// // };

// fs.writeFileSync("ekb-okn-objects.json", JSON.stringify(geoObjects));
// // fs.writeFileSync("ekb-okn-protect.json", JSON.stringify(geoProtect));
// // fs.writeFileSync("ekb-okn-security.json", JSON.stringify(geoSecurity));
