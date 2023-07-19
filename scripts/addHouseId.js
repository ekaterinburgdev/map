const fs = require('fs');
const { Pool } = require('pg');

const dbConfig = {
    user: 'baremaps',
    host: 'localhost',
    database: 'baremaps',
    password: 'baremaps',
    port: 5432,
};

async function addHouseId({ dbName }) {
    const pool = new Pool(dbConfig);
    const client = await pool.connect();

    // const query = `
    // UPDATE ${dbName}
    // SET tags = jsonb_set(tags, '{id}', to_jsonb(id)::jsonb, true);
    // `;

    const query = `
        SELECT *
        FROM ${dbName}
        WHERE NOT tags ? 'id';
    `;
    try {
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch (e) {
        console.log(' error: ', e.message);
    }
}

addHouseId({ dbName: 'osm_ways' });
