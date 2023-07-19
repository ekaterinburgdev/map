const turf = require("@turf/turf");
const fetch = require("node-fetch");
const fs = require("fs");

// strapi api
const houseAge = require("../ekb/strapi/ekb-house-age.json");
const houseHealth = require("../ekb/strapi/ekb-house-health.json");
const houseLevels = require("../ekb/strapi/ekb-house-levels.json");

// const api =
//   "https://map-api.ekaterinburg.io/api/house?populate=geometry,borders&pagination[pageSize]=10";

const prepareDate = (data) =>
  data
    .filter((house) => house.borders)
    .reduce((all, house) => {
      all[house.id] = {
        ...house,
        borders: house.borders.map((item) => [item[1], item[0]]),
      };
      return all;
    }, {});

const age = prepareDate(houseAge);
const health = prepareDate(houseHealth);
const levels = prepareDate(houseLevels);

const uniqIds = Array.from(
  new Set([houseAge, houseHealth, houseLevels].flat().map((house) => house.id))
);

const strapiData = {
  type: "FeatureCollection",
  features: uniqIds
    .filter(
      (id) => age[id]?.borders || health[id]?.borders || levels[id]?.borders
    )
    .map((id) => {
      const borders =
        age[id]?.borders || health[id]?.borders || levels[id]?.borders;

      return {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [borders],
        },
        properties: {
          id: id,
          year: age[id]?.year,
          wearAndTear: health[id]?.wearAndTear,
          floors: levels[id]?.floors,
        },
      };
    }),
};

fs.writeFileSync("ekb-strapi.json", JSON.stringify(strapiData), "utf-8");
