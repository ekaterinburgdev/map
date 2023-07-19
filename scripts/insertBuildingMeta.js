const { Pool } = require('pg');

const dbConfig = {
    user: 'baremaps',
    host: 'localhost',
    database: 'baremaps',
    password: 'baremaps',
    port: 5432,
};

async function insertBuildingMeta({ table, file, dbFieldName, jsFieldName }) {
    const collection = require(file);
    const pool = new Pool(dbConfig);
    const client = await pool.connect();

    try {
        // begin transaction
        // await client.query("BEGIN");

        let i = 0;
        for (let feature of collection.features) {
            const value = feature.properties?.[jsFieldName];

            if (value) {
                const query = `
            UPDATE ${table}
            SET tags = tags || ('{"${dbFieldName}": "${value}"}')::jsonb
            WHERE tags ? 'building' AND ST_Intersects(
                geom,
                ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
                    feature.geometry,
                )}'), 4326), 3857)
            );
          `;
                try {
                    const result = await client.query(query);
                    // console.log(i++, result.rows, value, dbFieldName);
                } catch (e) {
                    console.log('commit error: ', e.message);
                }
                // console.log(result.rows, age);
            }
        }

        // if everything is successful, commit the transaction
        // await client.query("COMMIT");
        console.log('COMMIT');
    } catch (err) {
        // if any of the queries failed, perform a rollback
        // await client.query("ROLLBACK");
        // console.log("ROLLBACK");
        console.error('error', err);
    } finally {
        // whether successful or not, release the client back to the pool
        // client.release();
        console.log('done');
    }
}

['osm_ways', 'osm_relations'].forEach((table) => {
    [
        // {
        //   dbFieldName: "building:year",
        //   jsFieldName: "r_year_int",
        //   file: "../ekb/ekb_house.json",
        // },
        // {
        //   dbFieldName: "building:health",
        //   jsFieldName: "wearAndTear",
        //   file: "../ekb/strapi/ekb-strapi.json",
        // },
        // {
        //   dbFieldName: "building:levels",
        //   jsFieldName: "floors",
        //   file: "../ekb/strapi/ekb-strapi.json",
        // },
        // {
        //   dbFieldName: "building:year",
        //   jsFieldName: "year",
        //   file: "../ekb/strapi/ekb-strapi.json",
        // },
        // {
        //   dbFieldName: "building:year",
        //   jsFieldName: "year",
        //   file: "./ekb-strapi.json",
        // },
        {
            dbFieldName: 'building:management',
            jsFieldName: 'management',
            file: './ekb-strapi.json',
        },
        {
            dbFieldName: 'building:series',
            jsFieldName: 'series',
            file: './ekb-strapi.json',
        },
        {
            dbFieldName: 'building:condition',
            jsFieldName: 'condition',
            file: './ekb-strapi.json',
        },
        // {
        //   dbFieldName: "building:emergency",
        //   jsFieldName: "emergency",
        //   file: "./ekb-strapi.json",
        // },
    ].forEach((info) => {
        insertBuildingMeta({
            table,
            ...info,
        });
    });
});
