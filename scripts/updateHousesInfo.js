const { Pool } = require('pg');

const updateBuildings = [
    {
        'addr:street': 'Комсомольская',
        'addr:housenumber': '70',
        coords: '60.659881, 56.837991',
        'building:year': 2017,
        'building:levels': 16,
    },
    {
        'addr:street': 'Куйбышева',
        'addr:housenumber': '2',
        coords: '60.588572, 56.825089',
        'building:year': 1995,
    },
    {
        'addr:street': 'улица 8 марта',
        'addr:housenumber': '2',
        coords: '60.597575, 56.839836',
        'building:year': 1932,
    },
    {
        'addr:street': 'Серова',
        'addr:housenumber': '38',
        coords: '60.598596, 56.805450',
        'building:year': 1995,
    },
    {
        'addr:street': 'улица Щорса',
        'addr:housenumber': '7',
        coords: '60.632602, 56.810627',
        'building:year': 1965,
        'building:levels': 3,
    },
    {
        'addr:street': 'Малышева',
        'addr:housenumber': '42А',
        coords: '60.599127, 56.833506',
        'building:year': 2017,
    },
    {
        'addr:street': 'улица Щорса',
        'addr:housenumber': '53',
        coords: '60.615646, 56.80771',
        'building:year': 2018,
        'building:levels': 19,
    },
    {
        'addr:street': 'улица 8 Марта',
        'addr:housenumber': '158 к1',
        coords: '60.608366, 56.807505',
        'building:year': 1964,
        'building:levels': 1,
    },
    {
        'addr:street': 'улица 8 Марта',
        'addr:housenumber': '158',
        // coords: '60.608937, 56.807779',
        'building:year': 1964,
        'building:levels': 3,
    },
    {
        'addr:street': 'улица Фурманова',
        'addr:housenumber': '37',
        coords: '60.611648, 56.815684',
        'building:year': 2007,
    },
    {
        'addr:street': 'улица 8 Марта',
        'addr:housenumber': '45',
        coords: '60.605978, 56.824475',
        'building:year': 1980,
        'building:levels': 4,
    },
    {
        'addr:street': 'улица 8 Марта',
        'addr:housenumber': '45А',
        coords: '60.606107, 56.824198',
        'building:year': 2008,
    },
    {
        'addr:street': 'улица 8 Марта',
        'addr:housenumber': '62',
        coords: '60.603037, 56.825092',
        'building:year': 1972,
    },
    {
        'addr:street': 'улица Декабристов',
        'addr:housenumber': '40',
        coords: '60.609820, 56.823366',
        'building:year': 1831,
    },
    {
        'addr:street': 'Белинского',
        'addr:housenumber': '30',
        coords: '60.614476, 56.833128',
        'building:year': 2016,
    },
    {
        'addr:street': 'улица Розы Люксембург',
        'addr:housenumber': '9',
        coords: '60.612964, 56.833279',
        'building:year': 1984,
        'building:levels': 11,
    },
];

const removeBuildings = [
    {
        'addr:street': 'улица Розы Люксембург',
        'addr:housenumber': '73',
        coords: '60.615069, 56.823301',
    },
    {
        'addr:street': 'улица Розы Люксембург',
        'addr:housenumber': '75',
        coords: '60.615217, 56.822713',
    },
];

const dbConfig = {
    user: 'baremaps',
    host: 'localhost',
    database: 'baremaps',
    password: 'baremaps',
    port: 5432,
};

const pool = new Pool(dbConfig);

async function update({ table, sql, ...item }) {
    const client = await pool.connect();

    const addressQuery =
        item['addr:street'] && item['addr:housenumber']
            ? `
            AND tags->>'addr:street' ILIKE '%${item['addr:street']}%'
            AND tags->>'addr:housenumber' ILIKE '%${item['addr:housenumber']}%'
            `
            : '';
    const coordsQuery = item.coords
        ? `
        AND ST_Within(ST_Transform(ST_SetSRID(ST_MakePoint(${item.coords}), 4326), 3857), geom)
        `
        : '';

    const query = `${sql} WHERE tags ? 'building' ${coordsQuery} ${addressQuery}
  `;

    try {
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (e) {
        console.log('commit error: ', e.message);
    }
}

async function exec({ operation, items, fields }) {
    ['osm_ways', 'osm_relations'].forEach((table) => {
        fields.forEach((field) => {
            const arr = items
                .filter((item) => item[field])
                .map((item) => {
                    function getSQL() {
                        switch (operation) {
                            case 'update':
                                return `UPDATE ${table} SET tags = tags || ('{"${field}": "${item[field]}"}')::jsonb`;
                            case 'remove':
                                return `DELETE FROM ${table}`;
                            default:
                                return `SELECT tags FROM ${table}`;
                        }
                    }

                    return update({ table, sql: getSQL(), ...item });
                });

            if (operation === 'select') {
                Promise.all(arr).then((item) =>
                    console.log(`for table ${table} field ${field}: `, item.flat()),
                );
            }
        });
    });
}

exec({
    operation: 'select', // use update operation
    items: updateBuildings,
    fields: ['building:year', 'building:levels'], // update this fields
});

exec({
    operation: 'select', // use remove operation
    items: removeBuildings,
    fields: ['coords'],
});
